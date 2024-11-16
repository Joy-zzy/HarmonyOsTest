if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index2_2024_11_13_Params {
    winClass?: window.Window | undefined;
}
import window from "@ohos:window";
class Index2_2024_11_13 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__winClass = new ObservedPropertyObjectPU(undefined, this, "winClass");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index2_2024_11_13_Params) {
        if (params.winClass !== undefined) {
            this.winClass = params.winClass;
        }
    }
    updateStateVars(params: Index2_2024_11_13_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__winClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__winClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __winClass: ObservedPropertyObjectPU<window.Window | undefined>;
    get winClass() {
        return this.__winClass.get();
    }
    set winClass(newValue: window.Window | undefined) {
        this.__winClass.set(newValue);
    }
    async aboutToAppear() {
        this.winClass = await window.getLastWindow(getContext(this));
        this.winClass.on("touchOutside", () => {
            console.log("在屏幕外点击");
        });
        this.winClass.on("keyboardHeightChange", () => {
            console.log("键盘高度变化");
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create();
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('获取当前窗口的属性');
            Button.onClick(async () => {
                console.info(JSON.stringify(this.winClass!.getWindowProperties()));
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('获取需规避的区域');
            Button.onClick(() => {
                console.info('软键盘', JSON.stringify(this.winClass!.getWindowAvoidArea(window.AvoidAreaType.TYPE_KEYBOARD)));
                console.info('导航条', JSON.stringify(this.winClass!.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR)));
                console.info('手势', JSON.stringify(this.winClass!.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM_GESTURE)));
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('设置沉浸式布局');
            Button.onClick(() => {
                this.winClass!.setWindowLayoutFullScreen(true);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("设置窗口全屏模式时导航栏、状态栏的可见模式");
            Button.onClick(async () => {
                await this.winClass!.setWindowSystemBarEnable(["navigation"]); // 将系统栏设置为不可见。
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('创建窗口');
            Button.onClick(async () => {
                // this.winClass!.resize(400, 400)
                let config: window.Configuration = {
                    name: "newWin",
                    windowType: window.WindowType.TYPE_DIALOG,
                    ctx: getContext(this),
                    parentId: 0
                };
                const newWindow: window.Window = await window.createWindow(config);
                newWindow.on("windowSizeChange", () => {
                    // AlertDialog.show({
                    //   message:"窗口尺寸改变了"
                    // })
                });
                await newWindow.resize(300, 400);
                await newWindow.setUIContent("pages/2024-11-13/WinPage");
                await newWindow.showWindow();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index2_2024_11_13";
    }
}
registerNamedRoute(() => new Index2_2024_11_13(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-13/learn/Index2_2024_11_13", pageFullPath: "entry/src/main/ets/pages/2024-11-13/learn/Index2_2024_11_13", integratedHsp: "false" });
