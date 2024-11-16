if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ClockRepeat_Params {
    types?: string[];
    weeksNum?: boolean[];
    weeks?: string[];
    vis?: boolean;
    cop?: boolean[];
    repeat?: string;
    coR?: string;
    days?: number[];
    coD?: number[];
    selected?: number;
}
import router from "@ohos:router";
class ClockRepeat extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__types = new ObservedPropertyObjectPU(['只响一次', '每天', '法定工作日', '法定节假日', '周一到周五', '自定义'], this, "types");
        this.__weeksNum = new ObservedPropertyObjectPU(Array<boolean>(this.types.length), this, "weeksNum");
        this.weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        this.__vis = new ObservedPropertySimplePU(false, this, "vis");
        this.__cop = new ObservedPropertyObjectPU([...this.weeksNum], this, "cop");
        this.__repeat = this.createStorageLink('repeat', '只响一次', "repeat");
        this.__coR = new ObservedPropertySimplePU(this.repeat, this, "coR");
        this.__days = this.createStorageLink('dayOfWeeks', [], "days");
        this.__coD = new ObservedPropertyObjectPU([...this.days], this, "coD");
        this.__selected = new ObservedPropertySimplePU(-1, this, "selected");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ClockRepeat_Params) {
        if (params.types !== undefined) {
            this.types = params.types;
        }
        if (params.weeksNum !== undefined) {
            this.weeksNum = params.weeksNum;
        }
        if (params.weeks !== undefined) {
            this.weeks = params.weeks;
        }
        if (params.vis !== undefined) {
            this.vis = params.vis;
        }
        if (params.cop !== undefined) {
            this.cop = params.cop;
        }
        if (params.coR !== undefined) {
            this.coR = params.coR;
        }
        if (params.coD !== undefined) {
            this.coD = params.coD;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
    }
    updateStateVars(params: ClockRepeat_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__types.purgeDependencyOnElmtId(rmElmtId);
        this.__weeksNum.purgeDependencyOnElmtId(rmElmtId);
        this.__vis.purgeDependencyOnElmtId(rmElmtId);
        this.__cop.purgeDependencyOnElmtId(rmElmtId);
        this.__repeat.purgeDependencyOnElmtId(rmElmtId);
        this.__coR.purgeDependencyOnElmtId(rmElmtId);
        this.__days.purgeDependencyOnElmtId(rmElmtId);
        this.__coD.purgeDependencyOnElmtId(rmElmtId);
        this.__selected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__types.aboutToBeDeleted();
        this.__weeksNum.aboutToBeDeleted();
        this.__vis.aboutToBeDeleted();
        this.__cop.aboutToBeDeleted();
        this.__repeat.aboutToBeDeleted();
        this.__coR.aboutToBeDeleted();
        this.__days.aboutToBeDeleted();
        this.__coD.aboutToBeDeleted();
        this.__selected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __types: ObservedPropertyObjectPU<string[]>;
    get types() {
        return this.__types.get();
    }
    set types(newValue: string[]) {
        this.__types.set(newValue);
    }
    private __weeksNum: ObservedPropertyObjectPU<boolean[]>;
    get weeksNum() {
        return this.__weeksNum.get();
    }
    set weeksNum(newValue: boolean[]) {
        this.__weeksNum.set(newValue);
    }
    private weeks: string[];
    private __vis: ObservedPropertySimplePU<boolean>;
    get vis() {
        return this.__vis.get();
    }
    set vis(newValue: boolean) {
        this.__vis.set(newValue);
    }
    private __cop: ObservedPropertyObjectPU<boolean[]>;
    get cop() {
        return this.__cop.get();
    }
    set cop(newValue: boolean[]) {
        this.__cop.set(newValue);
    }
    private __repeat: ObservedPropertyAbstractPU<string>;
    get repeat() {
        return this.__repeat.get();
    }
    set repeat(newValue: string) {
        this.__repeat.set(newValue);
    }
    private __coR: ObservedPropertySimplePU<string>;
    get coR() {
        return this.__coR.get();
    }
    set coR(newValue: string) {
        this.__coR.set(newValue);
    }
    private __days: ObservedPropertyAbstractPU<number[]>;
    get days() {
        return this.__days.get();
    }
    set days(newValue: number[]) {
        this.__days.set(newValue);
    }
    private __coD: ObservedPropertyObjectPU<number[]>;
    get coD() {
        return this.__coD.get();
    }
    set coD(newValue: number[]) {
        this.__coD.set(newValue);
    }
    private __selected: ObservedPropertySimplePU<number>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: number) {
        this.__selected.set(newValue);
    }
    aboutToAppear(): void {
        this.selected = this.types.findIndex(type => type == this.repeat);
        if (this.selected == -1) {
            this.selected = this.types.length - 1;
            let ws = this.repeat.split(' ');
            this.weeks.map((week, index) => {
                if (ws.findIndex(w => w == week) != -1)
                    this.weeksNum[index] = true;
            });
            this.cop = [...this.weeksNum];
        }
    }
    zhou(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(70);
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('自定义');
            Text.fontSize(18);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const week = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.padding({ left: 30, right: 30 });
                    Column.height(50);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.height('100%');
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.SpaceBetween);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(week);
                    Text.fontSize(18);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Radio.create({
                        group: week,
                        value: index + ""
                    });
                    Radio.checked(this.cop[index]);
                    Radio.onClick(() => {
                        this.cop[index] = !this.cop[index];
                    });
                }, Radio);
                Row.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.weeks, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ left: 30, right: 30 });
            Row.width('100%');
            Row.margin({ top: 50 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消', {
                type: ButtonType.Normal
            });
            Button.width('48%');
            Button.height(50);
            Button.fontSize(20);
            Button.onClick(() => {
                this.vis = false;
                this.cop = [...this.weeksNum];
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定', {
                type: ButtonType.Normal
            });
            Button.width('48%');
            Button.height(50);
            Button.fontSize(20);
            Button.onClick(() => {
                this.weeksNum = [...this.cop];
                this.vis = false;
                let ind = this.types.length - 1;
                this.types[ind] = this.weeks.filter((week, index) => this.weeksNum[index]).join(' ');
                this.coD = [];
                this.weeksNum.filter((week, index) => {
                    if (week) {
                        this.coD.push(index + 1);
                    }
                });
                this.repeat = this.types[ind];
                if (this.types[ind] == '') {
                    this.types[ind] = '自定义';
                    this.repeat = '只响一次';
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.height('100%');
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#fff');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/cuo.png');
            Image.width(32);
            Image.onClick(() => {
                this.repeat = this.coR;
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('重复');
            Text.fontSize(20);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/dui.png');
            Image.width(32);
            Image.onClick(() => {
                this.days = [...this.coD];
                router.back();
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const type = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(50);
                    Row.backgroundColor(index == this.selected ? '#ffd0e6f5' : '#efefef');
                    Row.borderRadius(15);
                    Row.padding({ left: 10, right: 10 });
                    Row.onClick(() => {
                        this.selected = index;
                        if (index == this.types.length - 1)
                            this.vis = true;
                        this.repeat = type;
                        switch (index) {
                            case 0:
                                this.coD = [];
                                break;
                            case 1:
                                this.coD = [1, 2, 3, 4, 5, 6, 7];
                                break;
                            case 2:
                            case 4:
                                this.coD = [1, 2, 3, 4, 5];
                                break;
                            case 3:
                                this.coD = [6, 7];
                                break;
                        }
                    });
                    Row.bindSheet({ value: this.vis, changeEvent: newValue => { this.vis = newValue; } }, { builder: this.zhou.bind(this) }, {
                        height: 600
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create('/images/dui_blue.png');
                    Image.width(20);
                    Image.visibility(index == this.selected ? Visibility.Visible : Visibility.Hidden);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(type);
                    Text.fontSize(18);
                    Text.margin({ left: 10 });
                    Text.fontColor(index == this.selected ? '#1296db' : 'black');
                    Text.fontWeight(FontWeight.Medium);
                    Text.constraintSize({ maxWidth: 'calc(100% - 36vp)' });
                    Text.maxLines(1);
                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index == this.types.length - 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create('/images/next.png');
                                Image.width(16);
                            }, Image);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.types, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ClockRepeat";
    }
}
registerNamedRoute(() => new ClockRepeat(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-12/learn/ClockRepeat", pageFullPath: "entry/src/main/ets/pages/2024-11-12/learn/ClockRepeat", integratedHsp: "false" });
