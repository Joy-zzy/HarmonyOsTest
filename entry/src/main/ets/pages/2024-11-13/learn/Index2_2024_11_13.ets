import { window } from '@kit.ArkUI'

@Entry
@Component
struct Index2_2024_11_13 {

  @State winClass: window.Window | undefined = undefined;

  async aboutToAppear() {
    this.winClass = await window.getLastWindow(getContext(this));

    this.winClass.on("touchOutside", ()=> {   // on 为开启监听，off为关闭监听
      console.log("在屏幕外点击")
    })

    this.winClass.on("keyboardHeightChange", () => {
      console.log("键盘高度变化")
    })
  }

  build() {
    Column() {
      TextInput();
      Button('获取当前窗口的属性')
        .onClick(async () => {
          console.info(JSON.stringify(this.winClass!.getWindowProperties()));
        })
      Button('获取需规避的区域')
        .onClick(() => {
          console.info('软键盘', JSON.stringify(this.winClass!.getWindowAvoidArea(window.AvoidAreaType.TYPE_KEYBOARD)))
          console.info('导航条', JSON.stringify(this.winClass!.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR)))
          console.info('手势', JSON.stringify(this.winClass!.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM_GESTURE)))
        })
      Button('设置沉浸式布局')
        .onClick(() => {
          this.winClass!.setWindowLayoutFullScreen(true);
        })
      Button("设置窗口全屏模式时导航栏、状态栏的可见模式")
        .onClick(async () => {
          await this.winClass!.setWindowSystemBarEnable(["navigation"]) // 将系统栏设置为不可见。
        })
      Button('创建窗口')
        .onClick(async () => {
          // this.winClass!.resize(400, 400)
          let config: window.Configuration = {
            name: "newWin",
            windowType: window.WindowType.TYPE_DIALOG,
            ctx: getContext(this),
            parentId: 0
          }
          const newWindow: window.Window = await window.createWindow(config)
          newWindow.on("windowSizeChange",()=>{
            // AlertDialog.show({
            //   message:"窗口尺寸改变了"
            // })
          })
          await newWindow.resize(300,400);
          await newWindow.setUIContent("pages/2024-11-13/WinPage");
          await newWindow.showWindow();
        })
    }
  }
}