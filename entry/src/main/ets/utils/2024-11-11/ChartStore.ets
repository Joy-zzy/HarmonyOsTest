import dataPreferences from '@ohos.data.preferences';
import { Context } from '@ohos.abilityAccessCtrl';

export class ChatMsg {
  content: string = '';
  ava: ResourceStr = '';
  isSelf: boolean = true;
  id: string = '';
}

export class ChatStore {
  context: Context;
  store: dataPreferences.Preferences | undefined = undefined;

  constructor(context: Context) {
    this.context = context;

  }

  private async getPreference() {
    if (this.store == undefined)
      this.store = await dataPreferences.getPreferences(this.context, 'chat');
    return this.store;
  }

  async putData(data: ChatMsg) {
    this.store = await this.getPreference();
    let storeData = await this.getData();
    storeData.push(data);
    this.store.put('chat', JSON.stringify(storeData));
    this.store.flush();
  }

  async removeData(id: string) {
    this.store = await this.getPreference();
    let storeData = await this.getData();
    storeData.splice(storeData.findIndex(chat => chat.id == id), 1);
    this.store.put('chat', JSON.stringify(storeData));
    this.store.flush();
  }

  async getData() {
    this.store = await this.getPreference();
    return JSON.parse(await this.store.get('chat', '[]') as string) as ChatMsg[];
  }
}