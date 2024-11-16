import dataPreferences from "@ohos:data.preferences";
import type { Context } from "@ohos:abilityAccessCtrl";
export class chatClass {
    content: string = ""; //聊天内容
    avatar: ResourceStr = ""; //用户头像，可以是字符串可以是Resource
    id: string = ''; //消息的唯一标识
    selfFlag: boolean = true; //是否是自身的消息
}
export class chatStore {
    context: Context;
    constructor(context: Context) {
        this.context = context;
    }
    async getStore() {
        return await dataPreferences.getPreferences(this.context, "my_chatSql");
    }
    //存；
    async putChat(data: string) {
        const store = await this.getStore();
        await store.put("myChat", data);
        await store.flush();
    }
    //取；
    async getChat() {
        const store = await this.getStore();
        let data = await store.get("myChat", "[]") as string;
        return JSON.parse(data) as chatClass[];
    }
}
