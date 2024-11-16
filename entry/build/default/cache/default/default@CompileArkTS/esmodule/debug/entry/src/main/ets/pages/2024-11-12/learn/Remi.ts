if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Remi_Params {
    reminderId?: number;
}
import notificationManager from "@ohos:notificationManager";
import type Base from "@ohos:base";
import reminderAgentManager from "@ohos:reminderAgentManager";
import promptAction from "@ohos:promptAction";
class Remi extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__reminderId = new ObservedPropertySimplePU(-1, this, "reminderId");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Remi_Params) {
        if (params.reminderId !== undefined) {
            this.reminderId = params.reminderId;
        }
    }
    updateStateVars(params: Remi_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__reminderId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__reminderId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __reminderId: ObservedPropertySimplePU<number>;
    get reminderId() {
        return this.__reminderId.get();
    }
    set reminderId(newValue: number) {
        this.__reminderId.set(newValue);
    }
    async onPageShow() {
        let enable = await notificationManager.isNotificationEnabled();
        if (!enable) {
            notificationManager.requestEnableNotification().then(() => {
                AlertDialog.show({
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发布闹钟');
            Button.onClick(async () => {
                let request: reminderAgentManager.ReminderRequestAlarm = {
                    reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
                    hour: 20,
                    minute: 0,
                    daysOfWeek: [],
                    wantAgent: {
                        abilityName: "EntryAbility",
                        pkgName: "com.example.myapplication"
                    },
                    title: "我的闹钟",
                    content: "该下课了"
                };
                try {
                    this.reminderId = await reminderAgentManager.publishReminder(request);
                    promptAction.showToast({
                        message: "发布成功"
                    });
                }
                catch (e) {
                    promptAction.showToast({
                        message: JSON.stringify(e)
                    });
                }
            });
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Remi";
    }
}
registerNamedRoute(() => new Remi(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-12/learn/Remi", pageFullPath: "entry/src/main/ets/pages/2024-11-12/learn/Remi", integratedHsp: "false" });
