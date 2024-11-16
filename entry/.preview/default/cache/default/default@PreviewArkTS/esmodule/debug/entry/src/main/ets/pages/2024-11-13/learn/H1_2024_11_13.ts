if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface H1_2024_11_13_Params {
    busList?: Business[];
    business?: Business | undefined;
    search?: string;
    store?: Store;
    top?: number;
    displayClass?: display.Display | undefined;
    searchList?: Business[];
    winClass?: window.Window | undefined;
}
import { businessList, Store } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/learn/ChatStore&";
import type { Business } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/learn/ChatStore&";
import display from "@ohos:display";
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import window from "@ohos:window";
import notificationManager from "@ohos:notificationManager";
import type Base from "@ohos:base";
class H1_2024_11_13 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__busList = new ObservedPropertyObjectPU(businessList, this, "busList");
        this.__business = this.createStorageProp('bus', undefined, "business");
        this.__search = new ObservedPropertySimplePU('', this, "search");
        this.store = new Store(getContext(this));
        this.__top = new ObservedPropertySimplePU(0, this, "top");
        this.displayClass = undefined;
        this.__searchList = new ObservedPropertyObjectPU([], this, "searchList");
        this.winClass = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("business", this.change);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: H1_2024_11_13_Params) {
        if (params.busList !== undefined) {
            this.busList = params.busList;
        }
        if (params.search !== undefined) {
            this.search = params.search;
        }
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.top !== undefined) {
            this.top = params.top;
        }
        if (params.displayClass !== undefined) {
            this.displayClass = params.displayClass;
        }
        if (params.searchList !== undefined) {
            this.searchList = params.searchList;
        }
        if (params.winClass !== undefined) {
            this.winClass = params.winClass;
        }
    }
    updateStateVars(params: H1_2024_11_13_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__busList.purgeDependencyOnElmtId(rmElmtId);
        this.__business.purgeDependencyOnElmtId(rmElmtId);
        this.__search.purgeDependencyOnElmtId(rmElmtId);
        this.__top.purgeDependencyOnElmtId(rmElmtId);
        this.__searchList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__busList.aboutToBeDeleted();
        this.__business.aboutToBeDeleted();
        this.__search.aboutToBeDeleted();
        this.__top.aboutToBeDeleted();
        this.__searchList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __busList: ObservedPropertyObjectPU<Business[]>;
    get busList() {
        return this.__busList.get();
    }
    set busList(newValue: Business[]) {
        this.__busList.set(newValue);
    }
    private __business: ObservedPropertyAbstractPU<Business | undefined>;
    get business() {
        return this.__business.get();
    }
    set business(newValue: Business | undefined) {
        this.__business.set(newValue);
    }
    private __search: ObservedPropertySimplePU<string>;
    get search() {
        return this.__search.get();
    }
    set search(newValue: string) {
        this.__search.set(newValue);
    }
    private store: Store;
    private __top: ObservedPropertySimplePU<number>;
    get top() {
        return this.__top.get();
    }
    set top(newValue: number) {
        this.__top.set(newValue);
    }
    private displayClass: display.Display | undefined;
    private __searchList: ObservedPropertyObjectPU<Business[]>;
    get searchList() {
        return this.__searchList.get();
    }
    set searchList(newValue: Business[]) {
        this.__searchList.set(newValue);
    }
    private winClass: window.Window | undefined;
    change() {
        if (this.business) {
            let index = this.busList.findIndex(bus => bus.id == this.business?.id);
            if (index != -1)
                this.busList.splice(index, 1, this.business);
        }
    }
    async onPageHide() {
        await this.winClass!.setWindowLayoutFullScreen(false);
    }
    onPageShow(): void {
    }
    async aboutToAppear() {
        this.winClass = await window.getLastWindow(getContext(this));
        this.displayClass = display.getDefaultDisplaySync();
        let isNotificationEnabled = notificationManager.isNotificationEnabledSync();
        if (!isNotificationEnabled) {
            //弹框授权允许通知；
            notificationManager.requestEnableNotification().then(() => {
                promptAction.showToast({
                    message: '允许了'
                });
            }).catch((e: Base.BusinessError) => {
                if (e.code == 1600004) {
                    AlertDialog.show({
                        message: '禁止了'
                    });
                }
            });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(55:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(56:7)", "entry");
            Row.padding({ left: 10, right: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Search.create({
                value: this.search
            });
            Search.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(57:9)", "entry");
            Search.searchButton('搜索');
            Search.onSubmit(async (value) => {
                this.search = value;
                this.searchList = [];
                for (let i = 0; i < this.busList.length; i++) {
                    let bus = this.busList[i];
                    let res = await this.store.getMsg(bus.id);
                    for (let i = 0; i < res.length; i++) {
                        let chat = res[i];
                        if (chat.msg.includes(this.search)) {
                            this.searchList.push({
                                id: Date.now() + "",
                                title: bus.title,
                                ava: bus.ava,
                                replayTime: chat.time,
                                chats: [],
                                replyMsg: chat.msg,
                                count: 0
                            });
                        }
                    }
                }
            });
        }, Search);
        Search.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(84:7)", "entry");
            List.layoutWeight(1);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const business = _item;
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
                        ListItem.onClick(() => {
                            AppStorage.setOrCreate('bus', business);
                            router.pushUrl({
                                url: 'pages/2024-11-13/learn/H1_Chat',
                                params: business
                            });
                        });
                        ListItem.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(86:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Badge.create({
                                count: business.count,
                                style: { fontSize: 12, badgeSize: 18 },
                                position: {
                                    x: 52,
                                    y: 6
                                }
                            });
                            Badge.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(87:13)", "entry");
                        }, Badge);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(95:15)", "entry");
                            Row.width('100%');
                            Row.height(80);
                            Row.padding({ left: 10, right: 20, top: 10, bottom: 10 });
                            Row.border({ width: { bottom: 1 }, color: { bottom: '#aaaaaa' } });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(business.ava);
                            Image.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(96:17)", "entry");
                            Image.height('90%');
                            Image.margin({ right: 15 });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(97:17)", "entry");
                            Column.layoutWeight(1);
                            Column.height('100%');
                            Column.justifyContent(FlexAlign.SpaceAround);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(98:19)", "entry");
                            Row.width('100%');
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(business.title);
                            Text.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(99:21)", "entry");
                            Text.fontSize(18);
                            Text.width('70%');
                            Text.maxLines(1);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                            Blank.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(100:21)", "entry");
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(business.replayTime);
                            Text.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(101:21)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#aaaaaa');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(business.replyMsg);
                            Text.debugLine("entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13.ets(103:19)", "entry");
                            Text.fontColor('#aaaaaa');
                            Text.fontSize(16);
                            Text.width('100%');
                            Text.maxLines(1);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        Row.pop();
                        Badge.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.search == '' ? this.busList : this.searchList, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "H1_2024_11_13";
    }
}
registerNamedRoute(() => new H1_2024_11_13(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-13/learn/H1_2024_11_13", pageFullPath: "entry/src/main/ets/pages/2024-11-13/learn/H1_2024_11_13", integratedHsp: "false" });
