if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface H2_2024_11_13_Params {
    orderList?: Order[];
}
import { orders } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/learn/H2_OrderStore&";
import type { Order } from "@normalized:N&&&entry/src/main/ets/pages/2024-11-13/learn/H2_OrderStore&";
import notificationManager from "@ohos:notificationManager";
import promptAction from "@ohos:promptAction";
import type Base from "@ohos:base";
import reminderAgentManager from "@ohos:reminderAgentManager";
class H2_2024_11_13 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__orderList = new ObservedPropertyObjectPU(orders, this, "orderList");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: H2_2024_11_13_Params) {
        if (params.orderList !== undefined) {
            this.orderList = params.orderList;
        }
    }
    updateStateVars(params: H2_2024_11_13_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__orderList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__orderList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __orderList: ObservedPropertyObjectPU<Order[]>;
    get orderList() {
        return this.__orderList.get();
    }
    set orderList(newValue: Order[]) {
        this.__orderList.set(newValue);
    }
    async aboutToAppear() {
        let isNotificationEnabled = notificationManager.isNotificationEnabledSync();
        if (!isNotificationEnabled) {
            //弹框授权允许通知；
            notificationManager.requestEnableNotification().then(() => {
                promptAction.showToast({
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                justifyContent: FlexAlign.SpaceBetween,
                wrap: FlexWrap.Wrap
            });
            Flex.padding({ left: 10, right: 10 });
            Flex.height('100%');
            Flex.backgroundColor('#efefef');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const order = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 5 });
                    Column.width('48%');
                    Column.margin({ bottom: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(order.ava);
                    Image.width('100%');
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(order.title);
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Bold);
                    Text.width('100%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(order.time + "开播");
                    Text.fontSize(12);
                    Text.fontColor('blue');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.onClick(async () => {
                        if (!order.ordered) {
                            let request: reminderAgentManager.ReminderRequestAlarm = {
                                reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
                                hour: Number(order.time.split(':')[0]),
                                minute: Number(order.time.split(':')[1]),
                                wantAgent: {
                                    pkgName: 'com.example.myapplication',
                                    abilityName: "EntryAbility"
                                },
                                title: '抖阳',
                                content: order.title + "开播了"
                            };
                            try {
                                order.reminderId = await reminderAgentManager.publishReminder(request);
                                promptAction.showToast({
                                    message: '预约成功'
                                });
                            }
                            catch (e) {
                                AlertDialog.show({
                                    message: JSON.stringify(e)
                                });
                            }
                        }
                        else {
                            try {
                                await reminderAgentManager.cancelReminder(order.reminderId!);
                                promptAction.showToast({
                                    message: '取消预约成功'
                                });
                            }
                            catch (e) {
                                AlertDialog.show({
                                    message: JSON.stringify(e)
                                });
                            }
                        }
                        order.ordered = !order.ordered;
                        this.orderList.splice(index, 1, order);
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(order.ordered ? '取消预约' : "预约");
                    Text.fontSize(13);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('blue');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create('/images/next.png');
                    Image.width(10);
                    Image.visibility(order.ordered ? Visibility.None : Visibility.Visible);
                }, Image);
                Row.pop();
                Row.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.orderList, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "H2_2024_11_13";
    }
}
registerNamedRoute(() => new H2_2024_11_13(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-13/learn/H2_2024_11_13", pageFullPath: "entry/src/main/ets/pages/2024-11-13/learn/H2_2024_11_13", integratedHsp: "false" });
