if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewWinPage_Params {
    windowClass?: window.Window | undefined;
}
import window from "@ohos:window";
import { local } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/local&";
class NewWinPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__windowClass = new ObservedPropertyObjectPU(undefined, this, "windowClass");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewWinPage_Params) {
        if (params.windowClass !== undefined) {
            this.windowClass = params.windowClass;
        }
    }
    updateStateVars(params: NewWinPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__windowClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__windowClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __windowClass: ObservedPropertyObjectPU<window.Window | undefined>;
    get windowClass() {
        return this.__windowClass.get();
    }
    set windowClass(newValue: window.Window | undefined) {
        this.__windowClass.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        this.windowClass = await window.getLastWindow(getContext(this));
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height("100%");
            Column.backgroundColor(Color.Orange);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("loadContent");
            Button.onClick(async () => {
                // await this.windowClass?.setUIContent("pages/About")
                local.setOrCreate("msg", "你好 about页面");
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "NewWinPage";
    }
}
registerNamedRoute(() => new NewWinPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-13/NewWinPage", pageFullPath: "entry/src/main/ets/pages/2024-11-13/NewWinPage", integratedHsp: "false" });
