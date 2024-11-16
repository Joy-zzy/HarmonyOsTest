if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index3_24_11_11_Params {
    store?: TestStore;
}
import { TestStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/TestStore&";
import router from "@ohos:router";
class Index3_24_11_11 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__store = new ObservedPropertyObjectPU(new TestStore(getContext(this)), this, "store");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index3_24_11_11_Params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
    }
    updateStateVars(params: Index3_24_11_11_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__store.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__store.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.debugLine("entry/src/main/ets/pages/2024-11-11/Index3_24_11_11.ets(10:5)", "entry");
            Swiper.width('100%');
            Swiper.height('100%');
            Swiper.loop(false);
            Swiper.effectMode(EdgeEffect.None);
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/1.png');
            Image.debugLine("entry/src/main/ets/pages/2024-11-11/Index3_24_11_11.ets(11:7)", "entry");
            Image.width('100%');
            Image.height('100%');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({
                alignContent: Alignment.BottomEnd
            });
            Stack.debugLine("entry/src/main/ets/pages/2024-11-11/Index3_24_11_11.ets(12:7)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/gray.png');
            Image.debugLine("entry/src/main/ets/pages/2024-11-11/Index3_24_11_11.ets(15:9)", "entry");
            Image.width('100%');
            Image.height('100%');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('进入');
            Button.debugLine("entry/src/main/ets/pages/2024-11-11/Index3_24_11_11.ets(16:9)", "entry");
            Button.onClick(() => {
                this.store.putData('started', 'true');
                router.replaceUrl({
                    url: 'pages/2024-11-11/Index5_24_11_11'
                });
            });
        }, Button);
        Button.pop();
        Stack.pop();
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index3_24_11_11";
    }
}
registerNamedRoute(() => new Index3_24_11_11(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/Index3_24_11_11", pageFullPath: "entry/src/main/ets/pages/2024-11-11/Index3_24_11_11", integratedHsp: "false" });
