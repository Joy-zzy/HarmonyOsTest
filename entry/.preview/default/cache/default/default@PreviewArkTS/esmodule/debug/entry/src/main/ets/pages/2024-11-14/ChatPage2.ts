if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ChatPage2_Params {
    message?: string;
    ListHeight?: number;
    keyHeight?: number;
}
import display from "@ohos:display";
import window from "@ohos:window";
class ChatPage2 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new ObservedPropertySimplePU('Hello World', this, "message");
        this.__ListHeight = new ObservedPropertySimplePU(0, this, "ListHeight");
        this.__keyHeight = new ObservedPropertySimplePU(0, this, "keyHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ChatPage2_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.ListHeight !== undefined) {
            this.ListHeight = params.ListHeight;
        }
        if (params.keyHeight !== undefined) {
            this.keyHeight = params.keyHeight;
        }
    }
    updateStateVars(params: ChatPage2_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__ListHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__keyHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__ListHeight.aboutToBeDeleted();
        this.__keyHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __message: ObservedPropertySimplePU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __ListHeight: ObservedPropertySimplePU<number>; //屏幕的高度-100-挖空-底部导航；
    get ListHeight() {
        return this.__ListHeight.get();
    }
    set ListHeight(newValue: number) {
        this.__ListHeight.set(newValue);
    }
    private __keyHeight: ObservedPropertySimplePU<number>;
    get keyHeight() {
        return this.__keyHeight.get();
    }
    set keyHeight(newValue: number) {
        this.__keyHeight.set(newValue);
    }
    async getHeightFn() {
        let displayClass: display.Display = display.getDefaultDisplaySync();
        let cutInfo: display.CutoutInfo = await displayClass.getCutoutInfo();
        //挖空刘海；
        let bounding = cutInfo.boundingRects[0];
        let bH = px2vp(bounding.top + bounding.height);
        //屏幕的高度；
        let screenH = px2vp(displayClass.height);
        //底部导航条；
        const windowClass: window.Window = await window.getLastWindow(getContext(this));
        const avoidArea: window.AvoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
        let bottomBarH = px2vp(avoidArea.bottomRect.height);
        this.ListHeight = Math.floor(screenH - 100 - bH - bottomBarH);
    }
    async aboutToAppear() {
        this.getHeightFn();
        //监听键盘抬起；
        const windowClass: window.Window = await window.getLastWindow(getContext(this));
        windowClass.on("keyboardHeightChange", async (keyH: number) => {
            await this.getHeightFn();
            this.ListHeight -= px2vp(keyH);
            this.keyHeight = px2vp(keyH);
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/ChatPage2.ets(37:5)", "entry");
            Column.width('100%');
            Column.offset({
                top: this.keyHeight
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/pages/2024-11-14/ChatPage2.ets(38:7)", "entry");
            Text.width("100%");
            Text.height(50);
            Text.backgroundColor("#ccc");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/2024-11-14/ChatPage2.ets(42:7)", "entry");
            List.height(this.ListHeight);
            List.width("100%");
            List.backgroundColor(Color.Orange);
        }, List);
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/2024-11-14/ChatPage2.ets(49:7)", "entry");
            Row.width("100%");
            Row.height(50);
            Row.backgroundColor("#fff");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create();
            TextInput.debugLine("entry/src/main/ets/pages/2024-11-14/ChatPage2.ets(50:9)", "entry");
            TextInput.layoutWeight(1);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("发送:" + this.ListHeight);
            Button.debugLine("entry/src/main/ets/pages/2024-11-14/ChatPage2.ets(52:9)", "entry");
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ChatPage2";
    }
}
registerNamedRoute(() => new ChatPage2(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-14/ChatPage2", pageFullPath: "entry/src/main/ets/pages/2024-11-14/ChatPage2", integratedHsp: "false" });
