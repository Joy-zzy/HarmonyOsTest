if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface H1_2024_11_15_Params {
    disPlayClass?: display.Display;
}
import display from "@ohos:display";
class H1_2024_11_15 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.disPlayClass = display.getDefaultDisplaySync();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: H1_2024_11_15_Params) {
        if (params.disPlayClass !== undefined) {
            this.disPlayClass = params.disPlayClass;
        }
    }
    updateStateVars(params: H1_2024_11_15_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private disPlayClass: display.Display;
    aboutToAppear(): void {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('display属性');
            Button.onClick(() => {
                console.log(JSON.stringify(this.disPlayClass));
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('获取屏幕不可用区域信息');
            Button.onClick(async () => {
                // 挖空、刘海、导航等区域
                console.log(JSON.stringify(await this.disPlayClass.getCutoutInfo()));
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('获取屏幕的折叠状态');
            Button.onClick(async () => {
                console.log(JSON.stringify(display.getFoldStatus()));
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('获取可折叠设备的显示模式');
            Button.onClick(() => {
                console.log(JSON.stringify(display.getFoldDisplayMode()));
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('获取当前模式下的可折叠区域');
            Button.onClick(() => {
                console.log(JSON.stringify(display.getCurrentFoldCreaseRegion()));
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "H1_2024_11_15";
    }
}
registerNamedRoute(() => new H1_2024_11_15(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-14/learn/H1_2024_11_15", pageFullPath: "entry/src/main/ets/pages/2024-11-14/learn/H1_2024_11_15", integratedHsp: "false" });
