
var app = getApp();
Page({
  hasUserInfo:false,
  userInfo:'',
  canIUse:true,
  code:'',
  data:{
   canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad:function(options){
    let _this = this;
    wx.login({
      success(res){
        console.log(res)
        _this.setData({
          code: res.code
        })
       // console.log(_this.data.code);
wx.request({
  url: 'https://mystoryinn.com/js',
  method: "POST",
  data:{
    "js_code": _this.data.code
  },
  success: function (res) {
    console.log("验证成功");
    app.author = res.data.openid;
    
  }
})}})
    _this.on();
    
  },
  on: function () {
    console.log(app.author);
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        app.userInfo = res.userInfo;
        app.name = res.userInfo.nickName;
        app.avatarUrl = res.userInfo.avatarUrl;
        if (res.userInfo) {
          wx.request({
            url: 'https://mystoryinn.com/msty',//mine
            method: 'POST',
            header: { "content-type": "application/json" },
            data: {
              "author": app.author
            }
          })
          wx.request({
            url: 'https://mystoryinn.com/mine',
            method: 'POST',
            header: { "content-type": "application/json" },
            data: {
              "author": app.author,
              "name": app.name
            }
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {
          wx.showModal({
            title: '警告',
            content: '您拒绝了授权，将无法进入，请检查网络连接',
          })
        }
      }
    })

  },
})
  //跳转设置页面授权
 
//   bingGetUserInfo:function(e){
//     //console.log(e);
//     let _this = this;
//     if(e.detail.userInfo){
//      // console.log(e.detail.userInfo);
//       app.userInfo = e.detail.userInfo;
//        app.name = e.detail.userInfo.nickName;
//       app.avatarUrl = e.detail.userInfo.avatarUrl;
//       wx.request({
//         url: 'https://mystoryinn.com/msty',//mine
//         method: 'POST',
//         header: { "content-type": "application/json" },
//         data: {
//           "author": app.author
//         }
//       })
//       wx.request({
//         url: 'https://mystoryinn.com/mine',
//         method: 'POST',
//         header: { "content-type": "application/json" },
//         data: {
//           "author": app.author,
//           "name":app.name
//         }
//       })
//       wx.switchTab({
//         url: '/pages/index/index',
//       })
      
//     }else{
//       wx.showModal({
//         title: '警告',
//         content: '您拒绝了授权，将无法进入，请检查网络连接',
//       })
//     }
//   },
  
// })
// wx.request({
//   url: 'https://www.mystoryinn.com/js/jscode2session?appid=wxe5d2d1f4f44581c2&secret=70b0f1849ac85f033d5233ddc043a2fe&js_code=' + res.code + '&grant_type=authorization_code',
//   method: "POST",
//   success: function (res) {
//     console.log(res.data);
//     app.author = res.data.openid;

//   }
// })
// wx.request({
//   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe5d2d1f4f44581c2&secret=70b0f1849ac85f033d5233ddc043a2fe&js_code=' + res.code + '&grant_type=authorization_code',
//   method: "POST",
//   success: function (res) {
//     console.log(res.data);
//     app.author = res.data.openid;

//   }
// })