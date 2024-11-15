let localObj:Record<string,string>={
  "msg":'i am local'
}
export const local=new LocalStorage(localObj)