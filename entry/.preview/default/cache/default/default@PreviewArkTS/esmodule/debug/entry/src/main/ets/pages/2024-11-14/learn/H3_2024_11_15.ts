if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface H3_2024_11_15_Params {
}
import router from "@ohos:router";
class H3_2024_11_15 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: H3_2024_11_15_Params) {
    }
    updateStateVars(params: H3_2024_11_15_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15.ets(8:5)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15.ets(9:7)", "entry");
            Column.layoutWeight(1);
            Column.width('100%');
            Column.linearGradient({ direction: GradientDirection.Bottom, repeating: false, colors: [['#ff5f5e5e', 0], ['#a0a0a0', 0.8]] });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15.ets(12:7)", "entry");
            Column.layoutWeight(2);
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backdropBlur(30);
            Column.backgroundImage('/images/1.png');
            Column.backgroundImageSize({ width: "100%", height: "100%" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15.ets(13:9)", "entry");
            Column.backgroundImage('/images/1.png');
            Column.width('100%');
            Column.height('200');
            Column.backgroundImageSize({ width: "100%" });
            Column.backgroundImagePosition(Alignment.Center);
        }, Column);
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15.ets(20:7)", "entry");
            Stack.layoutWeight(1);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15.ets(21:9)", "entry");
            Column.linearGradient({ direction: GradientDirection.Top, repeating: false, colors: [['#ff5f5e5e', 0], ['#a0a0a0', 0.8]] });
            Column.width('100%');
            Column.height('100%');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('进入直播间', {
                type: ButtonType.Normal
            });
            Button.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15.ets(24:9)", "entry");
            Button.margin({ bottom: 20 });
            Button.borderRadius('50%');
            Button.backgroundColor(Color.Transparent);
            Button.fontColor('#fff');
            Button.fontWeight(FontWeight.Medium);
            Button.border({ width: 1, color: '#fff', radius: '50%' });
            Button.onClick(() => {
                router.replaceUrl({
                    url: 'pages/2024-11-14/learn/H2_2024_11_15'
                });
            });
        }, Button);
        Button.pop();
        Stack.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "H3_2024_11_15";
    }
}
registerNamedRoute(() => new H3_2024_11_15(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-14/learn/H3_2024_11_15", pageFullPath: "entry/src/main/ets/pages/2024-11-14/learn/H3_2024_11_15", integratedHsp: "false" });
