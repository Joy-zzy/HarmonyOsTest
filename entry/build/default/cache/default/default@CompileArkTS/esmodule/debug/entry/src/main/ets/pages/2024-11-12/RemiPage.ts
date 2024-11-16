if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RemiPage_Params {
    reminderId?: number;
}
import notificationManager from "@ohos:notificationManager";
import type Base from "@ohos:base";
import reminderAgentManager from "@ohos:reminderAgentManager";
class RemiPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__reminderId = new ObservedPropertySimplePU(-1, this, "reminderId");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RemiPage_Params) {
        if (params.reminderId !== undefined) {
            this.reminderId = params.reminderId;
        }
    }
    updateStateVars(params: RemiPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__reminderId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__reminderId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    async onPageShow() {
        let isNotificationEnabled = await notificationManager.isNotificationEnabledSync();
        if (!isNotificationEnabled) {
            //弹框授权允许通知；
            notificationManager.requestEnableNotification().then(() => {
                AlertDialog.show({
                    message: '允许了'
                });
            }).catch((e: Base.BusinessError) => {
                if (e.code == 1600004) {
                    AlertDialog.show({
                        message: '禁止了'
                    });
                }
            });
        }
    }
    private __reminderId: ObservedPropertySimplePU<number>;
    get reminderId() {
        return this.__reminderId.get();
    }
    set reminderId(newValue: number) {
        this.__reminderId.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("发布闹钟");
            Button.onClick(async () => {
                let reminderRequest: reminderAgentManager.ReminderRequestAlarm = {
                    reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
                    hour: 21,
                    minute: 0,
                    daysOfWeek: [],
                    wantAgent: {
                        abilityName: "EntryAbility",
                        pkgName: "com.example.myapplication"
                    },
                    title: "我的闹钟",
                    content: "发布提醒"
                };
                try {
                    let reminderId = await reminderAgentManager.publishReminder(reminderRequest);
                    this.reminderId = reminderId;
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
            Button.createWithLabel("关闭闹钟");
            Button.onClick(() => {
                reminderAgentManager.cancelReminder(this.reminderId);
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RemiPage";
    }
}
registerNamedRoute(() => new RemiPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-12/RemiPage", pageFullPath: "entry/src/main/ets/pages/2024-11-12/RemiPage", integratedHsp: "false" });
