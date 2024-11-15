import { AdvertClass, advertStore } from '../../utils/2024-11-11/advertStore'

@Entry
@Component
struct IndexPage {
  store:advertStore=new advertStore(getContext(this))
  @State adData:Partial<AdvertClass>={}
  async aboutToAppear() {
    this.adData = await this.store.getAdvert() as AdvertClass;
  }
  build() {
    Column() {
      Text("首页")
      if(this.adData.showAd){
        Text(this.adData.adTimeL+"")
      }

    }
    .height('100%')
    .width('100%')
  }
}