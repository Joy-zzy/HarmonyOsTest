import dataPreferences from "@ohos:data.preferences";
export class startStore {
    context: Context;
    constructor(context: Context) {
        this.context = context;
    }
    async getStore() {
        return await dataPreferences.getPreferences(this.context, "my_StartSql");
    }
    //存；
    async putMes(data: string) {
        const store = await this.getStore();
        await store.put("start", data);
        await store.flush();
    }
    //取；
    async getMes() {
        const store = await this.getStore();
        let data = await store.get("start", "");
        return data as string;
    }
}
