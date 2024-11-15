import dataPreferences from '@ohos.data.preferences';

export class testStore{

  async getStore(){
    return await dataPreferences.getPreferences(getContext(this),"my_mesSql");
  }

  //存；
  async putMes(data:string){
    const store=await this.getStore();
    await store.put("myMes",data);
    await store.flush()
  }
  //取；
  async getMes(){
    const store=await this.getStore();
    let data=await store.get("myMes","");
    return data as string;
  }

}