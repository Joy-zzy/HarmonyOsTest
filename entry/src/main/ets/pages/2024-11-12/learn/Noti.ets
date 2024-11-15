import { Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import notificationManager from '@ohos.notificationManager';
import Base from '@ohos.base';

@Entry
@Component
struct Noti {

  @State badgeNum: number = 0;

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
    this.badgeNum = await notificationManager.getActiveNotificationCount();
    notificationManager.setBadgeNumber(this.badgeNum);
  }

  setBadge() {
    notificationManager.setBadgeNumber(++this.badgeNum);
  }

  async createWantAgent() {
    let info: wantAgent.WantAgentInfo = {
      wants: [{
          bundleName: 'com.example.myapplication',
          abilityName: 'EntryAbility',
          deviceId: '',   //表示运行指定Ability的设备ID。
          action: '',     //表示要执行的通用操作（如：查看、分享、应用详情）
          entities: [],   //表示目标Ability额外的类别信息（如：浏览器、视频播放器）
          uri: '',        //表示携带的数据
          parameters: {}, //表示WantParams描述。
        }],
      actionType: wantAgent.OperationType.START_ABILITY,//行为类型
      requestCode: 0,
      wantAgentFlags: [wantAgent.WantAgentFlags.CONSTANT_FLAG]
    }
    return await wantAgent.getWantAgent(info);
  }

  build() {
    Column() {
      Button('发送普通通知')
        .onClick(async () => {
          let normalNotification: notificationManager.NotificationRequest = {
            id: Date.now(),
            content: {
              notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
              normal: {
                title: "发送普通通知",
                text: "这是一个普通通知"
              }
            },
            wantAgent: await this.createWantAgent()
          }
          await notificationManager.publish(normalNotification);
          this.setBadge();
        })
      Button('发送多行文本')
        .onClick(async () => {
          let mulNotification: notificationManager.NotificationRequest = {
            id: Date.now(),
            content: {
              notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_MULTILINE,
              multiLine: {
                title: '收缩时标题',
                text: '多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容',
                additionalText: "补充",
                briefText: '总结',
                lines: ['第一行内容', '第二行内容', '第三行内容', '第四行内容'],
                longTitle: "展开时标题"
              }
            },
            wantAgent: await this.createWantAgent()
          }
          await notificationManager.publish(mulNotification);
          this.setBadge();
        })
      Button('发送长文本内容')
        .onClick(async () => {
          let longNotification: notificationManager.NotificationRequest = {
            id: Date.now(),
            content: {
              notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
              longText: {
                title: "长文本标题",
                text: "普通text",
                longText: "展开时文本",
                briefText: '总结',
                expandedTitle: "展开时标题"
              }
            },
            wantAgent: await this.createWantAgent()
          }
          await notificationManager.publish(longNotification)
          this.setBadge();
        })
      Button('发布进度条形文本')
        .onClick(async () => {
          let support = await notificationManager.isSupportTemplate('downloadTemplate');
          if (support) {
            let progressNotification: notificationManager.NotificationRequest = {
              id: Date.now(),
              // content可以为任意类型，但是不能不写，同时 title和text不能为 ""
              content: {
                notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                  title: "title",
                  text: "text"
                }
              },
              template: {
                name: "downloadTemplate",
                data: {
                  title: "通知标题",
                  fileName: "通知内容",
                  progressValue: 65
                }
              },
              wantAgent: await this.createWantAgent()
            }
            await notificationManager.publish(progressNotification);
            this.setBadge();
          } else {
            AlertDialog.show({
              message: "不支持该格式通知"
            })
          }
        })
    }
  }
}