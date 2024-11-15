import { testStore } from '../../utils/2024-11-11/testStore1';
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index {
 @State mes:string="hello preferences";
 store:testStore=new testStore();
 async aboutToAppear() {
   this.mes=await this.store.getMes();
 }
  build() {
    Column() {
      Text("mes:"+this.mes);
      Button("点击存储")
        .onClick(async ()=>{
          await this.store.putMes("hello 你好 首选项");
          this.mes=await this.store.getMes();
        })
      Button("获取")
        .onClick(async ()=>{
          AlertDialog.show({
            message:await this.store.getMes()
          })
        })
      Button("关于")
        .onClick(()=>{
          router.pushUrl({
            url:"pages/About"
          })
        })
    }
    .height('100%')
    .width('100%')
  }
}