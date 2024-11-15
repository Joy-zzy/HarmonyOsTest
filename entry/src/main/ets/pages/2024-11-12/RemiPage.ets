import { notificationManager } from '@kit.NotificationKit';

import Base from '@ohos.base';
import { reminderAgentManager } from '@kit.BackgroundTasksKit';

@Entry
@Component
struct RemiPage {

  async onPageShow() {

    let isNotificationEnabled=await notificationManager.isNotificationEnabledSync()
    if(!isNotificationEnabled){
      //弹框授权允许通知；
      notificationManager.requestEnableNotification().then(()=>{
        AlertDialog.show({
          message:'允许了'
        })
      }).catch((e:Base.BusinessError)=>{
        if(e.code==1600004){
          AlertDialog.show({
            message:'禁止了'
          })
        }
      })
    }
  }
  @State reminderId:number=-1;
  build() {
    Column(){
      Button("发布闹钟")
        .onClick(async ()=>{
          let reminderRequest:reminderAgentManager.ReminderRequestAlarm={
            reminderType:reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
            hour:21,
            minute:0,
            daysOfWeek:[],
            wantAgent:{
              abilityName:"EntryAbility",
              pkgName:"com.example.myapplication"
            },
            title:"我的闹钟",
            content:"发布提醒"
          }
          try {
            let reminderId=await reminderAgentManager.publishReminder(reminderRequest)
            this.reminderId=reminderId;
            AlertDialog.show({
              message:"成功"
            })
          } catch (e) {
            AlertDialog.show({
              message:JSON.stringify(e)
            })
          }
        })
      Button("关闭闹钟")
        .onClick(()=>{
          reminderAgentManager.cancelReminder(this.reminderId);
        })

    }

    .height('100%')
    .width('100%')
  }
}