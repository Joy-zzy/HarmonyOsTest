import preferences from "@ohos:data.preferences";
import type { Context } from "@ohos:arkui.UIContext";
@Observed
export class RemiInfo {
    hour: number = 0;
    minute: number = 0;
    title: string = '';
    content: string = '';
    reminderId: number = 0;
    id: string = '';
    type: string = '';
    enable: boolean = true;
    autoDel: boolean = false;
    dayOfWeeks: number[] = [];
    shake: boolean = false;
}
export class RemiStore {
    context: Context;
    constructor(context: Context) {
        this.context = context;
    }
    store: preferences.Preferences | undefined = undefined;
    async getStore() {
        if (this.store == undefined)
            this.store = await preferences.getPreferences(this.context, "remi");
        return this.store;
    }
    async putData(data: RemiInfo) {
        this.store = await this.getStore();
        let infos = await this.getData();
        infos.push(data);
        await this.store.put('info', JSON.stringify(infos));
    }
    async getData() {
        this.store = await this.getStore();
        let data = await this.store.get('info', '[]');
        return JSON.parse(data as string) as RemiInfo[];
    }
    async replaceData(data: RemiInfo) {
        this.store = await this.getStore();
        let infos = await this.getData();
        let index = infos.findIndex(info => info.id == data.id);
        infos.splice(index, 1, data);
        await this.store.put('info', JSON.stringify(infos));
    }
    async delData(data: RemiInfo) {
        this.store = await this.getStore();
        let infos = await this.getData();
        let index = infos.findIndex(info => info.id == data.id);
        infos.splice(index, 1);
        return index;
    }
}
