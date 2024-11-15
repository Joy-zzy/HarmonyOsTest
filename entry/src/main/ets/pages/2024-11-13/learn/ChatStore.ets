import dataPreferences from '@ohos.data.preferences';
import { Context } from '@ohos.arkui.UIContext';

export class Chat {
  isSelf: boolean = true;
  msg: string = '';
  id: string = '';
  ava: string = '';
  businessId: string = '';
  time: string = '';
}

@Observed
export class Business {
  id: string = '';
  title: string = '';
  ava: string = '';
  replayTime: string = '';
  replyMsg: string = ''
  chats: Chat[] = [];
  count: number = 0;
}

export class Store {
  context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  private async getStore() {
    return await dataPreferences.getPreferences(this.context, "chat");
  }

  async putMsg(msg: Chat) {
    const store = await this.getStore();
    let data = await this.getMsg(msg.businessId);
    data.push(msg);
    await store.put('msg' + msg.businessId, JSON.stringify(data));
    await store.flush();
  }

  async getMsg(busId: string) {
    const store = await this.getStore();
    return JSON.parse(await store.get('msg' + busId, "[]") as string) as Chat[];
  }
}

export let businessList: Business[] = [{
  id: Date.now() + "1",
  title: "天猫超市",
  ava: "/images/1-1.png",
  replayTime: "13:10",
  chats: [],
  replyMsg: "",
  count: 0
}, {
  id: Date.now() + "2",
  title: "EMXEE嫚熙官方旗舰店",
  ava: "/images/2.png",
  replayTime: "星期一",
  chats: [],
  replyMsg: "",
  count: 0
}, {
  id: Date.now() + "3",
  title: "88VIP权益助手",
  ava: "/images/3.png",
  replayTime: "星期一",
  chats: [],
  replyMsg: "",
  count: 0
}, {
  id: Date.now() + "4",
  title: "老管家旗舰店",
  ava: "/images/4.png",
  replayTime: "星期一",
  chats: [],
  replyMsg: "",
  count: 0
}]