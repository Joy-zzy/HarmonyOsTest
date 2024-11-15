import window from '@ohos.window';
import {local} from "./local";
@Entry
@Component
struct NewWinPage {
  @State windowClass:window.Window | undefined=undefined;

  async aboutToAppear(): Promise<void> {
    this.windowClass=await window.getLastWindow(getContext(this));

  }
  build() {
    Column(){

      Button("loadContent")
        .onClick(async ()=>{

          // await this.windowClass?.setUIContent("pages/About")
          local.setOrCreate("msg","你好 about页面")
        })

    }
    .width('100%')
    .height("100%")
    .backgroundColor(Color.Orange)
  }
}