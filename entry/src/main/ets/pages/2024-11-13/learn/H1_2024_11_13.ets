import { Business, businessList, Store } from './ChatStore'
import { display, promptAction, router, window } from '@kit.ArkUI';
import { notificationManager } from '@kit.NotificationKit';
import Base from '@ohos.base';
import { util } from '@kit.ArkTS';

PersistentStorage.persistProp<Business[]>('busList', businessList);

@Entry
@Component
struct H1_2024_11_13 {

  @StorageLink('busList') busList: Business[] = businessList;
  @StorageProp('bus') @Watch('change') business: Business | undefined = undefined;
  @State search: string = '';
  store: Store = new Store(getContext(this));
  @State top: number = 0;
  displayClass: display.Display | undefined = undefined;
  @State searchList: Business[] = [];
  winClass: window.Window | undefined = undefined;

  change() {
    if (this.business) {
      let index = this.busList.findIndex(bus => bus.id == this.business?.id)
      if (index != -1)
        this.busList.splice(index, 1, this.business);
    }
  }

  async aboutToAppear() {
    this.winClass = await window.getLastWindow(getContext(this));
    this.winClass!.setWindowLayoutFullScreen(true);
    this.displayClass = display.getDefaultDisplaySync();
    let isNotificationEnabled = notificationManager.isNotificationEnabledSync()
    if(!isNotificationEnabled) {
      //弹框授权允许通知；
      notificationManager.requestEnableNotification().then(() => {
        promptAction.showToast({
          message: '允许了'
        })
      }).catch((e: Base.BusinessError) => {
        if (e.code == 1600004) {
          AlertDialog.show({
            message: '禁止了'
          })
        }
      })
    }
  }

  build() {
    Column() {
      Row() {
        Search({
          value: this.search
        })
          .searchButton('搜索')
          .onSubmit(async (value) => {
            this.search = value
            this.searchList = [];
            for (let i = 0; i < this.busList.length; i++) {
              let bus = this.busList[i];
              let res = await this.store.getMsg(bus.id);
              for (let i = 0; i < res.length; i++) {
                let chat = res[i];
                if (chat.msg.includes(this.search)) {
                  this.searchList.push({
                    id: util.generateRandomUUID(),
                    title: bus.title,
                    ava: bus.ava,
                    replayTime: chat.time,
                    chats: [],
                    replyMsg: chat.msg,
                    count: 0
                  })
                }
              }
            }
          })
      }.padding({left: 10, right: 10, top: 25})
      List() {
        ForEach(this.search == '' ? this.busList : this.searchList, (business: Business) => {
          ListItem() {
            Badge({
              count: business.count,
              style: {fontSize: 12, badgeSize: 18},
              position: {
                x: 52,
                y: 6
              }
            }) {
              Row() {
                Image(business.ava).height('90%').margin({right: 15})
                Column() {
                  Row() {
                    Text(business.title).fontSize(18).width('70%').maxLines(1).textOverflow({overflow: TextOverflow.Ellipsis})
                    Blank();
                    Text(business.replayTime).fontSize(14).fontColor('#aaaaaa')
                  }.width('100%')
                  Text(business.replyMsg).fontColor('#aaaaaa').fontSize(16)
                    .width('100%').maxLines(1).textOverflow({overflow: TextOverflow.Ellipsis})
                }.layoutWeight(1).height('100%').justifyContent(FlexAlign.SpaceAround).alignItems(HorizontalAlign.Start)
              }.width('100%').height(80).padding({left: 10, right: 20, top: 10, bottom: 10}).border({width: {bottom: 1}, color: {bottom: '#aaaaaa'}})
            }
          }.onClick(() => {
            AppStorage.setOrCreate('bus', business);
            router.pushUrl({
              url: 'pages/2024-11-13/learn/H1_Chat',
              params: business
            })
          })
        })
      }.layoutWeight(1)
    }
  }
}