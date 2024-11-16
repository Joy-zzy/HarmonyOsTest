if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface H1_Chat_Params {
    business?: Business | undefined;
    msg?: string;
    chatList?: Chat[];
    store?: Store;
    list?: Scroller;
    winClass?: window.Window | undefined;
}
import { Store } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/learn/ChatStore&";
import type { Business, Chat } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/learn/ChatStore&";
import router from "@ohos:router";
import window from "@ohos:window";
import http from "@ohos:net.http";
import notificationManager from "@ohos:notificationManager";
import wantAgent from "@ohos:app.ability.wantAgent";
import type { WantAgent } from "@ohos:app.ability.wantAgent";
class Response {
    result: number;
    content: string;
    constructor(result: number, content: string) {
        this.result = result;
        this.content = content;
    }
}
class H1_Chat extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__business = this.createStorageLink('bus', undefined, "business");
        this.__msg = new ObservedPropertySimplePU('', this, "msg");
        this.__chatList = new ObservedPropertyObjectPU([], this, "chatList");
        this.store = new Store(getContext(this));
        this.list = new ListScroller();
        this.winClass = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: H1_Chat_Params) {
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.chatList !== undefined) {
            this.chatList = params.chatList;
        }
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.list !== undefined) {
            this.list = params.list;
        }
        if (params.winClass !== undefined) {
            this.winClass = params.winClass;
        }
    }
    updateStateVars(params: H1_Chat_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__business.purgeDependencyOnElmtId(rmElmtId);
        this.__msg.purgeDependencyOnElmtId(rmElmtId);
        this.__chatList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__business.aboutToBeDeleted();
        this.__msg.aboutToBeDeleted();
        this.__chatList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __business: ObservedPropertyAbstractPU<Business | undefined>;
    get business() {
        return this.__business.get();
    }
    set business(newValue: Business | undefined) {
        this.__business.set(newValue);
    }
    private __msg: ObservedPropertySimplePU<string>;
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue: string) {
        this.__msg.set(newValue);
    }
    private __chatList: ObservedPropertyObjectPU<Chat[]>;
    get chatList() {
        return this.__chatList.get();
    }
    set chatList(newValue: Chat[]) {
        this.__chatList.set(newValue);
    }
    private store: Store;
    private list: Scroller;
    private winClass: window.Window | undefined;
    async aboutToAppear() {
    }
    async onPageShow() {
        this.winClass = await window.getLastWindow(getContext(this));
        if (!this.business) {
            this.business = router.getParams() as Business;
        }
        this.business.count = 0;
        this.chatList = await this.store.getMsg(this.business.id);
    }
    onPageHide(): void {
        this.winClass!.setWindowLayoutFullScreen(false);
    }
    async getResponse() {
        const url = "http://api.qingyunke.com/api.php?key=free&appid=0&msg=" + this.msg;
        let res = JSON.parse((await http.createHttp().request(url)).result as string) as Response;
        let chat: Chat = {
            isSelf: false,
            msg: res.content,
            time: new Date().toLocaleTimeString(),
            id: Date.now() + "",
            ava: this.business!.ava,
            businessId: this.business!.id
        };
        this.business!.replyMsg = chat.msg;
        this.business!.count += router.getLength() == '1' ? 1 : 0;
        this.business!.replayTime = new Date().toLocaleTimeString();
        this.chatList.push(chat);
        this.store.putMsg(chat);
        let wantObj: WantAgent;
        const info: wantAgent.WantAgentInfo = {
            wants: [{
                    bundleName: "com.example.myapplication",
                    abilityName: "EntryAbility"
                }],
            requestCode: 0,
            actionType: wantAgent.OperationType.START_ABILITY,
            wantAgentFlags: [wantAgent.WantAgentFlags.CONSTANT_FLAG]
        };
        wantObj = await wantAgent.getWantAgent(info);
        let request: notificationManager.NotificationRequest = {
            id: (new Date()).getTime(),
            content: {
                notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    text: chat.msg,
                    title: this.business!.title
                }
            },
            wantAgent: wantObj
        };
        try {
            await notificationManager.publish(request);
        }
        catch (e) {
            console.log(JSON.stringify(e));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(91:5)", "entry");
            Column.backgroundColor('#efefef');
            Column.onAppear(async () => {
                this.winClass = await window.getLastWindow(getContext(this));
                this.winClass!.setWindowLayoutFullScreen(true);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Start });
            Stack.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(92:7)", "entry");
            Stack.width('100%');
            Stack.backgroundColor('#fff');
            Stack.padding({ left: 10, top: 23 });
            Stack.margin({ bottom: 15 });
            Stack.expandSafeArea([SafeAreaType.KEYBOARD]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.business?.title);
            Text.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(93:9)", "entry");
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.height(50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/cuo.png');
            Image.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(94:9)", "entry");
            Image.width(32);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ scroller: this.list });
            List.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(100:7)", "entry");
            List.width('100%');
            List.layoutWeight(1);
            List.padding({ bottom: 20 });
            List.expandSafeArea([SafeAreaType.KEYBOARD, SafeAreaType.SYSTEM]);
            List.edgeEffect(EdgeEffect.None);
            List.scrollBar(BarState.Off);
            List.padding({ left: 10, right: 10 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const chat = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(102:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 10 });
                            Row.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(103:13)", "entry");
                            Row.width('100%');
                            Row.direction(chat.isSelf ? Direction.Rtl : Direction.Ltr);
                            Row.margin({ bottom: 15 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(chat.ava);
                            Image.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(104:15)", "entry");
                            Image.height('40');
                            Image.width('40');
                            Image.borderRadius('20');
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(chat.msg);
                            Text.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(105:15)", "entry");
                            Text.padding(10);
                            Text.backgroundColor('#00ff00');
                            Text.constraintSize({ maxWidth: '65%' });
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.chatList, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(113:7)", "entry");
            Row.height(50);
            Row.width('100%');
            Row.padding({ left: 10, right: 5 });
            Row.margin({ bottom: 23 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                text: { value: this.msg, changeEvent: newValue => { this.msg = newValue; } }
            });
            TextInput.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(114:9)", "entry");
            TextInput.width('80%');
            TextInput.backgroundColor('#fff');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送');
            Button.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_Chat.ets(117:9)", "entry");
            Button.onClick(async () => {
                if (this.msg != '') {
                    let chat: Chat = {
                        isSelf: true,
                        msg: this.msg,
                        time: new Date().toLocaleTimeString(),
                        id: Date.now() + "",
                        ava: '/images/my.png',
                        businessId: this.business!.id
                    };
                    this.business!.replyMsg = this.msg;
                    this.business!.replayTime = new Date().toLocaleTimeString();
                    this.chatList.push(chat);
                    this.store.putMsg(chat);
                    this.getResponse();
                    this.msg = '';
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "H1_Chat";
    }
}
registerNamedRoute(() => new H1_Chat(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-13/learn/H1_Chat", pageFullPath: "entry/src/main/ets/pages/2024-11-13/learn/H1_Chat", integratedHsp: "false" });
