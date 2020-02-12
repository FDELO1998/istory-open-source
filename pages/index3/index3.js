// pages/index3/index3.js//msty
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:0,
   avatarUrl:'',
    focus: true,
    current: '',
    currentTab: 0,
    showView: true,
    list: ["https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF2/m2.jpg", "https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF3/m3.png"],
    
    imageurl2: [
      {
        id: 1, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF8/m8down.png'
      },
      {
        id: 2, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF6/m6down.png'
      }, {
        id: 3, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF7/m7down.png'
      }
    ],
    imageurl3: [
      {
        id: 1, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF9/m9down.png'
      },
      {
        id: 2, src: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10.jpg', background: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10bg.png', begin: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10up.png', bottom: 'https://mystoryinn.com/image/%E6%A8%A1%E6%9D%BF10/m10down.png'
      }
    ],
    src: "",
    background: "https://mystoryinn.com/image/index.png",
    begin: "",
    bottom: "",
    signtext: "#无标签",
    title: "",
    article: "",
    focu:'',
    fans:'',
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
  autho:function(){
    if (!app.userInfo) {
    this.on();
    }
  },
  hadput:function(e){
      var content = e.currentTarget.dataset.cont;
      wx.navigateTo({
        url: '/pages/hadput/hadput?signtext=' + content[0] + '&author=' + content[1] + '&title=' + content[2] + '&article=' + content[3] + '&background=' + content[4] + '&begin=' + content[5] + '&bottom=' + content[6] + '&avatarUrl=' + content[7]+'&id='+content[9],
      })
 
  },
  hadsc: function (e) {
    var content = e.currentTarget.dataset.cont;
    wx.navigateTo({
      url: '/pages/hadsc/hadsc?signtext=' + content[0] + '&author=' + content[1] + '&title=' + content[2] + '&article=' + content[3] + '&background=' + content[4] + '&begin=' + content[5] + '&bottom=' + content[6] + '&avatarUrl=' + content[7] + '&id=' + content[9],
    })

  },
  next: function (e) {
    console.log(this.data.abc);
    wx.navigateTo({
      url: '/pages/index4/index4?abc='+this.data.abc,
    })
  }
  ,
  nowork:function(){
    wx.showModal({
      title: '送花',
      content: '打赏功能暂未开启，敬请期待！'
    })
  },
  jump:function(){
    wx.navigateTo({
      url: '/pages/putswitch/putswitch',
    })
  },
  jump2: function () {
    wx.navigateTo({
      url: '/pages/fans/fans',
    })
  },
  swichNav: function (e) {
    console.log(e);
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
  getname: function (e) {
    var that = this;
    that.setData({
      author: app.author,
      avatarUrl: app.avatarUrl
    })
  },
  getarray: function (data) {
    var that = this;
    that.setData({
      imageurl: data
    });
    console.log(data);
  },
gotoindex2:function(e){
  var content = e.currentTarget.dataset.cont;
 var that = this;
  wx.switchTab({
    url: '/pages/index2/index2'
  })

app.author=content[0];
app.title=content[1];
app.signtext=content[2];
app.article=content[3];
app.background=content[4];
app.begin=content[5];
app.bottom=content[6];
app.id = content[7];
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
  
    console.log(app.name);
   if(app.name!=undefined){
     that.setData({
       nickName: app.name,
       avatarUrl: app.avatarUrl
     })
   wx.request({
     url: 'https://mystoryinn.com/msty',
     method:'POST',
     header: { "content-type": "application/json" },
     data:{
       "author":app.author
     },
     success:function(res){
      that.getarray(res.data);
     }
   })
    wx.request({
      url: 'https://mystoryinn.com/ogz',
      method: 'POST',
      head: { "content-type": "application/json" },
      data: {
        "author": app.author
      },
      success: function (res) {
        that.setData({
          focu: res.data.length
        })

      }
    })
    wx.request({
      url: 'https://mystoryinn.com/ofs',
      method: 'POST',
      head: { "content-type": "application/json" },
      data: {
        "author": app.author
      },
      success: function (res) {
        that.setData({
          fans: res.data.length
        })
      }
    })
    wx.request({
      url: 'https://mystoryinn.com/mstyg',
      method:'POST',
      head: { "content-type": "application/json"},
      data:{
        "author":app.author
      },
      success:function(res){
     
        that.setData({
          imageurl3:res.data
        })
      }
    });
    wx.request({
      url: 'https://mystoryinn.com/mcsty',
      method: 'POST',
      head: { "content-type": "application/json" },
      data: {
        "author": app.author
      },
      success: function (res) {

        that.setData({
          imageurl2: res.data
        })
      }
    });
   }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  var that =this;
  that.onLoad();
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
    wx.stopPullDownRefresh();
    var that =this;
    that.onLoad();
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