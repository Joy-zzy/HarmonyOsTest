if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface About_Params {
    message?: string;
    store?: testStore;
}
import { testStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/testStore1&";
class About extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new ObservedPropertySimplePU('about', this, "message");
        this.__store = new ObservedPropertyObjectPU(new testStore(), this, "store");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: About_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.store !== undefined) {
            this.store = params.store;
        }
    }
    updateStateVars(params: About_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__store.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__store.aboutToBeDeleted();
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
    private __store: ObservedPropertyObjectPU<testStore>;
    get store() {
        return this.__store.get();
    }
    set store(newValue: testStore) {
        this.__store.set(newValue);
    }
    async aboutToAppear() {
        this.message = await this.store.getMes();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.height('100%');
            RelativeContainer.width('100%');
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.id('AboutHelloWorld');
            Text.fontSize(50);
            Text.fontWeight(FontWeight.Bold);
            Text.alignRules({
                center: { anchor: '__container__', align: VerticalAlign.Center },
                middle: { anchor: '__container__', align: HorizontalAlign.Center }
            });
        }, Text);
        Text.pop();
        RelativeContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "About";
    }
}
registerNamedRoute(() => new About(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/About", pageFullPath: "entry/src/main/ets/pages/2024-11-11/About", integratedHsp: "false" });
