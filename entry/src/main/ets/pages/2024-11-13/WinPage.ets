import { window } from '@kit.ArkUI'
import { local } from './local'
import image from '@ohos.multimedia.image';

//
// @Entry
// @Component
// struct WinPage {
//   @State winClass:window.Window | undefined=undefined
//   async aboutToAppear() {
//     this.winClass=await window.getLastWindow(getContext(this))
//     this.winClass.on("keyboardHeightChange",()=>{
//       console.log("keyboardHeightChange.......");
//
//     })
//   }
//   build() {
//     Column() {
//       TextInput({
//         text:""
//       })
//       Button("获取窗口属性getWindowProperties")
//         .onClick(async ()=>{
//
//           let winProp:window.WindowProperties=await this.winClass!.getWindowProperties()
//           AlertDialog.show({
//             message:JSON.stringify(winProp)
//           })
//         })
//       Button("getWindowAvoidArea")
//         .onClick(async ()=>{
//           let winAvoid:window.AvoidArea=await this.winClass!.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM)
//           AlertDialog.show({
//             message:JSON.stringify(winAvoid)
//           })
//         })
//       Button("isFullScreen")
//         .onClick(async ()=>{
//
//           await this.winClass?.setWindowLayoutFullScreen(true);
//           AlertDialog.show({
//             message:"设置未沉浸式窗口"
//           })
//         })
//       Button("setWindowSystemBarEnable")
//         .onClick(async ()=>{
//           await this.winClass?.setWindowSystemBarEnable(["navigation"]);
//         })
//       Button("设置屏幕方向")
//         .onClick(()=>{
//           this.winClass!.setPreferredOrientation(window.Orientation.LANDSCAPE)
//         })
//     }
//     .height('100%')
//     .width('100%')
//     .backgroundColor(Color.Pink)
//   }
// }
//
// @Entry(local)
// @Component
// struct WinPage{
//   build() {
//     Column(){
//       Button("创建窗口")
//         .onClick(async ()=>{
//           let config:window.Configuration={
//             name:"newWin",
//             windowType:window.WindowType.TYPE_DIALOG,
//             ctx:getContext(this),
//             parentId:0
//           }
//           const newWindowClass:window.Window=await window.createWindow(config);
//           newWindowClass.on("windowSizeChange",()=>{
//             AlertDialog.show({
//               message:"窗口尺寸改变了"
//             })
//           })
//           await newWindowClass.resize(300,400);
//           await newWindowClass.setUIContent("pages/NewWinPage");
//           newWindowClass.showWindow()
//         })
//     }
//   }
//
// }


@Entry
@Component
struct WinPage {
  @State windowClass:window.Window | undefined=undefined;
  @State img:image.PixelMap | undefined=undefined;
  async aboutToAppear(): Promise<void> {
    this.windowClass=await window.getLastWindow(getContext(this));
    this.windowClass.on("screenshot",()=>{
      AlertDialog.show({
        message:"截屏了"
      })
    })
  }
  build() {
    Column(){

      Button("loadContent")
        .onClick(async ()=>{
          local.setOrCreate("msg","你好啊 loadContent");
          await this.windowClass!.loadContent("pages/2024-11-13/NewWinPage", local)
          this.windowClass!.setWindowBackgroundColor("#0000ff")
        })
      Button("隐私模式")
        .onClick(async ()=>{
          try {
            await this.windowClass!.setWindowPrivacyMode(true);
            AlertDialog.show({
              message:"成功"
            })
          } catch (e) {
            AlertDialog.show({
              message:JSON.stringify(e)
            })
          }

        })
      Button("获取截屏")
        .onClick(async ()=>{
          this.img=await this.windowClass!.snapshot()

        })
      Image(this.img!)
        .width(200)
    }
    .width('100%')
    .height("100%")
    .backgroundColor(Color.Orange)
  }
}