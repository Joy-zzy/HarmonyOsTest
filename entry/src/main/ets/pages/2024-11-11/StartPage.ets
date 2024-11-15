import { router } from '@kit.ArkUI'
import { startStore } from '../../utils/2024-11-11/startStore'

@Entry
@Component
struct StartPage {
  store:startStore=new startStore(getContext(this))
  build() {
    Swiper() {
      Image("/image/2.jpg")
        .height('100%')
        .width('100%')
      Image("/image/2.jpg")
        .height('100%')
        .width('100%')
    }
    .height('100%')
    .width('100%')
    .indicator(true)
    .onChange((index:number)=>{
      if(index==1){
        router.replaceUrl({
          url:"pages/IndexPage"
        })
        this.store.putMes("started")
      }
    })
  }
}