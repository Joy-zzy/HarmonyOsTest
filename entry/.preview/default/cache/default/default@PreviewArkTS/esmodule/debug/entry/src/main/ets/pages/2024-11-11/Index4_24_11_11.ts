if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index4_22_11_11_Params {
    store?: advertStore;
    adData?: Partial<AdvertClass>;
    time?: number;
    interval?: number;
}
import { advertStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/advertStore&";
import type { AdvertClass } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/advertStore&";
import router from "@ohos:router";
class Index4_22_11_11 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.store = new advertStore(getContext(this));
        this.__adData = new ObservedPropertyObjectPU({}, this, "adData");
        this.__time = new ObservedPropertySimplePU(0, this, "time");
        this.interval = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index4_22_11_11_Params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.adData !== undefined) {
            this.adData = params.adData;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.interval !== undefined) {
            this.interval = params.interval;
        }
    }
    updateStateVars(params: Index4_22_11_11_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__adData.purgeDependencyOnElmtId(rmElmtId);
        this.__time.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__adData.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
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
    private __time: ObservedPropertySimplePU<number>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private interval: number;
    async aboutToAppear() {
        this.adData = await this.store.getAdvert() as AdvertClass;
        this.time = this.adData.adTimeL!;
        this.interval = setInterval(() => {
            if (this.time == 0) {
                clearInterval(this.interval);
                let advert: AdvertClass = {
                    showAd: false,
                    adTimeL: 0,
                    adImg: ''
                };
                this.store.putAdvert(JSON.stringify(advert));
                this.adData = advert;
                router.replaceUrl({
                    url: 'pages/2024-11-11/Index5_24_11_11'
                });
            }
            this.time--;
        }, 1000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-11/Index4_24_11_11.ets(37:5)", "entry");
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("广告");
            Text.debugLine("entry/src/main/ets/pages/2024-11-11/Index4_24_11_11.ets(38:7)", "entry");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.adData.showAd) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.time + "");
                        Text.debugLine("entry/src/main/ets/pages/2024-11-11/Index4_24_11_11.ets(40:9)", "entry");
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
        return "Index4_22_11_11";
    }
}
registerNamedRoute(() => new Index4_22_11_11(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/Index4_24_11_11", pageFullPath: "entry/src/main/ets/pages/2024-11-11/Index4_24_11_11", integratedHsp: "false" });
