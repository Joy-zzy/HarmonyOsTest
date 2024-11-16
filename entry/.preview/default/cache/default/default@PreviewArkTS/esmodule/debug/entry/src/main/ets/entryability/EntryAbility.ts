import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import { advertStore } from "@normalized:N&&&entry/src/main/ets/utils/2024-11-11/advertStore&";
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    async onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability
        // hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        // let store: TestStore = new TestStore(this.context);
        // if ((await store.getData('started')) != 'true') {
        //   windowStage.loadContent('pages/2024-11-11/Index3_24_11_11', (err) => {
        //     if (err.code) {
        //       hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        //       return;
        //     }
        //     hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
        //   });
        // } else {
        //   let store: advertStore = new advertStore(this.context)
        //   store.putAdvert(JSON.stringify(new AdvertClass()))
        //   windowStage.loadContent('pages/2024-11-11/Index4_24_11_11', (err) => {
        //     if (err.code) {
        //       hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        //       return;
        //     }
        //     hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
        //   });
        // }
        windowStage.loadContent('pages/2024-11-13/learn/H1_2024_11_13', (err) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
        });
    }
    async onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
        let store: advertStore = new advertStore(this.context);
        let advertS = await store.getStore();
        await advertS.delete('myAdvert');
    }
    onForeground(): void {
        // Ability has brought to foreground
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
