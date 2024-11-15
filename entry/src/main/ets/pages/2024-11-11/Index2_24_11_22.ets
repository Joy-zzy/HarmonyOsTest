import { TestStore } from '../../utils/2024-11-11/TestStore';

@Entry
@Component
struct Index2_24_11_22 {

  @State store: TestStore = new TestStore(getContext(this));
  @State msg: string = 'index1';

  async aboutToAppear() {
    this.msg = await this.store.getData('data');
  }

  build() {
    Text("msg:" + this.msg);
  }
}