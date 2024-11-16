if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index2_24_11_22_Params {
    store?: TestStore;
    msg?: string;
}
import { TestStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/TestStore&";
class Index2_24_11_22 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__store = new ObservedPropertyObjectPU(new TestStore(getContext(this)), this, "store");
        this.__msg = new ObservedPropertySimplePU('index1', this, "msg");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index2_24_11_22_Params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
    }
    updateStateVars(params: Index2_24_11_22_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__store.purgeDependencyOnElmtId(rmElmtId);
        this.__msg.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__store.aboutToBeDeleted();
        this.__msg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __store: ObservedPropertyObjectPU<TestStore>;
    get store() {
        return this.__store.get();
    }
    set store(newValue: TestStore) {
        this.__store.set(newValue);
    }
    private __msg: ObservedPropertySimplePU<string>;
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue: string) {
        this.__msg.set(newValue);
    }
    async aboutToAppear() {
        this.msg = await this.store.getData('data');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("msg:" + this.msg);
            Text.debugLine("entry/src/main/ets/pages/2024-11-11/Index2_24_11_22.ets(15:5)", "entry");
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index2_24_11_22";
    }
}
registerNamedRoute(() => new Index2_24_11_22(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/Index2_24_11_22", pageFullPath: "entry/src/main/ets/pages/2024-11-11/Index2_24_11_22", integratedHsp: "false" });
