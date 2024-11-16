if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Noti_Params {
    badgeNum?: number;
}
import wantAgent from "@ohos:app.ability.wantAgent";
import notificationManager from "@ohos:notificationManager";
import type Base from "@ohos:base";
class Noti extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__badgeNum = new ObservedPropertySimplePU(0, this, "badgeNum");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Noti_Params) {
        if (params.badgeNum !== undefined) {
            this.badgeNum = params.badgeNum;
        }
    }
    updateStateVars(params: Noti_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__badgeNum.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__badgeNum.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __badgeNum: ObservedPropertySimplePU<number>;
    get badgeNum() {
        return this.__badgeNum.get();
    }
    set badgeNum(newValue: number) {
        this.__badgeNum.set(newValue);
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
        this.badgeNum = await notificationManager.getActiveNotificationCount();
        notificationManager.setBadgeNumber(this.badgeNum);
    }
    setBadge() {
        notificationManager.setBadgeNumber(++this.badgeNum);
    }
    async createWantAgent() {
        let info: wantAgent.WantAgentInfo = {
            wants: [{
                    bundleName: 'com.example.myapplication',
                    abilityName: 'EntryAbility',
                    deviceId: '',
                    action: '',
                    entities: [],
                    uri: '',
                    parameters: {}, //表示WantParams描述。
                }],
            actionType: wantAgent.OperationType.START_ABILITY,
            requestCode: 0,
            wantAgentFlags: [wantAgent.WantAgentFlags.CONSTANT_FLAG]
        };
        return await wantAgent.getWantAgent(info);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送普通通知');
            Button.onClick(async () => {
                let normalNotification: notificationManager.NotificationRequest = {
                    id: Date.now(),
                    content: {
                        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                        normal: {
                            title: "发送普通通知",
                            text: "这是一个普通通知"
                        }
                    },
                    wantAgent: await this.createWantAgent()
                };
                await notificationManager.publish(normalNotification);
                this.setBadge();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送多行文本');
            Button.onClick(async () => {
                let mulNotification: notificationManager.NotificationRequest = {
                    id: Date.now(),
                    content: {
                        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_MULTILINE,
                        multiLine: {
                            title: '收缩时标题',
                            text: '多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容多行文本内容',
                            additionalText: "补充",
                            briefText: '总结',
                            lines: ['第一行内容', '第二行内容', '第三行内容', '第四行内容'],
                            longTitle: "展开时标题"
                        }
                    },
                    wantAgent: await this.createWantAgent()
                };
                await notificationManager.publish(mulNotification);
                this.setBadge();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送长文本内容');
            Button.onClick(async () => {
                let longNotification: notificationManager.NotificationRequest = {
                    id: Date.now(),
                    content: {
                        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
                        longText: {
                            title: "长文本标题",
                            text: "普通text",
                            longText: "展开时文本",
                            briefText: '总结',
                            expandedTitle: "展开时标题"
                        }
                    },
                    wantAgent: await this.createWantAgent()
                };
                await notificationManager.publish(longNotification);
                this.setBadge();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发布进度条形文本');
            Button.onClick(async () => {
                let support = await notificationManager.isSupportTemplate('downloadTemplate');
                if (support) {
                    let progressNotification: notificationManager.NotificationRequest = {
                        id: Date.now(),
                        // content可以为任意类型，但是不能不写，同时 title和text不能为 ""
                        content: {
                            notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                            normal: {
                                title: "title",
                                text: "text"
                            }
                        },
                        template: {
                            name: "downloadTemplate",
                            data: {
                                title: "通知标题",
                                fileName: "通知内容",
                                progressValue: 65
                            }
                        },
                        wantAgent: await this.createWantAgent()
                    };
                    await notificationManager.publish(progressNotification);
                    this.setBadge();
                }
                else {
                    AlertDialog.show({
                        message: "不支持该格式通知"
                    });
                }
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Noti";
    }
}
registerNamedRoute(() => new Noti(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/2024-11-12/learn/Noti", pageFullPath: "entry/src/main/ets/pages/2024-11-12/learn/Noti", integratedHsp: "false" });
