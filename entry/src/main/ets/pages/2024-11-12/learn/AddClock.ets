import { router } from '@kit.ArkUI';
import { RemiInfo, RemiStore } from './RemiStore';
import { util } from '@kit.ArkTS';
import { reminderAgentManager } from '@kit.BackgroundTasksKit';


@Entry
@Component
struct AddClock {

  @State time: Partial<TimePickerResult> = {
    hour: new Date().getHours(),
    minute: new Date().getMinutes()
  };
  @State selTime: Date = new Date();
  @State del: boolean = false;
  @State title: string = '';
  @StorageLink('remiInfo') info: RemiInfo | undefined = undefined;
  @State shake: boolean = false;
  weeks: string[] = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
  @StorageLink('repeat') repeat: string = '只响一次';
  @StorageProp('dayOfWeeks') days: number[] = [];
  @State cha: string = '0';
  @State msg: string = '';

  store: RemiStore = new RemiStore(getContext(this));

  aboutToAppear(): void {
    if (this.info == undefined) {
      this.days = [];
      this.repeat = '只响一次';
    }
    else {
      this.repeat = this.info.type;
      this.del = this.info.autoDel;
      this.title = this.info.title;
      this.msg = this.info.content;
      this.days = [...this.info.dayOfWeeks]
      this.shake = this.info.shake;
      this.selTime.setHours(this.info.hour);
      this.selTime.setMinutes(this.info.minute);
      this.time = {
        hour: this.info.hour,
        minute: this.info.minute
      }
      this.title = this.info.title;
      let d = new Date();
      let num: number;
      if (this.time.hour! > d.getHours() || this.time.hour == d.getHours() && this.time.minute! >= d.getMinutes()) {
        num = (this.time.hour! - d.getHours()) * 60 + this.time.minute! - d.getMinutes()
      } else {
        num = (24 - d.getHours() + this.time.hour!) * 60 + this.time.minute! - d.getMinutes()
      }
      this.cha = Math.floor(num / 60) + "时" + (num % 60) + "分";
    }
  }

  build() {
    Column() {
      Row() {
        Image('/images/cuo.png').width(28)
          .onClick(() => {
            router.back();
          })
        Column() {
          Text('添加闹钟').fontSize(18).fontWeight(FontWeight.Bold)
          Text(this.cha + '小时后响铃').fontSize(14)
        }
        Image('/images/dui.png').width(28)
          .onClick(async () => {
            let remiInfo: RemiInfo = {
              hour: this.time.hour!,
              dayOfWeeks: [...this.days],
              minute: this.time.minute!,
              title: this.title,
              content: this.msg,
              enable: this.info == undefined ? true : this.info.enable,
              reminderId: 0,
              id: this.info == undefined ? util.generateRandomUUID() : this.info.id,
              type: this.repeat,
              shake: this.shake,
              autoDel: this.del
            }
            let publishInfo: reminderAgentManager.ReminderRequestAlarm = {
              reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
              hour: this.time.hour!,
              minute: this.time.minute!,
              title: this.title == '' ? '闹钟' : this.title,
              content: this.msg,
              daysOfWeek: [...this.days],
              ringDuration: 10,
              wantAgent: {
                abilityName:"EntryAbility",
                pkgName:"com.example.myapplication"
              },
            }
            if (this.info != undefined) {
              reminderAgentManager.cancelReminder(this.info.reminderId);
            }
            try {
              remiInfo.reminderId = await reminderAgentManager.publishReminder(publishInfo);
            } catch (e) {
              // AlertDialog.show({
              //   message: JSON.stringify(e)
              // })
            }
            if (this.info == undefined) {
              await this.store.putData(remiInfo)
            } else {
              this.info = remiInfo;
              await this.store.replaceData(remiInfo);
            }
            router.back();
          })
      }.justifyContent(FlexAlign.SpaceBetween).width('100%')
      TimePicker({
        selected: this.selTime
      }).margin({top: 50, bottom: 50})
        .onChange((time) => {
          this.time.hour = time.hour;
          this.time.minute = time.minute;
          let d = new Date();
          let num: number;
          if (this.time.hour > d.getHours() || this.time.hour == d.getHours() && this.time.minute >= d.getMinutes()) {
            num = (this.time.hour - d.getHours()) * 60 + this.time.minute - d.getMinutes()
          } else {
            num = (24 - d.getHours() + this.time.hour) * 60 + this.time.minute - d.getMinutes()
          }
          this.cha = Math.floor(num / 60) + "时" + (num % 60) + "分";
        })
      Column({space: 10}) {
        Row() {
          Text('铃声').fontSize(18).fontWeight(FontWeight.Medium)
          Row() {
            Text('元素动态铃声').fontSize(16).fontColor('#aaaaaa')
            Image('/images/next.png').width(16)
          }
        }.justifyContent(FlexAlign.SpaceBetween).width('100%').padding({left: 10})
        Row() {
          Text('重复').fontSize(18).fontWeight(FontWeight.Medium)
          Row() {
            Text(this.repeat).fontSize(16).fontColor('#aaaaaa').textAlign(TextAlign.End)
              .constraintSize({maxWidth: '80%'}).maxLines(1).textOverflow({overflow: TextOverflow.Ellipsis})
            Image('/images/next.png').width(16)
          }.layoutWeight(1).justifyContent(FlexAlign.End)
        }.justifyContent(FlexAlign.SpaceBetween).width('100%').padding({left: 10})
        .onClick(() => {
          router.pushUrl({
            url: 'pages/2024-11-12/learn/ClockRepeat'
          })
        })
        Row() {
          Text('响铃时震动').fontSize(18).fontWeight(FontWeight.Medium)
          Toggle({
            isOn: $$this.shake,
            type: ToggleType.Switch
          })
        }.justifyContent(FlexAlign.SpaceBetween).width('100%').padding({left: 10})
        Row() {
          Text('响铃后删除此闹钟').fontSize(18).fontWeight(FontWeight.Medium)
          Toggle({
            isOn: $$this.del,
            type: ToggleType.Switch
          })
        }.justifyContent(FlexAlign.SpaceBetween).width('100%').padding({left: 10})
        Row() {
          Text('标题')
            .padding({left: 10}).fontSize(18)
          TextInput({
            placeholder: "请输入",
            text: $$this.title
          }).layoutWeight(1).backgroundColor(Color.Transparent).fontSize(16)
        }.height(50).width('100%').backgroundColor('#efefef').borderRadius(10)
        Row() {
          Text('备注')
            .padding({left: 10}).fontSize(18)
          TextInput({
            placeholder: "请输入",
            text: $$this.msg
          }).layoutWeight(1).backgroundColor(Color.Transparent).fontSize(16)
        }.height(50).width('100%').backgroundColor('#efefef').borderRadius(10)
      }
    }.padding(20).backgroundColor('#fff')
  }
}