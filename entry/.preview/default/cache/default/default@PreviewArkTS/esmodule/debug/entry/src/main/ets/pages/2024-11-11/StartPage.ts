if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StartPage_Params {
    store?: startStore;
}
import router from "@ohos:router";
import { startStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/startStore&";
class StartPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.store = new startStore(getContext(this));
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StartPage_Params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
    }
    updateStateVars(params: StartPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private store: startStore;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.debugLine("entry/src/main/ets/pages/2024-11-11/StartPage.ets(9:5)", "entry");
            Swiper.height('100%');
            Swiper.width('100%');
            Swiper.indicator(true);
            Swiper.onChange((index: number) => {
                if (index == 1) {
                    router.replaceUrl({
                        url: "pages/IndexPage"
                    });
                    this.store.putMes("started");
                }
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create("/image/2.jpg");
            Image.debugLine("entry/src/main/ets/pages/2024-11-11/StartPage.ets(10:7)", "entry");
            Image.height('100%');
            Image.width('100%');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create("/image/2.jpg");
            Image.debugLine("entry/src/main/ets/pages/2024-11-11/StartPage.ets(13:7)", "entry");
            Image.height('100%');
            Image.width('100%');
        }, Image);
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "StartPage";
    }
}
registerNamedRoute(() => new StartPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/StartPage", pageFullPath: "entry/src/main/ets/pages/2024-11-11/StartPage", integratedHsp: "false" });
