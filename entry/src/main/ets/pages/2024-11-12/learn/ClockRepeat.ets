import { router } from '@kit.ArkUI';

@Entry
@Component
struct ClockRepeat {

  @State types: string[] = ['只响一次', '每天', '法定工作日', '法定节假日', '周一到周五', '自定义']
  @State weeksNum: boolean[] = Array<boolean>(this.types.length);
  weeks: string[] = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
  @State vis: boolean = false;
  @State cop: boolean[] = [...this.weeksNum];
  @StorageLink('repeat') repeat: string = '只响一次';
  @State coR: string = this.repeat;
  @StorageLink('dayOfWeeks') days: number[] = [];
  @State coD: number[] = [...this.days];
  @State selected: number = -1;

  aboutToAppear(): void {
    this.selected = this.types.findIndex(type => type == this.repeat);
    if (this.selected == -1) {
      this.selected = this.types.length - 1;
      let ws = this.repeat.split(' ');
      this.weeks.map((week, index) => {
        if (ws.findIndex(w => w == week) != -1)
          this.weeksNum[index] = true;
      })
      this.cop = [...this.weeksNum]
    }
  }

  @Builder
  zhou() {
    Column() {
      Column() {
        Text('自定义').fontSize(18)
      }.height(70).width('100%').justifyContent(FlexAlign.Center)
      ForEach(this.weeks, (week: string, index: number) => {
        Column() {
          Row() {
            Text(week).fontSize(18);
            Radio({
              group: week,
              value: index + "",
            })
              .checked(this.cop[index])
              .onClick(() => {
                this.cop[index] = !this.cop[index];
              })
          }.height('100%').width('100%').justifyContent(FlexAlign.SpaceBetween)
        }.width('100%').padding({left: 30, right: 30}).height(50)
      })
      Row() {
        Button('取消', {
          type: ButtonType.Normal
        }).width('48%').height(50).fontSize(20)
          .onClick(() => {
            this.vis = false;
            this.cop = [...this.weeksNum];
          })
        Button('确定', {
          type: ButtonType.Normal
        }).width('48%').height(50).fontSize(20)
          .onClick(() => {
            this.weeksNum = [...this.cop];
            this.vis = false;
            let ind = this.types.length - 1;
            this.types[ind] = this.weeks.filter((week, index) => this.weeksNum[index]).join(' ');
            this.coD = [];
            this.weeksNum.filter((week, index) => {
              if (week) {
                this.coD.push(index + 1);
              }
            })
            this.repeat = this.types[ind];
            if (this.types[ind] == '') {
              this.types[ind] = '自定义';
              this.repeat = '只响一次';
            }
          })
      }.justifyContent(FlexAlign.SpaceBetween).padding({left: 30, right: 30}).width('100%').margin({top: 50})
    }
  }

  build() {
    Column({space: 10}) {
      Row() {
        Image('/images/cuo.png').width(32)
          .onClick(() => {
            this.repeat = this.coR;
            router.back();
          })
        Text('重复').fontSize(20)
        Image('/images/dui.png').width(32)
          .onClick(() => {
            this.days = [...this.coD];
            router.back();
          })
      }.justifyContent(FlexAlign.SpaceBetween).width('100%').margin({bottom: 10})
      ForEach(this.types, (type: string, index: number) => {
        Row() {
          Image('/images/dui_blue.png').width(20).visibility(index == this.selected ? Visibility.Visible : Visibility.Hidden)
          Text(type).fontSize(18).margin({left: 10}).fontColor(index == this.selected ? '#1296db' : 'black').fontWeight(FontWeight.Medium)
            .constraintSize({maxWidth: 'calc(100% - 36vp)'}).maxLines(1).textOverflow({overflow: TextOverflow.Ellipsis})
          Blank();
          if (index == this.types.length - 1) {
            Image('/images/next.png').width(16)
          }
        }.width('100%').height(50).backgroundColor(index == this.selected ? '#ffd0e6f5' : '#efefef')
        .borderRadius(15).padding({left: 10, right: 10})
        .onClick(() => {
          this.selected = index;
          if (index == this.types.length - 1)
            this.vis = true;
          this.repeat = type;
          switch (index) {
            case 0: this.coD = [];break;
            case 1: this.coD = [1, 2, 3, 4, 5, 6, 7]; break;
            case 2: case 4: this.coD = [1, 2, 3, 4, 5]; break;
            case 3: this.coD = [6, 7]; break;
          }
        })
        .bindSheet($$this.vis, this.zhou, {
          height: 600,
        });
      })
    }.height('100%').width('100%').padding(20).backgroundColor('#fff')
  }
}