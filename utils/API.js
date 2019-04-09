//以下是所有业务服务器API地址汇总
//体验开发时使用
var WxApiRoot = 'https://www.12101.top'
module.exports = {
  WxApiRoot,
  //登录
  login: WxApiRoot + '/?r=login/login',
  //查看个人信息  user_id
  seeuser: WxApiRoot + '/?r=index/getuserinfobyid',
  // 调查列表  user_id
  list: WxApiRoot + '/?r=index/getjlxxblist',
  // 新增问卷 user_id
  creat: WxApiRoot + '/?r=index/addjlxxb',
  // 提交问卷 
  submit: WxApiRoot + '/?r=index/doaddjlxxb',
  // 根据项目id获取相应的伤病种类 xiamgmu   id
  species: WxApiRoot + '/?r=index/xiamgmu', 
  // 信息记录查看 editjlxxb user_id  id
  detail: WxApiRoot + '/?r=index/editjlxxb', 
  //  
  
}