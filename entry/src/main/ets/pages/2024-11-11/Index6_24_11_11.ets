import { ChatMsg, ChatStore } from '../../utils/2024-11-11/ChartStore';
import { http } from '@kit.NetworkKit';

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
struct Index6_24_11_11 {
  @State store: ChatStore = new ChatStore(getContext(this));
  @State msg: string = '';
  @State chatList: ChatMsg[] = [];
  private list: Scroller = new ListScroller();
  @State showList: boolean[] = [];

  async aboutToAppear() {
    this.chatList = await this.store.getData();
    this.list.scrollEdge(Edge.Bottom);

  }

  async putData(isSelf: boolean, response?: string) {
    let chat: ChatMsg = {
      content: isSelf ? this.msg : response!,
      isSelf: isSelf,
      ava: isSelf ? '/images/1.png' : '/images/gray.png',
      id: new Date().toLocaleTimeString()
    }
    this.chatList.push(chat);
    this.showList.push(false);
    this.store.putData(chat);
    this.list.scrollEdge(Edge.Bottom);
  }

  async getResponse() {
    const url="http://api.qingyunke.com/api.php?key=free&appid=0&msg="+this.msg;
    let res = JSON.parse((await http.createHttp().request(url)).result as string) as Response;
    this.putData(false, res.content);
  }
  @Builder
  prop(index: number, id: string) {
    Text('删除')
      .height(30).textAlign(TextAlign.Center).width(100)
      .onClick(() => {
        this.chatList.splice(index, 1);
        this.showList.splice(index, 1);
        this.store.removeData(id);
      })
  }
  build() {
    Column() {
      Text('Chat').textAlign(TextAlign.Center).width('100%').height(50).backgroundColor('gray');
      List({scroller: this.list}) {
        ListItem() {
          Column() {
            ForEach(this.chatList, (chat: ChatMsg, index: number) => {
              Row({space: 10}) {
                Image(chat.ava).height('40').width('40').borderRadius('20');
                Text(chat.content).padding(10).backgroundColor('#00ff00')
                  .constraintSize({maxWidth: '65%'})
                  .gesture(
                    LongPressGesture()
                      .onAction(() => {
                        this.showList[index] = true;
                        this.showList.splice(index, 1, this.showList[index]);
                      })
                  )
                  .bindPopup(this.showList[index], {
                    builder: this.prop(index, chat.id),
                    placement: Placement.Top,
                    popupColor: Color.Gray,
                    onStateChange: (event) => {
                      this.showList[index] = event.isVisible;
                      this.showList.splice(index, 1, this.showList[index]);
                    }
                  })
              }.width('100%').direction(chat.isSelf ? Direction.Rtl : Direction.Ltr).margin({bottom: 15})
              .alignItems(VerticalAlign.Top)
            })
          }
        }
      }.width('100%').height('calc(100% - 100vp)').padding({bottom: 20})
      .edgeEffect(EdgeEffect.None).scrollBar(BarState.Off).padding({left: 10, right: 10})
      Row() {
        TextInput({
          text: $$this.msg
        }).width('80%').backgroundColor('#fff')

        Button('发送')
          .onClick(() => {
            if (this.msg != '') {
              this.putData(true);
              this.getResponse();
              this.msg = '';
            }
          })
      }.height(50).width('100%').backgroundColor('gray')
    }
  }
}