import { chatClass, chatStore } from '../../utils/2024-11-11/chatStore';
import util from '@ohos.util';
import { http } from '@kit.NetworkKit';
import { promptAction } from '@kit.ArkUI';

class ResponseClass{
  result:number=-1;
  content:string=""
}
@Entry
@Component
struct ChatPage {
  @State chatList: chatClass[] =[];
  @State sendWord:string=""
  store:chatStore=new chatStore(getContext(this))
  scroller:Scroller=new Scroller()
  async aboutToAppear() {
    this.chatList=await this.store.getChat();
    setTimeout(()=>{
      this.scroller.scrollEdge(Edge.Bottom);
    },50)

  }
  async sendMessageFn(){
    // //发送的消息
    let sendObj:chatClass={
      content:this.sendWord,
      avatar:"/image/2.jpg",
      id:util.generateRandomUUID(),
      selfFlag:true
    }
    this.chatList.push(sendObj);
    //存
    this.store.putChat(JSON.stringify(this.chatList));
    //让list保持在底部；
    this.scroller.scrollEdge(Edge.Bottom);
    //回复：http://api.qingyunke.com/api.php?key=free&appid=0&msg=你好
    const url="http://api.qingyunke.com/api.php?key=free&appid=0&msg="+this.sendWord;
    this.sendWord="";
    const myHttp=http.createHttp();
    let res=await myHttp.request(url)
    let result=res.result as string;
    let resData=JSON.parse(result) as ResponseClass
    //console.info(result)
    if(resData.result==0){
      let content=resData.content;//回复的内容
      let conObj:chatClass={
        content:content,
        avatar:$r("app.media.app_icon"),
        id:util.generateRandomUUID(),
        selfFlag:false
      }
      this.chatList.push(conObj);
      //存
      this.store.putChat(JSON.stringify(this.chatList));
    }
    //让list保持在底部；
    this.scroller.scrollEdge(Edge.Bottom);

  }
  //删除方法：
  delItem(id:string){
    //console.info("del",id,JSON.stringify(this.chatList))
    //你看的删除；
    let chatL=[...this.chatList]
    let index=chatL.findIndex((v:chatClass)=>v.id==id);
    chatL.splice(index,1);
    this.chatList=[...chatL];
    //删除存储中的；
    this.store.putChat(JSON.stringify(this.chatList));


  }
  build() {
    Column() {
      Text("老王")
        .height(50)
        .backgroundColor("#ccc")
        .textAlign(TextAlign.Center)
        .width("100%")

      List({
        scroller:this.scroller
      }){
        ForEach(this.chatList,(item:chatClass)=>{
          ListItem() {
            ChatItemCom({
              item:item,
              delFn:()=>{this.delItem(item.id)}
            })
          }
            .width("100%")
        })
      }
        .width("100%")
        .height('calc(100% - 100vp)')
        .onAppear(()=>{
          this.scroller.scrollEdge(Edge.Bottom);
        })
      Row(){
        TextInput({
          text:$$this.sendWord
        })
          .layoutWeight(1)
          .onSubmit(()=>{
            //this.sendMessageFn()
          })
        Button("发送")
          .onClick(()=>{
            this.sendMessageFn()
          })
      }
        .height(50)

    }
    .height('100%')
    .width('100%')
    .backgroundColor("#f0f0f0")
  }
}

@Component
struct ChatItemCom{
  @Prop item:chatClass;
  @State showPop:boolean=false;
  delFn:(id:string)=>void = ()=>"";
  @Builder popupBuilder(){
    Text('删除')
      .height(30)
      .textAlign(TextAlign.Center)
      .width(100)
      .onClick(()=>{
        //删除
        this.delFn(this.item.id)
        this.showPop=false;
      })
  }
  build() {
    Row(){

      Image(this.item.avatar)
        .width(50)
        .margin({
          left:10,
          right:10
        })
      Text(this.item.content)
        .backgroundColor(this.item.selfFlag ? "#00ff00" : "#fff")
        .padding(10)
        .borderRadius(5)
    }
      .height(40)
      .width("100%")
      .direction(this.item.selfFlag ? Direction.Rtl : Direction.Ltr)
      .gesture(
        LongPressGesture()
          .onAction(()=>{
            this.showPop=true;
          })
      )
      .bindPopup(this.showPop,{
        builder: this.popupBuilder, // 气泡的内容
        placement:Placement.Top, // 气泡的弹出位置
        popupColor:Color.Gray, // 气泡的背景色
      })
  }
}