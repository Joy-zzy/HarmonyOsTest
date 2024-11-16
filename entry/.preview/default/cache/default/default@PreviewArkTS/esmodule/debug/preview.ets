struct preview{build(){Column() {
      Row() {
        Search({
          value: this.search
        })
          .searchButton('搜索')
          .onSubmit(async (value) => {
            this.search = value
            this.searchList = [];
            for (let i = 0; i < this.busList.length; i++) {
              let bus = this.busList[i];
              let res = await this.store.getMsg(bus.id);
              for (let i = 0; i < res.length; i++) {
                let chat = res[i];
                if (chat.msg.includes(this.search)) {
                  this.searchList.push({
                    id: Date.now() + "",
                    title: bus.title,
                    ava: bus.ava,
                    replayTime: chat.time,
                    chats: [],
                    replyMsg: chat.msg,
                    count: 0
                  })
                }
              }
            }
          })
      }.padding({left: 10, right: 10})
      List() {
        ForEach(this.search == '' ? this.busList : this.searchList, (business: Business) => {
          ListItem() {
            Badge({
              count: business.count,
              style: {fontSize: 12, badgeSize: 18},
              position: {
                x: 52,
                y: 6
              }
            }) {
              Row() {
                Image(business.ava).height('90%').margin({right: 15})
                Column() {
                  Row() {
                    Text(business.title).fontSize(18).width('70%').maxLines(1).textOverflow({overflow: TextOverflow.Ellipsis})
                    Blank();
                    Text(business.replayTime).fontSize(14).fontColor('#aaaaaa')
                  }.width('100%')
                  Text(business.replyMsg).fontColor('#aaaaaa').fontSize(16)
                    .width('100%').maxLines(1).textOverflow({overflow: TextOverflow.Ellipsis})
                }.layoutWeight(1).height('100%').justifyContent(FlexAlign.SpaceAround).alignItems(HorizontalAlign.Start)
              }.width('100%').height(80).padding({left: 10, right: 20, top: 10, bottom: 10}).border({width: {bottom: 1}, color: {bottom: '#aaaaaa'}})
            }
          }.onClick(() => {
            AppStorage.setOrCreate('bus', business);
            router.pushUrl({
              url: 'pages/2024-11-13/learn/H1_Chat',
              params: business
            })
          })
        })
      }.layoutWeight(1)
    }}}