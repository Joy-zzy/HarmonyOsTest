// @Entry
import { KeyboardAvoidMode, window } from '@kit.ArkUI'

// @Component
// struct SafePage1 {
//
//   build() {
//     Column() {
//         Row(){
//
//         }
//           .height("100%")
//           .width("100%")
//           .backgroundColor(Color.Orange)
//     }
//     .height('100%')
//     .width('100%')
//     .backgroundColor(Color.Red)
//     .expandSafeArea([SafeAreaType.SYSTEM],[SafeAreaEdge.TOP,SafeAreaEdge.BOTTOM])
//   }
// }
//
//
// @Entry
// @Component
// struct SafePage1 {
//
//   build() {
//     Stack({
//       alignContent:Alignment.Bottom
//     }) {
//       Column(){
//
//       }
//         .height("100%")
//         .width("100%")
//         .backgroundImage("/image/2.jpg")
//         .backgroundImageSize(ImageSize.Cover)
//         .expandSafeArea([SafeAreaType.KEYBOARD,SafeAreaType.SYSTEM])
//       TextInput()
//     }
//     .height('100%')
//     .width('100%')
//     .backgroundColor(Color.Red)
//
//   }
// }


//
// @Entry
// @Component
// struct SafePage1 {
//   async aboutToAppear() {
//     let windowClass=await window.getLastWindow(getContext(this))
//     windowClass.setWindowLayoutFullScreen(true)
//   }
//   @State arr:string[]=Array.from(new Array(10),(v:string,index:number)=>index+"")
//   build() {
//     Column() {
//       Text("老汪")
//         .width("100%")
//         .height(100)
//         .backgroundColor("#ccc")
//         .expandSafeArea([SafeAreaType.KEYBOARD])
//         .zIndex(100)
//
//       List(){
//         ForEach(this.arr,(item:string)=>{
//           ListItem(){
//             Text(item)
//           }
//           .width("100%")
//           .height(150)
//           .border({
//             width:1
//           })
//         })
//       }
//
//       .width("100%")
//       .backgroundColor(Color.Orange)
//       .layoutWeight(1)
//       Row(){
//         TextInput()
//           .layoutWeight(1)
//         Button("发送:")
//       }
//       .width("100%")
//       .height(50)
//       .backgroundColor("#fff")
//     }
//     .backgroundColor(Color.Pink)
//     .width('100%')
//     .height("100%")
//     //.expandSafeArea([SafeAreaType.KEYBOARD,SafeAreaType.SYSTEM],[SafeAreaEdge.TOP,SafeAreaEdge.BOTTOM])
//
//
//   }
// }



@Entry
@Component
struct SafePage{
  async aboutToAppear() {
    const windowClass:window.Window=await window.getLastWindow(getContext(this))
    windowClass.getUIContext().setKeyboardAvoidMode(KeyboardAvoidMode.RESIZE)
  }
  build() {
    Column({
      space:20
    }){

      TextInput()
      TextInput()
    }
      .height("100%")
      .width("100%")
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
  }
}
