@Entry
@Component
struct Index1_2024_11_13 {
  @State message: string = 'Hello World';

  async example() {
    console.log('Before await');
    const result = this.as().then((resolve) => {
      console.log(JSON.stringify(resolve))
    });
    console.log('After await:', result);
  }

  async as() {
    setTimeout(() => {
      console.log('Data from Promise');
    }, 2000); // 模拟一个2秒后解决的Promise
  }

  aboutToAppear(): void {
    this.example();
    console.log('This runs immediately after calling example()');
  }

  build() {
    RelativeContainer() {
      Text(this.message)
        .id('Index1_2024_11_13HelloWorld')
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .alignRules({
          center: { anchor: '__container__', align: VerticalAlign.Center },
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
    }
    .height('100%')
    .width('100%')
  }
}