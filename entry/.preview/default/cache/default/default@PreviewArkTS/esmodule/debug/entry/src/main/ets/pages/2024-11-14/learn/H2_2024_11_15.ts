if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Ball_Params {
    op?: number;
    y?: number;
    index?: number;
    dur?: number;
    curve?: MyCurve;
    delay?: number;
    interval?: number;
}
interface H2_2024_11_15_Params {
    winClass?: window.Window | undefined;
    index?: number;
}
import window from "@ohos:window";
class MyCurve {
    public title: string;
    public curve: Curve;
    public color: Color | string;
    constructor(title: string, curve: Curve, color: Color | string = '') {
        this.title = title;
        this.curve = curve;
        this.color = color;
    }
}
const myCurves: MyCurve[] = [
    new MyCurve('Linear', Curve.Linear, '#fff73148'),
    new MyCurve('Ease', Curve.Ease, '#ffa138d9'),
    new MyCurve('EaseIn', Curve.EaseIn, '#ff0047ff'),
    new MyCurve('EaseOut', Curve.EaseOut, '#ff54a89b'),
    new MyCurve('EaseInOut', Curve.EaseInOut, '#ff38f731'),
    new MyCurve('FastOutSlowIn', Curve.FastOutSlowIn, '#ffd9be38')
];
class H2_2024_11_15 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.winClass = undefined;
        this.__index = new ObservedPropertySimplePU(1, this, "index");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: H2_2024_11_15_Params) {
        if (params.winClass !== undefined) {
            this.winClass = params.winClass;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    updateStateVars(params: H2_2024_11_15_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private winClass: window.Window | undefined;
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    async aboutToAppear() {
        this.winClass = await window.getLastWindow(getContext(this));
        this.winClass.setWindowLayoutFullScreen(true);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(38:5)", "entry");
            Swiper.loop(false);
            Swiper.autoPlay(false);
            Swiper.indicator(false);
            Swiper.index(this.index);
            Swiper.effectMode(EdgeEffect.None);
            Swiper.onChange((page) => {
                this.index = page;
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(39:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.padding({ top: 25, bottom: 25 });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(42:7)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(43:9)", "entry");
            Column.width('100%');
            Column.height('30%');
            Column.expandSafeArea([SafeAreaType.KEYBOARD]);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({
                alignContent: Alignment.BottomEnd
            });
            Stack.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(45:9)", "entry");
            Stack.layoutWeight(1);
            Stack.width('100%');
            Stack.expandSafeArea([SafeAreaType.KEYBOARD, SafeAreaType.SYSTEM]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(48:11)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(49:11)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const curve = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Ball(this, {
                                index: this.index,
                                curve: curve
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets", line: 51, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    index: this.index,
                                    curve: curve
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                index: this.index,
                                curve: curve
                            });
                        }
                    }, { name: "Ball" });
                }
            };
            this.forEachUpdateFunction(elmtId, myCurves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Stack.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 5 });
            Row.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(59:9)", "entry");
            Row.width('100%');
            Row.height(50);
            Row.margin({ bottom: 25 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create();
            TextInput.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(60:11)", "entry");
            TextInput.width('70%');
            TextInput.height('100%');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/my.png');
            Image.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(61:11)", "entry");
            Image.width(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/my.png');
            Image.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(62:11)", "entry");
            Image.width(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/my.png');
            Image.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(63:11)", "entry");
            Image.width(28);
        }, Image);
        Row.pop();
        Column.pop();
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "H2_2024_11_15";
    }
}
class Ball extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__op = new ObservedPropertySimplePU(1, this, "op");
        this.__y = new ObservedPropertySimplePU(0, this, "y");
        this.__index = new SynchedPropertySimpleOneWayPU(params.index, this, "index");
        this.__dur = new ObservedPropertySimplePU(0, this, "dur");
        this.__curve = new SynchedPropertyObjectOneWayPU(params.curve, this, "curve");
        this.__delay = new ObservedPropertySimplePU(0, this, "delay");
        this.interval = 0;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("index", this.change);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Ball_Params) {
        if (params.op !== undefined) {
            this.op = params.op;
        }
        if (params.y !== undefined) {
            this.y = params.y;
        }
        if (params.dur !== undefined) {
            this.dur = params.dur;
        }
        if (params.delay !== undefined) {
            this.delay = params.delay;
        }
        if (params.interval !== undefined) {
            this.interval = params.interval;
        }
    }
    updateStateVars(params: Ball_Params) {
        this.__index.reset(params.index);
        this.__curve.reset(params.curve);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__op.purgeDependencyOnElmtId(rmElmtId);
        this.__y.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__dur.purgeDependencyOnElmtId(rmElmtId);
        this.__curve.purgeDependencyOnElmtId(rmElmtId);
        this.__delay.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__op.aboutToBeDeleted();
        this.__y.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__dur.aboutToBeDeleted();
        this.__curve.aboutToBeDeleted();
        this.__delay.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __op: ObservedPropertySimplePU<number>;
    get op() {
        return this.__op.get();
    }
    set op(newValue: number) {
        this.__op.set(newValue);
    }
    private __y: ObservedPropertySimplePU<number>;
    get y() {
        return this.__y.get();
    }
    set y(newValue: number) {
        this.__y.set(newValue);
    }
    private __index: SynchedPropertySimpleOneWayPU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __dur: ObservedPropertySimplePU<number>;
    get dur() {
        return this.__dur.get();
    }
    set dur(newValue: number) {
        this.__dur.set(newValue);
    }
    private __curve: SynchedPropertySimpleOneWayPU<MyCurve>;
    get curve() {
        return this.__curve.get();
    }
    set curve(newValue: MyCurve) {
        this.__curve.set(newValue);
    }
    private __delay: ObservedPropertySimplePU<number>;
    get delay() {
        return this.__delay.get();
    }
    set delay(newValue: number) {
        this.__delay.set(newValue);
    }
    private interval: number;
    change() {
        if (this.index == 0) {
            clearInterval(this.interval);
            this.interval = 0;
        }
        else {
            if (this.interval != 0)
                this.interval = setInterval(() => {
                    this.random();
                }, this.dur + this.delay);
        }
    }
    aboutToAppear(): void {
        this.interval = setInterval(() => {
            this.random();
        }, this.dur + this.delay);
    }
    random() {
        this.op = 0;
        this.y = -100;
        this.dur = Math.floor(Math.random() * 2200);
        this.delay = Math.floor(Math.random() * 1200);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15.ets(111:5)", "entry");
            Context.animation({
                iterations: -1,
                duration: this.dur <= 1200 ? 1200 : this.dur,
                delay: this.delay,
                curve: this.curve.curve
            });
            Column.width('30');
            Column.height('30');
            Column.borderRadius(15);
            Column.backgroundColor('');
            Column.opacity(this.op);
            Column.backgroundColor(this.curve.color);
            Column.position({
                y: this.y,
            });
            Context.animation(null);
        }, Column);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new H2_2024_11_15(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-14/learn/H2_2024_11_15", pageFullPath: "entry/src/main/ets/pages/2024-11-14/learn/H2_2024_11_15", integratedHsp: "false" });
