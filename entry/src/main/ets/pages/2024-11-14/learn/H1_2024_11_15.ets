import { display } from '@kit.ArkUI'

@Entry
@Component
struct H1_2024_11_15 {

  disPlayClass: display.Display = display.getDefaultDisplaySync();

  aboutToAppear(): void {

  }

  build() {
    Column() {
      Button('display属性')
        .onClick(() => {
          console.log(JSON.stringify(this.disPlayClass));
        })
      Button('获取屏幕不可用区域信息')
        .onClick(async () => {
          // 挖空、刘海、导航等区域
          console.log(JSON.stringify(await this.disPlayClass.getCutoutInfo()))
        })
      Button('获取屏幕的可折叠状态')
        .onClick(async () => {

        })
    }

  }
}