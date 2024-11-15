import { notificationManager } from '@kit.NotificationKit';
import Base from '@ohos.base';
import { Want, WantAgent, wantAgent } from '@kit.AbilityKit';
@Entry
@Component
struct NotiPage {
  async onPageShow() {
    //获取未读的通知的个数，设置角标；
    let activeList=await notificationManager.getActiveNotifications();
    this.badgeNumber=activeList.length
    AlertDialog.show({
      message:JSON.stringify(activeList)
    })
    notificationManager.setBadgeNumber(this.badgeNumber);
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
  @State badgeNumber:number=0;

  build() {
    Column() {
      Button("发送通知")
        .onClick(async ()=>{

          let wantAgentObj:WantAgent;
          const info:wantAgent.WantAgentInfo={
            wants:[
              {
                bundleName:"com.example.myapplication2",
                abilityName:"EntryAbility"
              }
            ],
            requestCode:0,
            actionType:wantAgent.OperationType.START_ABILITY,
            wantAgentFlags:[wantAgent.WantAgentFlags.CONSTANT_FLAG]
          }
          wantAgentObj=await wantAgent.getWantAgent(info)
          let id=(new Date()).getTime();
          const request:notificationManager.NotificationRequest={
            id:id,
            content:{
              notificationContentType:notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
              normal:{
                title:"老刘"+id,
                text:"出来玩啊"
              }
            },
            wantAgent:wantAgentObj
          }
          await notificationManager.publish(request);
          this.badgeNumber++;
          notificationManager.setBadgeNumber(this.badgeNumber)
        })
      Button("清空通知")
        .onClick(async ()=>{
          await notificationManager.cancelAll();
          this.badgeNumber=0;
          await notificationManager.setBadgeNumber(0);

        })
      Button("发送通知")
        .onClick(async ()=>{
          const request:notificationManager.NotificationRequest={
            id:2,
            content:{
              notificationContentType:notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
              normal:{
                title:"老刘发来了2条信息",
                text:"天气真好出来玩"
              }
            }
          }
          await notificationManager.publish(request)
        })

      Button("发布多行通知")
        .onClick(async ()=>{
          const request:notificationManager.NotificationRequest={
            id:3,
            content:{
              notificationContentType:notificationManager.ContentType.NOTIFICATION_CONTENT_MULTILINE,
              multiLine:{
                title:"我是多行通知的标题啊下去沉淀吧无人扶我青云志",
                text:"我子踏雪至山巅",
                additionalText:"我是附加内容",
                briefText:"我是概要内容",
                longTitle:"我是展开时的标题听泉",
                lines:["我是第一行","第二行","第三行","第四行"]
              }
            }
          }
          await notificationManager.publish(request)
        })

      Button("发布通知")
        .onClick(async ()=>{
          const request:notificationManager.NotificationRequest={
            id:4,
            content:{
              notificationContentType:notificationManager.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
              longText:{
                title:"我是多行通知的标题啊下去沉淀吧无人扶我青云志",
                text:"我子踏雪至山巅",
                longText:"我是长文本长文本长文本长文本长文本长文本",
                briefText:"我是概要内容",
                expandedTitle:"我是展开时的title"
              }
            }
          }
          await notificationManager.publish(request)
        })
      Button("发布通知")
        .onClick(async ()=>{
          notificationManager.isSupportTemplate("downloadTemplate").then(async (flag:boolean)=>{
            if(flag){//发布
              const request:notificationManager.NotificationRequest={
                id:6,
                content:{
                  notificationContentType:notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                  normal:{
                    title:"无人扶我青云志",
                    text:"我子踏雪至山巅"
                  }
                },
                template: {
                  name: "downloadTemplate",
                  data: { title: '文件名', fileName: 'music.mp4', progressValue: 90 }
                }
              }
              await notificationManager.publish(request)
            }else {
              AlertDialog.show({
                message:"此功能不支持"
              })
            }
          }).catch((e:Base.BusinessError)=>{
            console.log(`error:${e}`);
          })
        })

    }
    .height('100%')
    .width('100%')
  }
}