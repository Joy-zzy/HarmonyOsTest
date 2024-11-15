import { display } from '@kit.ArkUI';

@Entry
@Component
struct DisPage {
  @State displayClass: display.Display | undefined =undefined;

  aboutToAppear(): void {
    this.displayClass=display.getDefaultDisplaySync()
  }

  build() {
    Column() {
     Button("获取")
       .onClick(async ()=>{
          // AlertDialog.show({
          //   message:JSON.stringify(this.displayClass)
          // })

         let cutInfo:display.CutoutInfo= await this.displayClass!.getCutoutInfo()
         let bRect=cutInfo.boundingRects;//刘海；
         // AlertDialog.show({
         //   message:JSON.stringify(cutInfo)
         // })
       })
      Button("获取折叠状态")
        .onClick(async ()=>{
          // let foldStatus:display.FoldStatus=await display.getFoldStatus()
          // // AlertDialog.show({
          // //   message:foldStatus+""
          // // })
          // let Foldable:boolean=display.isFoldable();
          // AlertDialog.show({
          //   message:Foldable+""
          // })
          let FoldCreaseRegion= display.getCurrentFoldCreaseRegion()
          AlertDialog.show({
            message:JSON.stringify(FoldCreaseRegion)
          })
        })
    }
    .height('100%')
    .width('100%')
  }
}