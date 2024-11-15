import { display, window } from '@kit.ArkUI';

@Entry
@Component
struct ChatPage2 {
  @State message: string = 'Hello World';
  @State ListHeight:number=0;//屏幕的高度-100-挖空-底部导航；
  @State keyHeight:number=0;
  async getHeightFn(){
    let displayClass:display.Display=display.getDefaultDisplaySync();
    let cutInfo:display.CutoutInfo=await displayClass.getCutoutInfo();
    //挖空刘海；
    let bounding=cutInfo.boundingRects[0];
    let bH=px2vp(bounding.top+bounding.height)
    //屏幕的高度；
    let screenH=px2vp(displayClass.height);
    //底部导航条；
    const windowClass:window.Window=await window.getLastWindow(getContext(this));
    const avoidArea:window.AvoidArea=windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR)
    let bottomBarH=px2vp(avoidArea.bottomRect.height);

    this.ListHeight=Math.floor(screenH-100-bH-bottomBarH);
  }
  async  aboutToAppear() {
    this.getHeightFn()
    //监听键盘抬起；
    const windowClass:window.Window=await window.getLastWindow(getContext(this));
    windowClass.on("keyboardHeightChange",async (keyH:number)=>{//keyH:键盘的高度
      await this.getHeightFn()
      this.ListHeight-=px2vp(keyH)
      this.keyHeight=px2vp(keyH)

    })

  }
  build() {
    Column() {
      Text()
        .width("100%")
        .height(50)
        .backgroundColor("#ccc")
      List(){

      }
        .height(this.ListHeight)
        .width("100%")
        .backgroundColor(Color.Orange)

      Row(){
        TextInput()
          .layoutWeight(1)
        Button("发送:"+this.ListHeight)
      }
        .width("100%")
        .height(50)
        .backgroundColor("#fff")
    }
    .width('100%')
    .offset({
      top:this.keyHeight
    })
  }
}