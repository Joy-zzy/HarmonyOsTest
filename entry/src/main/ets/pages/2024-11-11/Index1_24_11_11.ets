import { TestStore } from '../../utils/2024-11-11/TestStore'
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index1_24_11_11 {
  @State store: TestStore = new TestStore(getContext(this));
  @State msg: string = 'index1';

  async aboutToAppear() {
    this.msg = await this.store.getData('data');
  }

  build() {
    Column() {
      Text("msg:" + this.msg);
      Button('存储')
        .onClick(async () => {
          await this.store.putData('data', 'hello hello');
        })
      Button('获取')
        .onClick(async () => {
          this.msg = await this.store.getData('data');
        })
      Button('go to page2')
        .onClick(async () => {
          router.pushUrl({
            url: 'pages/2024-11-11/Index2_24_11_22'
          })
        })
    }.width('100%').alignItems(HorizontalAlign.Center)
  }
}