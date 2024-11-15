import { testStore } from '../../utils/2024-11-11/testStore1';

@Entry
@Component
struct About {
  @State message: string = 'about';
  @State store:testStore=new testStore()
  async aboutToAppear() {
    this.message=await this.store.getMes()
  }
  build() {
    RelativeContainer() {
      Text(this.message)
        .id('AboutHelloWorld')
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