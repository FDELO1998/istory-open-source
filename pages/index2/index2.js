  // pages/index2/index2.js
var util = require('../../utils/util.js');



// var app = getApp()
//var WxParse = require('../wxParse/wxParse.js');
// var url = app.globalData.Url;
// var imgurl= app.globalData.imgUrl ;
var app = getApp()

Page({
  hasUserInfo: false,
  canIUse: true,
  code: '',
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selectArray: [
      {
        "id": "0",
        "text": "#无"
      },
      {
        "id": "1",
        "text": "#梦想"
      }, {
      "id": "2",
      "text": "#爱情"
      }, {
        "id": "3",
        "text": "#书感"
      }, {
        "id": "4",
        "text": "#惊悚"
      }, {
        "id": "5",
        "text": "#热血"
      }
    ],
    focus:true,
    current:'',
    currentTab:0,
    showView: true,
     imageurl:[
       {
         id: 1, src: 'https://mystoryinn.com/image/elements/1.jpg', background: 'https://mystoryinn.com/image/elements/1.png', begin: '', bottom: ''
       },
       {
         id: 2, src: 'https://mystoryinn.com/image/elements/2.jpg', background: 'https://mystoryinn.com/image/elements/2.png', begin: '', bottom: ''
       },
       {
         id: 3, src: 'https://mystoryinn.com/image/elements/3.jpg', background: 'https://mystoryinn.com/image/elements/3.png', begin: '', bottom: ''
       },
       {
         id: 4, src: 'https://mystoryinn.com/image/elements/4.jpg', background: 'https://mystoryinn.com/image/elements/4.png', begin: '', bottom: ''
       },
       {
         id: 5, src: 'https://mystoryinn.com/image/elements/5.jpg', background: 'https://mystoryinn.com/image/elements/5.png', begin: '', bottom: ''
       },
       {
         id: 6, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF5/m5.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF5/m5bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF5/m5up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF5/m5down.png'
       },

       ],
    imageurl2: [
      {
        id: 1, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF2/m2.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF2/m2bg.png', begin: '', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF2/m2up.png'
      },

      {
        id: 2, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF3/m3.png', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF3/m3bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF3/m3up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF3/m3down.png'
      },
      {
        id: 3, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF4/m4.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF4/m4bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF4/m4up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF4/m4down.png'
      },
     
      {
        id: 4, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6down.png'
      }, {
        id: 5, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7down.png'
      },
      {
        id: 6, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8down.png'
      },
       
    ],
    imageurl3: [
      {
        id: 1, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9down.png'
      },
      {
        id: 2, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10down.png'
      }
    ],
    src:"https://mystoryinn.com/image/elements/1.jpg",
    background:"https://mystoryinn.com/image/elements/1.png",
    begin:"",
    bottom:"",
    signtext:"#无标签",
    idi:"",
    title:"",
    article:"",
    time: "",
    author:"",
    name:""
  },
  next: function (e) {
   var that =this;
    var TIME = util.formatTime(new Date());
    that.setData({
      time: TIME,
    });
    console.log(TIME);
    app.background = that.data.background;
    app.begin = that.data.begin;
    app.bottom = that.data.bottom;
    app.signtext = that.data.signtext;
    app.src=that.data.src;
    app.time = that.data.time;
    if(that.data.article==""){
      app.article = "故事栈，成为自己的短篇小说家 "+'\n' +'\n'+"快去写一篇自己的故事或美文吧!";
    }else{
      app.article = that.data.article.split('\n').join('&hc');
    }
    app.title = that.data.title.split('\n').join('&hc');
    
    wx.switchTab({
      url: '/pages/index4/index4'
    })
  } 
,

  changepicture: function (e) {
    var a = e.target.dataset.index;
    var b = this.data.imageurl[a].background;
    var that = this;
    that.setData({
      background: b,
      begin: this.data.imageurl[a].begin,
      bottom: this.data.imageurl[a].bottom,
      src:this.data.imageurl[a].src,
    })
  },
  changepicture2: function (e) {
    var a = e.target.dataset.index;
    var b = this.data.imageurl2[a].background;
    var that = this;
    that.setData({
      background: b,
      begin: this.data.imageurl2[a].begin,
      bottom: this.data.imageurl2[a].bottom,
      src: this.data.imageurl2[a].src,
    })
  },
  changepicture3: function (e) {
    var a = e.target.dataset.index;
    var b = this.data.imageurl3[a].background;
    var that = this;
    that.setData({
      background: b,
      begin: this.data.imageurl3[a].begin,
      bottom: this.data.imageurl3[a].bottom,
      src: this.data.imageurl3[a].src,
    })
  },
  getSign: function (e) {
    var signtext = e.detail;
    this.setData({
      signtext:signtext.text
    })
  },
  user:function(e){
    this.setData({
      user:e.detail.value
    })
    
  },
  bindtitle: function (e) {
    this.setData({
      title: e.detail.value,
    })
  },
  bindarticle: function (e) {
    var str = e.detail.value;
    this.setData({
      article:str
    })
  },
  swichNav: function (e) {
    //console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
   
    this.setData({
      currentTab: e.detail.current,
    })
  },
  touchstart: function (e) {
    start_clientX = e.changedTouches[0].clientX
  },
  hidden:function(e){
    console.log("删除");
    this.setData({
      display:'none'
    })
  },
 caogao:function(){
   var that = this;
    wx.showModal({
      title: '草稿箱',
      content: '是否将文章保存至草稿箱',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://mystoryinn.com/ccg',
            method:'POST',
            head: { "content-type": "application/json" },
            data:{
              "author":app.author,
              "title":that.data.title,
              "sign":that.data.signtext,
              "article":that.data.article,
              "background":that.data.background,
              "begin":that.data.begin,
              "bottom":that.data.bottom,
              "id":that.data.idi,
              "name":app.name
            },
            success:function(res){
              console.log(res.data);
            }
          })
        }}
    })
 },

 
  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {
 
 var that = this;
  showView: (options.showView == "true" ? true : false);
  
  },
 
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
            url: '/pages/index2/index2',
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var that = this;
    if(app.id){
    that.setData({
    background: app.background,
        begin: app.begin,
        bottom: app.bottom,
        signtext: app.signtext,
        title: app.title,
        author: app.author,
         article: app.article,
        idi: parseInt(app.id),
       });
    }
    if (app.name == undefined) {
      wx.showModal({
        title: '提示',
        content: '要使用此功能请先授权登录',
        cancelText: "稍后再说",
        cancelColor: "#444444",
        confirmText: "确定",
        confirmColor: "#00D8A0",
        showCancel: true,
        success: function (res) {
          if (res.cancel) {
            wx.switchTab({
              url: '/pages/index/index'
            })

          } else {
           that.on();
            
          }
        },
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

