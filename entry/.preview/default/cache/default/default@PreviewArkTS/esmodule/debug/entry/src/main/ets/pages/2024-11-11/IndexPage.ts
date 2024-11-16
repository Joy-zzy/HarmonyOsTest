if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IndexPage_Params {
    store?: advertStore;
    adData?: Partial<AdvertClass>;
}
import { advertStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/advertStore&";
import type { AdvertClass } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/advertStore&";
class IndexPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.store = new advertStore(getContext(this));
        this.__adData = new ObservedPropertyObjectPU({}, this, "adData");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IndexPage_Params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.adData !== undefined) {
            this.adData = params.adData;
        }
    }
    updateStateVars(params: IndexPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__adData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__adData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private store: advertStore;
    private __adData: ObservedPropertyObjectPU<Partial<AdvertClass>>;
    get adData() {
        return this.__adData.get();
    }
    set adData(newValue: Partial<AdvertClass>) {
        this.__adData.set(newValue);
    }
    async aboutToAppear() {
        this.adData = await this.store.getAdvert() as AdvertClass;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-11/IndexPage.ets(12:5)", "entry");
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("首页");
            Text.debugLine("entry/src/main/ets/pages/2024-11-11/IndexPage.ets(13:7)", "entry");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.adData.showAd) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.adData.adTimeL + "");
                        Text.debugLine("entry/src/main/ets/pages/2024-11-11/IndexPage.ets(15:9)", "entry");
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "IndexPage";
    }
}
registerNamedRoute(() => new IndexPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/IndexPage", pageFullPath: "entry/src/main/ets/pages/2024-11-11/IndexPage", integratedHsp: "false" });
