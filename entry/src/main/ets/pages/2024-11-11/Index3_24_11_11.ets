import { TestStore } from '../../utils/2024-11-11/TestStore'
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index3_24_11_11 {
  @State store: TestStore = new TestStore(getContext(this));

  build() {
    Swiper() {
      Image('/images/1.png').width('100%').height('100%')
      Stack({
        alignContent: Alignment.BottomEnd
      }) {
        Image('/images/gray.png').width('100%').height('100%')
        Button('进入')
          .onClick(() => {
            this.store.putData('started', 'true');
            router.replaceUrl({
              url: 'pages/2024-11-11/Index5_24_11_11'
            })
          })
      }
    }.width('100%').height('100%').loop(false).effectMode(EdgeEffect.None)
  }
}