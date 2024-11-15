import { Order, orders } from './H2_OrderStore'
import { notificationManager } from '@kit.NotificationKit';
import { promptAction } from '@kit.ArkUI';
import Base from '@ohos.base';
import { wantAgent, WantAgent } from '@kit.AbilityKit';
import reminderAgentManager from '@ohos.reminderAgentManager';

@Entry
@Component
struct H2_2024_11_13 {

  @State orderList: Order[] = orders;

  async aboutToAppear() {
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
    Flex({
      justifyContent: FlexAlign.SpaceBetween,
      wrap: FlexWrap.Wrap
    }) {
      ForEach(this.orderList, (order: Order, index: number) => {
        Column({space: 5}) {
          Image(order.ava).width('100%')
          Text(order.title).fontSize(16).fontWeight(FontWeight.Bold).width('100%')
          Row() {
            Text(order.time + "开播").fontSize(12).fontColor('blue')
            Blank();
            Row() {
              Text(order.ordered ? '取消预约' : "预约").fontSize(13).fontWeight(FontWeight.Medium).fontColor('blue')
              Image('/images/next.png').width(10)
                .visibility(order.ordered ? Visibility.None : Visibility.Visible)
            }.onClick(async () => {
              if (!order.ordered) {
                let request: reminderAgentManager.ReminderRequestAlarm = {
                  reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
                  hour: Number(order.time.split(':')[0]),
                  minute: Number(order.time.split(':')[1]),
                  wantAgent: {
                    pkgName: 'com.example.myapplication',
                    abilityName: "EntryAbility"
                  },
                  title: '抖阳',
                  content: order.title + "开播了"
                }
                try {
                  order.reminderId = await reminderAgentManager.publishReminder(request)
                  promptAction.showToast({
                    message: '预约成功'
                  })
                } catch (e) {
                  AlertDialog.show({
                    message: JSON.stringify(e)
                  })
                }
              } else {
                try {
                  await reminderAgentManager.cancelReminder(order.reminderId!);
                  promptAction.showToast({
                    message: '取消预约成功'
                  })
                } catch (e) {
                  AlertDialog.show({
                    message: JSON.stringify(e)
                  })
                }
              }
              order.ordered = !order.ordered;
              this.orderList.splice(index, 1, order);
            })
          }.width('100%')
        }.width('48%').margin({bottom: 10})
      })
    }.padding({left: 10, right: 10}).height('100%').backgroundColor('#efefef')
  }
}