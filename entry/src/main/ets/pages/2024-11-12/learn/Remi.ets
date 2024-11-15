import { notificationManager } from '@kit.NotificationKit';
import Base, { BusinessError } from '@ohos.base';
import { reminderAgentManager } from '@kit.BackgroundTasksKit';
import { promptAction } from '@kit.ArkUI';

@Entry
@Component
struct Remi {
  @State reminderId: number = -1;
  async onPageShow() {
    let enable = await notificationManager.isNotificationEnabled();
    if (!enable) {
      notificationManager.requestEnableNotification().then(() => {
        AlertDialog.show({
          message: '授权成功'
        })
      }).catch((e: Base.BusinessError) => {
        if (e.code == 1600004) {
          AlertDialog.show({
            message: '禁止通知'
          })
        } else {
          AlertDialog.show({
            message: '其他错误'
          })
        }
      })
    }
  }

  build() {
    Button('发布闹钟')
      .onClick(async () => {
        let request: reminderAgentManager.ReminderRequestAlarm = {
          reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
          hour: 20,
          minute: 0,
          daysOfWeek: [],
          wantAgent: {
            abilityName:"EntryAbility",
            pkgName:"com.example.myapplication"
          },
          title: "我的闹钟",
          content: "该下课了"
        }
        try {
          this.reminderId = await reminderAgentManager.publishReminder(request)
          promptAction.showToast({
            message: "发布成功"
          })
        } catch (e) {
          promptAction.showToast({
            message: JSON.stringify(e)
          })
        }
      })
  }
}