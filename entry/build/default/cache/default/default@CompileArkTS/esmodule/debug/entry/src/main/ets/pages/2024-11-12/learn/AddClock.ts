if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AddClock_Params {
    time?: Partial<TimePickerResult>;
    selTime?: Date;
    del?: boolean;
    title?: string;
    info?: RemiInfo | undefined;
    shake?: boolean;
    weeks?: string[];
    repeat?: string;
    days?: number[];
    cha?: string;
    msg?: string;
    store?: RemiStore;
}
import router from "@ohos:router";
import { RemiStore } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-12/learn/RemiStore&";
import type { RemiInfo } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-12/learn/RemiStore&";
import util from "@ohos:util";
import reminderAgentManager from "@ohos:reminderAgentManager";
class AddClock extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__time = new ObservedPropertyObjectPU({
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
        }, this, "time");
        this.__selTime = new ObservedPropertyObjectPU(new Date(), this, "selTime");
        this.__del = new ObservedPropertySimplePU(false, this, "del");
        this.__title = new ObservedPropertySimplePU('', this, "title");
        this.__info = this.createStorageLink('remiInfo', undefined, "info");
        this.__shake = new ObservedPropertySimplePU(false, this, "shake");
        this.weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
        this.__repeat = this.createStorageLink('repeat', '只响一次', "repeat");
        this.__days = this.createStorageProp('dayOfWeeks', [], "days");
        this.__cha = new ObservedPropertySimplePU('0', this, "cha");
        this.__msg = new ObservedPropertySimplePU('', this, "msg");
        this.store = new RemiStore(getContext(this));
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AddClock_Params) {
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.selTime !== undefined) {
            this.selTime = params.selTime;
        }
        if (params.del !== undefined) {
            this.del = params.del;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.shake !== undefined) {
            this.shake = params.shake;
        }
        if (params.weeks !== undefined) {
            this.weeks = params.weeks;
        }
        if (params.cha !== undefined) {
            this.cha = params.cha;
        }
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.store !== undefined) {
            this.store = params.store;
        }
    }
    updateStateVars(params: AddClock_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__time.purgeDependencyOnElmtId(rmElmtId);
        this.__selTime.purgeDependencyOnElmtId(rmElmtId);
        this.__del.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__info.purgeDependencyOnElmtId(rmElmtId);
        this.__shake.purgeDependencyOnElmtId(rmElmtId);
        this.__repeat.purgeDependencyOnElmtId(rmElmtId);
        this.__days.purgeDependencyOnElmtId(rmElmtId);
        this.__cha.purgeDependencyOnElmtId(rmElmtId);
        this.__msg.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__time.aboutToBeDeleted();
        this.__selTime.aboutToBeDeleted();
        this.__del.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__info.aboutToBeDeleted();
        this.__shake.aboutToBeDeleted();
        this.__repeat.aboutToBeDeleted();
        this.__days.aboutToBeDeleted();
        this.__cha.aboutToBeDeleted();
        this.__msg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __time: ObservedPropertyObjectPU<Partial<TimePickerResult>>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: Partial<TimePickerResult>) {
        this.__time.set(newValue);
    }
    private __selTime: ObservedPropertyObjectPU<Date>;
    get selTime() {
        return this.__selTime.get();
    }
    set selTime(newValue: Date) {
        this.__selTime.set(newValue);
    }
    private __del: ObservedPropertySimplePU<boolean>;
    get del() {
        return this.__del.get();
    }
    set del(newValue: boolean) {
        this.__del.set(newValue);
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __info: ObservedPropertyAbstractPU<RemiInfo | undefined>;
    get info() {
        return this.__info.get();
    }
    set info(newValue: RemiInfo | undefined) {
        this.__info.set(newValue);
    }
    private __shake: ObservedPropertySimplePU<boolean>;
    get shake() {
        return this.__shake.get();
    }
    set shake(newValue: boolean) {
        this.__shake.set(newValue);
    }
    private weeks: string[];
    private __repeat: ObservedPropertyAbstractPU<string>;
    get repeat() {
        return this.__repeat.get();
    }
    set repeat(newValue: string) {
        this.__repeat.set(newValue);
    }
    private __days: ObservedPropertyAbstractPU<number[]>;
    get days() {
        return this.__days.get();
    }
    set days(newValue: number[]) {
        this.__days.set(newValue);
    }
    private __cha: ObservedPropertySimplePU<string>;
    get cha() {
        return this.__cha.get();
    }
    set cha(newValue: string) {
        this.__cha.set(newValue);
    }
    private __msg: ObservedPropertySimplePU<string>;
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue: string) {
        this.__msg.set(newValue);
    }
    private store: RemiStore;
    aboutToAppear(): void {
        if (this.info == undefined) {
            this.days = [];
            this.repeat = '只响一次';
        }
        else {
            this.repeat = this.info.type;
            this.del = this.info.autoDel;
            this.title = this.info.title;
            this.msg = this.info.content;
            this.days = [...this.info.dayOfWeeks];
            this.shake = this.info.shake;
            this.selTime.setHours(this.info.hour);
            this.selTime.setMinutes(this.info.minute);
            this.time = {
                hour: this.info.hour,
                minute: this.info.minute
            };
            this.title = this.info.title;
            let d = new Date();
            let num: number;
            if (this.time.hour! > d.getHours() || this.time.hour == d.getHours() && this.time.minute! >= d.getMinutes()) {
                num = (this.time.hour! - d.getHours()) * 60 + this.time.minute! - d.getMinutes();
            }
            else {
                num = (24 - d.getHours() + this.time.hour!) * 60 + this.time.minute! - d.getMinutes();
            }
            this.cha = Math.floor(num / 60) + "时" + (num % 60) + "分";
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(20);
            Column.backgroundColor('#fff');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/cuo.png');
            Image.width(28);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('添加闹钟');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cha + '小时后响铃');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/dui.png');
            Image.width(28);
            Image.onClick(async () => {
                let remiInfo: RemiInfo = {
                    hour: this.time.hour!,
                    dayOfWeeks: [...this.days],
                    minute: this.time.minute!,
                    title: this.title,
                    content: this.msg,
                    enable: this.info == undefined ? true : this.info.enable,
                    reminderId: 0,
                    id: this.info == undefined ? util.generateRandomUUID() : this.info.id,
                    type: this.repeat,
                    shake: this.shake,
                    autoDel: this.del
                };
                let publishInfo: reminderAgentManager.ReminderRequestAlarm = {
                    reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
                    hour: this.time.hour!,
                    minute: this.time.minute!,
                    title: this.title == '' ? '闹钟' : this.title,
                    content: this.msg,
                    daysOfWeek: [...this.days],
                    ringDuration: 10,
                    wantAgent: {
                        abilityName: "EntryAbility",
                        pkgName: "com.example.myapplication"
                    },
                };
                if (this.info != undefined) {
                    reminderAgentManager.cancelReminder(this.info.reminderId);
                }
                try {
                    remiInfo.reminderId = await reminderAgentManager.publishReminder(publishInfo);
                }
                catch (e) {
                    // AlertDialog.show({
                    //   message: JSON.stringify(e)
                    // })
                }
                if (this.info == undefined) {
                    await this.store.putData(remiInfo);
                }
                else {
                    this.info = remiInfo;
                    await this.store.replaceData(remiInfo);
                }
                router.back();
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TimePicker.create({
                selected: this.selTime
            });
            TimePicker.margin({ top: 50, bottom: 50 });
            TimePicker.onChange((time) => {
                this.time.hour = time.hour;
                this.time.minute = time.minute;
                let d = new Date();
                let num: number;
                if (this.time.hour > d.getHours() || this.time.hour == d.getHours() && this.time.minute >= d.getMinutes()) {
                    num = (this.time.hour - d.getHours()) * 60 + this.time.minute - d.getMinutes();
                }
                else {
                    num = (24 - d.getHours() + this.time.hour) * 60 + this.time.minute - d.getMinutes();
                }
                this.cha = Math.floor(num / 60) + "时" + (num % 60) + "分";
            });
        }, TimePicker);
        TimePicker.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.padding({ left: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('铃声');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('元素动态铃声');
            Text.fontSize(16);
            Text.fontColor('#aaaaaa');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/next.png');
            Image.width(16);
        }, Image);
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.padding({ left: 10 });
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/2024-11-12/learn/ClockRepeat'
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('重复');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.layoutWeight(1);
            Row.justifyContent(FlexAlign.End);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.repeat);
            Text.fontSize(16);
            Text.fontColor('#aaaaaa');
            Text.textAlign(TextAlign.End);
            Text.constraintSize({ maxWidth: '80%' });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/next.png');
            Image.width(16);
        }, Image);
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.padding({ left: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('响铃时震动');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({
                isOn: { value: this.shake, changeEvent: newValue => { this.shake = newValue; } },
                type: ToggleType.Switch
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.padding({ left: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('响铃后删除此闹钟');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({
                isOn: { value: this.del, changeEvent: newValue => { this.del = newValue; } },
                type: ToggleType.Switch
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(50);
            Row.width('100%');
            Row.backgroundColor('#efefef');
            Row.borderRadius(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('标题');
            Text.padding({ left: 10 });
            Text.fontSize(18);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: "请输入",
                text: { value: this.title, changeEvent: newValue => { this.title = newValue; } }
            });
            TextInput.layoutWeight(1);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.fontSize(16);
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(50);
            Row.width('100%');
            Row.backgroundColor('#efefef');
            Row.borderRadius(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('备注');
            Text.padding({ left: 10 });
            Text.fontSize(18);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: "请输入",
                text: { value: this.msg, changeEvent: newValue => { this.msg = newValue; } }
            });
            TextInput.layoutWeight(1);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.fontSize(16);
        }, TextInput);
        Row.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AddClock";
    }
}
registerNamedRoute(() => new AddClock(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-12/learn/AddClock", pageFullPath: "entry/src/main/ets/pages/2024-11-12/learn/AddClock", integratedHsp: "false" });
