import dataPreferences from '@ohos.data.preferences';

export class TestStore<T = Object> {
  private context: Context;
  private preference: dataPreferences.Preferences | undefined = undefined;

  constructor(context: Context) {
    this.context = context;
  }

  private async getInstance() {
    if (this.preference == undefined)
      this.preference = await dataPreferences.getPreferences(this.context, "test");
    return this.preference;
  }

  async putData(key: string, data: T) {
    this.preference = await this.getInstance();
    await this.preference!.put(key, JSON.stringify(data));
    await this.preference!.flush();
  }

  async getData(key: string) {
    this.preference = await this.getInstance();
    return JSON.parse(await this.preference!.get(key, '{}') as string);
  }
}