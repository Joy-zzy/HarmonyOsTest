@Observed
export class Order {
    title: string = '';
    ava: ResourceStr = '';
    time: string = '';
    id: string = '';
    reminderId?: number = 0;
    ordered?: boolean = false;
}
export const orders: Order[] = [{
        id: Date.now() + "",
        ava: '/images/1-1.png',
        time: '11:26',
        title: "所有女生"
    }, {
        id: Date.now() + "",
        ava: '/images/2.png',
        time: '12:01',
        title: "斓儿er"
    }, {
        id: Date.now() + "",
        ava: '/images/3.png',
        time: '12:02',
        title: "南风Cheney"
    }, {
        id: Date.now() + "",
        ava: '/images/4.png',
        time: '12:03',
        title: "美潮美甲教学"
    }];
