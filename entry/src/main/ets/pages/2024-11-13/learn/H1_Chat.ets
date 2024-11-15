import { Business, Chat, Store } from './ChatStore'
import { promptAction, router } from '@kit.ArkUI';
import { http } from '@kit.NetworkKit';
import { notificationManager } from '@kit.NotificationKit';
import wantAgent from '@ohos.app.ability.wantAgent';
import { WantAgent } from '@kit.AbilityKit';

class Response {
  result: number;
  content: string;

  constructor(result: number, content: string) {
    this.result = result;
    this.content = content;
  }
}

@Entry
@Component
struct H1_Chat {

  @StorageLink('bus') business: Business | undefined = undefined;
  @State msg: string = '';
  @State chatList: Chat[] = [];
  store: Store = new Store(getContext(this));
  private list: Scroller = new ListScroller();

  async aboutToAppear() {
    if (!this.business) {
      this.business = router.getParams() as Business;
    }
    this.business.count = 0;
    this.chatList = await this.store.getMsg(this.business.id);
  }

  async getResponse() {
    const url="http://api.qingyunke.com/api.php?key=free&appid=0&msg="+this.msg;
    let res = JSON.parse((await http.createHttp().request(url)).result as string) as Response;
    let chat: Chat = {
      isSelf: false,
      msg: res.content,
      time: new Date().toLocaleTimeString(),
      id: Date.now() + "",
      ava: this.business!.ava,
      businessId: this.business!.id
    }
    this.business!.replyMsg = chat.msg;
    this.business!.count += router.getLength() == '1' ? 1 : 0;
    this.business!.replayTime = new Date().toLocaleTimeString();
    this.chatList.push(chat);
    this.store.putMsg(chat)
    let wantObj: WantAgent;
    const info: wantAgent.WantAgentInfo = {
      wants: [{
        bundleName:"com.example.myapplication",
        abilityName:"EntryAbility"
      }],
      requestCode: 0,
      actionType: wantAgent.OperationType.START_ABILITY,
      wantAgentFlags: [ wantAgent.WantAgentFlags.CONSTANT_FLAG ]
    }
    wantObj = await wantAgent.getWantAgent(info);
    let request: notificationManager.NotificationRequest = {
      id: (new Date()).getTime(),
      content: {
        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
        normal: {
          text: chat.msg,
          title: this.business!.title
        }
      },
      wantAgent: wantObj
    }
    try {
      await notificationManager.publish(request);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  build() {
    Column() {
      Row() {
        Image('/images/cuo.png').width(32)
          .onClick(() => {
            router.back();
          })
        Text(this.business?.title).textAlign(TextAlign.Center).width('calc(100% - 50vp)').height(50)
      }.width('100%').backgroundColor('#fff').padding({left: 10}).margin({bottom: 15})
      List({scroller: this.list}) {
        ForEach(this.chatList, (chat: Chat, index: number) => {
          ListItem() {
            Row({space: 10}) {
              Image(chat.ava).height('40').width('40').borderRadius('20');
              Text(chat.msg).padding(10).backgroundColor('#00ff00')
                .constraintSize({maxWidth: '65%'})
            }.width('100%').direction(chat.isSelf ? Direction.Rtl : Direction.Ltr).margin({bottom: 15})
          }
        })
      }.width('100%').height('calc(100% - 115vp)').padding({bottom: 20})
      .edgeEffect(EdgeEffect.None).scrollBar(BarState.Off).padding({left: 10, right: 10})
      Row() {
        TextInput({
          text: $$this.msg
        }).width('80%').backgroundColor('#fff')
        Button('发送')
          .onClick(async () => {
            if (this.msg != '') {
              let chat: Chat = {
                isSelf: true,
                msg: this.msg,
                time: new Date().toLocaleTimeString(),
                id: Date.now() + "",
                ava: '/images/my.png',
                businessId: this.business!.id
              }
              this.business!.replyMsg = this.msg;
              this.business!.replayTime = new Date().toLocaleTimeString();
              this.chatList.push(chat);
              this.store.putMsg(chat)
              this.getResponse();
              this.msg = '';
            }
          })
      }.height(50).width('100%').padding({left: 10, right: 5})
    }.backgroundColor('#efefef')
  }
}