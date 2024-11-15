import { notificationManager } from '@kit.NotificationKit';
import Base from '@ohos.base';
import { promptAction, router } from '@kit.ArkUI';
import { RemiInfo, RemiStore } from './RemiStore';
import { reminderAgentManager } from '@kit.BackgroundTasksKit';

@Entry
@Component
struct AlarmClock {

  store: RemiStore = new RemiStore(getContext(this));
  @State alarms: RemiInfo[] = [];
  timeInterval: number = -1;

  async onPageShow() {
    this.alarms = await this.store.getData();
    clearInterval(this.timeInterval);
    let m = new Date().getMinutes();
    let h = new Date().getHours();
    this.timeInterval = setInterval(async () => {
      let d = new Date();
      if (d.getMinutes() != m || d.getHours() != h && this.alarms.length != 0) {
        for (let i = 0; i < this.alarms.length; i++) {
          let clock = this.alarms[i];
          if (clock.enable && d.getHours() * 60 + d.getMinutes() == clock.hour * 60 + clock.minute) {
            if (clock.autoDel) {
              setTimeout(() => {
                this.delClock(clock);
              }, 1000)
            }
            if (clock.dayOfWeeks.length == 0) {
              setTimeout(() => {
                reminderAgentManager.cancelReminder(clock.reminderId);
              }, 9000);
              clock.enable = false;
              this.alarms.splice(i, 1, clock);
              this.store.replaceData(clock);
            }
          }
        }
      }
    }, 1000);
  }

  async aboutToAppear() {
    let enable = await notificationManager.isNotificationEnabled();
    if (!enable) {
      notificationManager.requestEnableNotification().then(() => {
        promptAction.showToast({
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

  async delClock(alarm: RemiInfo) {
    setTimeout(async () => {
      await reminderAgentManager.cancelReminder(alarm.reminderId);
    }, 9000);
    let index = await this.store.delData(alarm);
    this.alarms.splice(index, 1);
  }

  @Builder
  listEnd(alarm: RemiInfo) {
    Image('/images/delete.png').width(32).margin({left: 10})
      .onClick(async () => {
        await this.delClock(alarm);
      })
  }

  build() {
    Stack() {
      Column() {
        Text('闹钟').fontSize(22).width('90%').margin({bottom: 20})
        List() {
          ForEach(this.alarms, (alarm: RemiInfo) => {
            ListItem() {
              ClockItem({
                clock: alarm
              }).margin({bottom: 10})
            }.swipeAction({
              end: this.listEnd(alarm)
            })
          })
        }
      }.alignItems(HorizontalAlign.Start)
      Image('/images/plus.png').width(30).height(30).position({bottom: 0, right: 0})
        .onClick(() => {
          AppStorage.setOrCreate<RemiInfo>('remiInfo', undefined);
          router.pushUrl({
            url: 'pages/2024-11-12/learn/AddClock'
          })
        })
    }.height('100%').width('100%').padding({left: 15, right: 15, top: 20, bottom: 20})
    .align(Alignment.Top).backgroundColor('#f1f1f1')
  }
}

@Component
struct ClockItem {

  @ObjectLink clock: RemiInfo;

  build() {
    Row() {
      Column() {
        Text() {
          Span((this.clock.hour - (this.clock.hour > 12 ? 12 : 0)).toString().padStart(2, '0') + ":" + this.clock.minute.toString().padStart(2, '0'))
            .fontSize(22).fontWeight(FontWeight.Bold)
          Span(this.clock.hour > 12 ? '下午' : '上午').fontSize(14).fontColor('gray')
          ImageSpan('').margin({left: 10})
          Span(this.clock.title).fontSize(18).fontWeight(FontWeight.Medium)
        }
        Text(this.clock.type).fontColor('#aaaaaa').fontSize(14)
          .width('80%').maxLines(1).textOverflow({overflow: TextOverflow.Ellipsis})
      }.alignItems(HorizontalAlign.Start)
      Blank();
      Toggle({
        type: ToggleType.Switch,
        isOn: this.clock.enable
      }).onChange(async (on) => {
        this.clock.enable = on;
        if (on) {
          let info: reminderAgentManager.ReminderRequestAlarm = {
            reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
            hour: this.clock.hour,
            minute: this.clock.minute,
            title: this.clock.title,
            content: this.clock.content,
            daysOfWeek: this.clock.dayOfWeeks,
            ringDuration: 10,
            wantAgent: {
              abilityName:"EntryAbility",
              pkgName:"com.example.myapplication"
            },
          }
          this.clock.reminderId = await reminderAgentManager.publishReminder(info);
        } else {
          reminderAgentManager.cancelReminder(this.clock.reminderId);
        }
      })
    }.width('100%').height(80).backgroundColor('#fff').borderRadius(15).padding({left: 10, right: 10})
    .onClick(() => {
      AppStorage.setOrCreate<RemiInfo>('remiInfo', this.clock);
      router.pushUrl({
        url: 'pages/2024-11-12/learn/AddClock'
      })
    })
  }
}