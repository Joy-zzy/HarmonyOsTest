import dataPreferences from '@ohos.data.preferences';
import { Context } from '@ohos.abilityAccessCtrl';
export class AdvertClass{
  showAd:boolean=true;//是否显示广告
  adTimeL:number=5;//广告倒计时
  adUrl?:string="";//广告的链接
  adImg:ResourceStr="";//广告的图片
}
export class advertStore{
  context:Context;

  constructor(context:Context) {
    this.context=context
  }
  async getStore(){
    return await dataPreferences.getPreferences(this.context,"my_advertSql");
  }

  //存；
  async putAdvert(data:string){
    const store=await this.getStore();
    await store.put("myAdvert",data);
    await store.flush()
  }
  //取；
  async getAdvert(){
    const store=await this.getStore();
    let data=await store.get("myAdvert","{}") as string;
    return data == '{}' ? '{}' : JSON.parse(data) as AdvertClass;
  }

}