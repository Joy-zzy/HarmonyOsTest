if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ClockItem_Params {
    clock?: RemiInfo;
}
interface AlarmClock_Params {
    store?: RemiStore;
    alarms?: RemiInfo[];
    timeInterval?: number;
}
import notificationManager from "@ohos:notificationManager";
import type Base from "@ohos:base";
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import { RemiStore } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-12/learn/RemiStore&";
import type { RemiInfo } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-12/learn/RemiStore&";
import reminderAgentManager from "@ohos:reminderAgentManager";
class AlarmClock extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.store = new RemiStore(getContext(this));
        this.__alarms = new ObservedPropertyObjectPU([], this, "alarms");
        this.timeInterval = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AlarmClock_Params) {
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.alarms !== undefined) {
            this.alarms = params.alarms;
        }
        if (params.timeInterval !== undefined) {
            this.timeInterval = params.timeInterval;
        }
    }
    updateStateVars(params: AlarmClock_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__alarms.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__alarms.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private store: RemiStore;
    private __alarms: ObservedPropertyObjectPU<RemiInfo[]>;
    get alarms() {
        return this.__alarms.get();
    }
    set alarms(newValue: RemiInfo[]) {
        this.__alarms.set(newValue);
    }
    private timeInterval: number;
    async onPageShow() {
        this.alarms = await this.store.getData();
        clearInterval(this.timeInterval);
        let m = new Date().getMinutes();
        let h = new Date().getHours();
        this.timeInterval = setInterval(async () => {
            let d = new Date();
            if (d.getMinutes() != m || d.getHours() != h && this.alarms.length != 0) {
                for (let i = 0; i < this.alarms.length; i++) {
                    let clock = this.alarms[i];
                    if (clock.enable && d.getHours() * 60 + d.getMinutes() == clock.hour * 60 + clock.minute) {
                        if (clock.autoDel) {
                            setTimeout(() => {
                                this.delClock(clock);
                            }, 1000);
                        }
                        if (clock.dayOfWeeks.length == 0) {
                            setTimeout(() => {
                                reminderAgentManager.cancelReminder(clock.reminderId);
                            }, 9000);
                            clock.enable = false;
                            this.alarms.splice(i, 1, clock);
                            this.store.replaceData(clock);
                        }
                    }
                }
            }
        }, 1000);
    }
    async aboutToAppear() {
        let enable = await notificationManager.isNotificationEnabled();
        if (!enable) {
            notificationManager.requestEnableNotification().then(() => {
                promptAction.showToast({
                    message: '授权成功'
                });
            }).catch((e: Base.BusinessError) => {
                if (e.code == 1600004) {
                    AlertDialog.show({
                        message: '禁止通知'
                    });
                }
                else {
                    AlertDialog.show({
                        message: '其他错误'
                    });
                }
            });
        }
    }
    async delClock(alarm: RemiInfo) {
        setTimeout(async () => {
            await reminderAgentManager.cancelReminder(alarm.reminderId);
        }, 9000);
        let index = await this.store.delData(alarm);
        this.alarms.splice(index, 1);
    }
    listEnd(alarm: RemiInfo, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/delete.png');
            Image.width(32);
            Image.margin({ left: 10 });
            Image.onClick(async () => {
                await this.delClock(alarm);
            });
        }, Image);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.height('100%');
            Stack.width('100%');
            Stack.padding({ left: 15, right: 15, top: 20, bottom: 20 });
            Stack.align(Alignment.Top);
            Stack.backgroundColor('#f1f1f1');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('闹钟');
            Text.fontSize(22);
            Text.width('90%');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const alarm = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.swipeAction({
                            end: this.listEnd.bind(this, alarm)
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            __Common__.create();
                            __Common__.margin({ bottom: 10 });
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ClockItem(this, {
                                        clock: alarm
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/2024-11-12/learn/AlarmClock.ets", line: 89, col: 15 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            clock: alarm
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        clock: alarm
                                    });
                                }
                            }, { name: "ClockItem" });
                        }
                        __Common__.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.alarms, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('/images/plus.png');
            Image.width(30);
            Image.height(30);
            Image.position({ bottom: 0, right: 0 });
            Image.onClick(() => {
                AppStorage.setOrCreate<RemiInfo>('remiInfo', undefined);
                router.pushUrl({
                    url: 'pages/2024-11-12/learn/AddClock'
                });
            });
        }, Image);
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AlarmClock";
    }
}
class ClockItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__clock = new SynchedPropertyNesedObjectPU(params.clock, this, "clock");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ClockItem_Params) {
        this.__clock.set(params.clock);
    }
    updateStateVars(params: ClockItem_Params) {
        this.__clock.set(params.clock);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__clock.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__clock.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __clock: SynchedPropertyNesedObjectPU<RemiInfo>;
    get clock() {
        return this.__clock.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(80);
            Row.backgroundColor('#fff');
            Row.borderRadius(15);
            Row.padding({ left: 10, right: 10 });
            Row.onClick(() => {
                AppStorage.setOrCreate<RemiInfo>('remiInfo', ObservedObject.GetRawObject(this.clock));
                router.pushUrl({
                    url: 'pages/2024-11-12/learn/AddClock'
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create((this.clock.hour - (this.clock.hour > 12 ? 12 : 0)).toString().padStart(2, '0') + ":" + this.clock.minute.toString().padStart(2, '0'));
            Span.fontSize(22);
            Span.fontWeight(FontWeight.Bold);
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(this.clock.hour > 12 ? '下午' : '上午');
            Span.fontSize(14);
            Span.fontColor('gray');
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ImageSpan.create('');
            ImageSpan.margin({ left: 10 });
        }, ImageSpan);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(this.clock.title);
            Span.fontSize(18);
            Span.fontWeight(FontWeight.Medium);
        }, Span);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.clock.type);
            Text.fontColor('#aaaaaa');
            Text.fontSize(14);
            Text.width('80%');
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({
                type: ToggleType.Switch,
                isOn: this.clock.enable
            });
            Toggle.onChange(async (on) => {
                this.clock.enable = on;
                if (on) {
                    let info: reminderAgentManager.ReminderRequestAlarm = {
                        reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
                        hour: this.clock.hour,
                        minute: this.clock.minute,
                        title: this.clock.title,
                        content: this.clock.content,
                        daysOfWeek: this.clock.dayOfWeeks,
                        ringDuration: 10,
                        wantAgent: {
                            abilityName: "EntryAbility",
                            pkgName: "com.example.myapplication"
                        },
                    };
                    this.clock.reminderId = await reminderAgentManager.publishReminder(info);
                }
                else {
                    reminderAgentManager.cancelReminder(this.clock.reminderId);
                }
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new AlarmClock(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-12/learn/AlarmClock", pageFullPath: "entry/src/main/ets/pages/2024-11-12/learn/AlarmClock", integratedHsp: "false" });
