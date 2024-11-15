import { AdvertClass, advertStore } from '../../utils/2024-11-11/advertStore';
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index4_22_11_11 {

  store: advertStore = new advertStore(getContext(this))
  @State adData: Partial<AdvertClass> = {}
  @State time: number = 0;
  interval: number = -1;


  async aboutToAppear() {
    this.adData = await this.store.getAdvert() as AdvertClass;
    this.time = this.adData.adTimeL!;

    this.interval = setInterval(() => {
      if (this.time == 0) {
        clearInterval(this.interval);
        let advert: AdvertClass = {
          showAd: false,
          adTimeL: 0,
          adImg: ''
        }
        this.store.putAdvert(JSON.stringify(advert));
        this.adData = advert;
        router.replaceUrl({
          url: 'pages/2024-11-11/Index5_24_11_11'
        })
      }
      this.time--;
    }, 1000);
  }

  build() {
    Column() {
      Text("广告")
      if(this.adData.showAd) {
        Text(this.time+"")
      }
    }
    .height('100%')
    .width('100%')
  }
}