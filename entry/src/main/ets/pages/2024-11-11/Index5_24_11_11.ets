@Entry
@Component
struct Index5_24_11_11 {
  @State message: string = '首页';

  build() {
    RelativeContainer() {
      Text(this.message)
        .id('')
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .alignRules({
          center: { anchor: '__container__', align: VerticalAlign.Center },
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
    }
    .height('100%')
    .width('100%')
  }
}