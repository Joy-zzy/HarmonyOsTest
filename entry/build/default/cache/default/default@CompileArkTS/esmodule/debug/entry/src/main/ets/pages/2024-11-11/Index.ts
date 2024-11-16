if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    mes?: string;
    store?: testStore;
}
import { testStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/testStore1&";
import router from "@ohos:router";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mes = new ObservedPropertySimplePU("hello preferences", this, "mes");
        this.store = new testStore();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.mes !== undefined) {
            this.mes = params.mes;
        }
        if (params.store !== undefined) {
            this.store = params.store;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mes.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mes: ObservedPropertySimplePU<string>;
    get mes() {
        return this.__mes.get();
    }
    set mes(newValue: string) {
        this.__mes.set(newValue);
    }
    private store: testStore;
    async aboutToAppear() {
        this.mes = await this.store.getMes();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("mes:" + this.mes);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("点击存储");
            Button.onClick(async () => {
                await this.store.putMes("hello 你好 首选项");
                this.mes = await this.store.getMes();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("获取");
            Button.onClick(async () => {
                AlertDialog.show({
                    message: await this.store.getMes()
                });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("关于");
            Button.onClick(() => {
                router.pushUrl({
                    url: "pages/About"
                });
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-11/Index", pageFullPath: "entry/src/main/ets/pages/2024-11-11/Index", integratedHsp: "false" });
