if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index6_24_11_11_Params {
    store?: ChatStore;
    msg?: string;
    chatList?: ChatMsg[];
    list?: Scroller;
    showList?: boolean[];
}
import { ChatStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/ChartStore&";
import type { ChatMsg } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/ChartStore&";
import http from "@ohos:net.http";
class Response {
    result: number;
    content: string;
    constructor(result: number, content: string) {
        this.result = result;
        this.content = content;
    }
}
class Index6_24_11_11 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__store = new ObservedPropertyObjectPU(new ChatStore(getContext(this)), this, "store");
        this.__msg = new ObservedPropertySimplePU('', this, "msg");
        this.__chatList = new ObservedPropertyObjectPU([], this, "chatList");
        this.list = new ListScroller();
        this.__showList = new ObservedPropertyObjectPU([], this, "showList");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index6_24_11_11_Params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.chatList !== undefined) {
            this.chatList = params.chatList;
        }
        if (params.list !== undefined) {
            this.list = params.list;
        }
        if (params.showList !== undefined) {
            this.showList = params.showList;
        }
    }
    updateStateVars(params: Index6_24_11_11_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__store.purgeDependencyOnElmtId(rmElmtId);
        this.__msg.purgeDependencyOnElmtId(rmElmtId);
        this.__chatList.purgeDependencyOnElmtId(rmElmtId);
        this.__showList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__store.aboutToBeDeleted();
        this.__msg.aboutToBeDeleted();
        this.__chatList.aboutToBeDeleted();
        this.__showList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __store: ObservedPropertyObjectPU<ChatStore>;
    get store() {
        return this.__store.get();
    }
    set store(newValue: ChatStore) {
        this.__store.set(newValue);
    }
    private __msg: ObservedPropertySimplePU<string>;
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue: string) {
        this.__msg.set(newValue);
    }
    private __chatList: ObservedPropertyObjectPU<ChatMsg[]>;
    get chatList() {
        return this.__chatList.get();
    }
    set chatList(newValue: ChatMsg[]) {
        this.__chatList.set(newValue);
    }
    private list: Scroller;
    private __showList: ObservedPropertyObjectPU<boolean[]>;
    get showList() {
        return this.__showList.get();
    }
    set showList(newValue: boolean[]) {
        this.__showList.set(newValue);
    }
    async aboutToAppear() {
        this.chatList = await this.store.getData();
        this.list.scrollEdge(Edge.Bottom);
    }
    async putData(isSelf: boolean, response?: string) {
        let chat: ChatMsg = {
            content: isSelf ? this.msg : response!,
            isSelf: isSelf,
            ava: isSelf ? '/images/1.png' : '/images/gray.png',
            id: new Date().toLocaleTimeString()
        };
        this.chatList.push(chat);
        this.showList.push(false);
        this.store.putData(chat);
        this.list.scrollEdge(Edge.Bottom);
    }
    async getResponse() {
        const url = "http://api.qingyunke.com/api.php?key=free&appid=0&msg=" + this.msg;
        let res = JSON.parse((await http.createHttp().request(url)).result as string) as Response;
        this.putData(false, res.content);
    }
    prop(index: number, id: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('删除');
            Text.height(30);
            Text.textAlign(TextAlign.Center);
            Text.width(100);
            Text.onClick(() => {
                this.chatList.splice(index, 1);
                this.showList.splice(index, 1);
                this.store.removeData(id);
            });
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Chat');
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.height(50);
            Text.backgroundColor('gray');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ scroller: this.list });
            List.width('100%');
            List.height('calc(100% - 100vp)');
            List.padding({ bottom: 20 });
            List.edgeEffect(EdgeEffect.None);
            List.scrollBar(BarState.Off);
            List.padding({ left: 10, right: 10 });
        }, List);
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const chat = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 10 });
                            Row.width('100%');
                            Row.direction(chat.isSelf ? Direction.Rtl : Direction.Ltr);
                            Row.margin({ bottom: 15 });
                            Row.alignItems(VerticalAlign.Top);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(chat.ava);
                            Image.height('40');
                            Image.width('40');
                            Image.borderRadius('20');
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(chat.content);
                            Text.padding(10);
                            Text.backgroundColor('#00ff00');
                            Text.constraintSize({ maxWidth: '65%' });
                            Gesture.create(GesturePriority.Low);
                            LongPressGesture.create();
                            LongPressGesture.onAction(() => {
                                this.showList[index] = true;
                                this.showList.splice(index, 1, this.showList[index]);
                            });
                            LongPressGesture.pop();
                            Gesture.pop();
                            Text.bindPopup(this.showList[index], {
                                builder: { builder: () => {
                                        this.prop.call(this, index, chat.id);
                                    } },
                                placement: Placement.Top,
                                popupColor: Color.Gray,
                                onStateChange: (event) => {
                                    this.showList[index] = event.isVisible;
                                    this.showList.splice(index, 1, this.showList[index]);
                                }
                            });
                        }, Text);
                        Text.pop();
                        Row.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.chatList, forEachItemGenFunction, undefined, true, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(50);
            Row.width('100%');
            Row.backgroundColor('gray');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                text: { value: this.msg, changeEvent: newValue => { this.msg = newValue; } }
            });
            TextInput.width('80%');
            TextInput.backgroundColor('#fff');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送');
            Button.onClick(() => {
                if (this.msg != '') {
                    this.putData(true);
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
        return "Index6_24_11_11";
    }
}
registerNamedRoute(() => new Index6_24_11_11(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/Index6_24_11_11", pageFullPath: "entry/src/main/ets/pages/2024-11-11/Index6_24_11_11", integratedHsp: "false" });
