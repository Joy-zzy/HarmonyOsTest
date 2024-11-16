if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WinPage_Params {
    windowClass?: window.Window | undefined;
    img?: image.PixelMap | undefined;
}
import window from "@ohos:window";
import { local } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/local&";
import type image from "@ohos:multimedia.image";
class WinPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__windowClass = new ObservedPropertyObjectPU(undefined, this, "windowClass");
        this.__img = new ObservedPropertyObjectPU(undefined, this, "img");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WinPage_Params) {
        if (params.windowClass !== undefined) {
            this.windowClass = params.windowClass;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
    }
    updateStateVars(params: WinPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__windowClass.purgeDependencyOnElmtId(rmElmtId);
        this.__img.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__windowClass.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
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
    private __img: ObservedPropertyObjectPU<image.PixelMap | undefined>;
    get img() {
        return this.__img.get();
    }
    set img(newValue: image.PixelMap | undefined) {
        this.__img.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        this.windowClass = await window.getLastWindow(getContext(this));
        this.windowClass.on("screenshot", () => {
            AlertDialog.show({
                message: "截屏了"
            });
        });
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
                local.setOrCreate("msg", "你好啊 loadContent");
                await this.windowClass!.loadContent("pages/2024-11-13/NewWinPage", local);
                this.windowClass!.setWindowBackgroundColor("#0000ff");
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("隐私模式");
            Button.onClick(async () => {
                try {
                    await this.windowClass!.setWindowPrivacyMode(true);
                    AlertDialog.show({
                        message: "成功"
                    });
                }
                catch (e) {
                    AlertDialog.show({
                        message: JSON.stringify(e)
                    });
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("获取截屏");
            Button.onClick(async () => {
                this.img = await this.windowClass!.snapshot();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.img!);
            Image.width(200);
        }, Image);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WinPage";
    }
}
registerNamedRoute(() => new WinPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-13/WinPage", pageFullPath: "entry/src/main/ets/pages/2024-11-13/WinPage", integratedHsp: "false" });
