if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ChatItemCom_Params {
    item?: chatClass;
    showPop?: boolean;
    delFn?: (id: string) => void;
}
interface ChatPage_Params {
    chatList?: chatClass[];
    sendWord?: string;
    store?: chatStore;
    scroller?: Scroller;
}
import { chatStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/chatStore&";
import type { chatClass } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/chatStore&";
import util from "@ohos:util";
import http from "@ohos:net.http";
class ResponseClass {
    result: number = -1;
    content: string = "";
}
class ChatPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__chatList = new ObservedPropertyObjectPU([], this, "chatList");
        this.__sendWord = new ObservedPropertySimplePU("", this, "sendWord");
        this.store = new chatStore(getContext(this));
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ChatPage_Params) {
        if (params.chatList !== undefined) {
            this.chatList = params.chatList;
        }
        if (params.sendWord !== undefined) {
            this.sendWord = params.sendWord;
        }
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: ChatPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__chatList.purgeDependencyOnElmtId(rmElmtId);
        this.__sendWord.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__chatList.aboutToBeDeleted();
        this.__sendWord.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __chatList: ObservedPropertyObjectPU<chatClass[]>;
    get chatList() {
        return this.__chatList.get();
    }
    set chatList(newValue: chatClass[]) {
        this.__chatList.set(newValue);
    }
    private __sendWord: ObservedPropertySimplePU<string>;
    get sendWord() {
        return this.__sendWord.get();
    }
    set sendWord(newValue: string) {
        this.__sendWord.set(newValue);
    }
    private store: chatStore;
    private scroller: Scroller;
    async aboutToAppear() {
        this.chatList = await this.store.getChat();
        setTimeout(() => {
            this.scroller.scrollEdge(Edge.Bottom);
        }, 50);
    }
    async sendMessageFn() {
        // //发送的消息
        let sendObj: chatClass = {
            content: this.sendWord,
            avatar: "/image/2.jpg",
            id: util.generateRandomUUID(),
            selfFlag: true
        };
        this.chatList.push(sendObj);
        //存
        this.store.putChat(JSON.stringify(this.chatList));
        //让list保持在底部；
        this.scroller.scrollEdge(Edge.Bottom);
        //回复：http://api.qingyunke.com/api.php?key=free&appid=0&msg=你好
        const url = "http://api.qingyunke.com/api.php?key=free&appid=0&msg=" + this.sendWord;
        this.sendWord = "";
        const myHttp = http.createHttp();
        let res = await myHttp.request(url);
        let result = res.result as string;
        let resData = JSON.parse(result) as ResponseClass;
        //console.info(result)
        if (resData.result == 0) {
            let content = resData.content; //回复的内容
            let conObj: chatClass = {
                content: content,
                avatar: { "id": 16777217, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                id: util.generateRandomUUID(),
                selfFlag: false
            };
            this.chatList.push(conObj);
            //存
            this.store.putChat(JSON.stringify(this.chatList));
        }
        //让list保持在底部；
        this.scroller.scrollEdge(Edge.Bottom);
    }
    //删除方法：
    delItem(id: string) {
        //console.info("del",id,JSON.stringify(this.chatList))
        //你看的删除；
        let chatL = [...this.chatList];
        let index = chatL.findIndex((v: chatClass) => v.id == id);
        chatL.splice(index, 1);
        this.chatList = [...chatL];
        //删除存储中的；
        this.store.putChat(JSON.stringify(this.chatList));
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
            Column.backgroundColor("#f0f0f0");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("老王");
            Text.height(50);
            Text.backgroundColor("#ccc");
            Text.textAlign(TextAlign.Center);
            Text.width("100%");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({
                scroller: this.scroller
            });
            List.width("100%");
            List.height('calc(100% - 100vp)');
            List.onAppear(() => {
                this.scroller.scrollEdge(Edge.Bottom);
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
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
                        ListItem.width("100%");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ChatItemCom(this, {
                                        item: item,
                                        delFn: () => { this.delItem(item.id); }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/2024-11-11/ChatPage.ets", line: 87, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            item: item,
                                            delFn: () => { this.delItem(item.id); }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        item: item
                                    });
                                }
                            }, { name: "ChatItemCom" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.chatList, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(50);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                text: { value: this.sendWord, changeEvent: newValue => { this.sendWord = newValue; } }
            });
            TextInput.layoutWeight(1);
            TextInput.onSubmit(() => {
                //this.sendMessageFn()
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("发送");
            Button.onClick(() => {
                this.sendMessageFn();
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
        return "ChatPage";
    }
}
class ChatItemCom extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__item = new SynchedPropertyObjectOneWayPU(params.item, this, "item");
        this.__showPop = new ObservedPropertySimplePU(false, this, "showPop");
        this.delFn = () => "";
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ChatItemCom_Params) {
        if (params.showPop !== undefined) {
            this.showPop = params.showPop;
        }
        if (params.delFn !== undefined) {
            this.delFn = params.delFn;
        }
    }
    updateStateVars(params: ChatItemCom_Params) {
        this.__item.reset(params.item);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__item.purgeDependencyOnElmtId(rmElmtId);
        this.__showPop.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__item.aboutToBeDeleted();
        this.__showPop.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __item: SynchedPropertySimpleOneWayPU<chatClass>;
    get item() {
        return this.__item.get();
    }
    set item(newValue: chatClass) {
        this.__item.set(newValue);
    }
    private __showPop: ObservedPropertySimplePU<boolean>;
    get showPop() {
        return this.__showPop.get();
    }
    set showPop(newValue: boolean) {
        this.__showPop.set(newValue);
    }
    private delFn: (id: string) => void;
    popupBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('删除');
            Text.height(30);
            Text.textAlign(TextAlign.Center);
            Text.width(100);
            Text.onClick(() => {
                //删除
                this.delFn(this.item.id);
                this.showPop = false;
            });
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(40);
            Row.width("100%");
            Row.direction(this.item.selfFlag ? Direction.Rtl : Direction.Ltr);
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction(() => {
                this.showPop = true;
            });
            LongPressGesture.pop();
            Gesture.pop();
            Row.bindPopup(this.showPop, {
                builder: { builder: this.popupBuilder.bind(this) },
                placement: Placement.Top,
                popupColor: Color.Gray
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.item.avatar);
            Image.width(50);
            Image.margin({
                left: 10,
                right: 10
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.content);
            Text.backgroundColor(this.item.selfFlag ? "#00ff00" : "#fff");
            Text.padding(10);
            Text.borderRadius(5);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new ChatPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/ChatPage", pageFullPath: "entry/src/main/ets/pages/2024-11-11/ChatPage", integratedHsp: "false" });
