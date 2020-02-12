//index.js
//获取应用实例
var start_clientX;
var end_clientX;
var app = getApp();
var page = 0;
var getList = function(that){
  
  
  // that.setData({
  //   hidden: false
  // });
  wx.request({
    url: 'https://mystoryinn.com/osty',
    method: 'POST',
    success: function (res) {
      wx.showLoading({ title: '加载中' });
      wx.hideLoading();
      wx.getSystemInfo({
        
        success: function (res) {
          
          that.setData({
            scrollHeight: res.windowHeight * 2,
          });
          // 
        }
      });
      that.put(res.data);
    //  that.setData({
    //    hidden:true
    //  })
    }
  })
}
var getListup = function (that) {
  wx.request({
    url: 'https://mystoryinn.com/osty',
    method: 'POST',
    success: function (res) {
      wx.getSystemInfo({
        success: function (res) {
          wx.showLoading({ title: '加载中' });
          that.setData({
            scrollHeight: res.windowHeight * 2,
          });
          wx.hideLoading();
        }
      });
      that.putup(res.data);
      //  that.setData({
      //    hidden:true
      //  })
    }
  })
}
var getList2= function (that) {
  console.log(app.name);
  if (app.name != undefined){
  wx.request({
    url: 'https://mystoryinn.com/tgz',
    method:'POST',
    head: { "content-type": "application/json"},
    data:{
    "author":app.author,
    },
    success: function (res) {
      wx.getSystemInfo({
        success: function (res) {
          wx.showLoading({ title: '加载中' });
          that.setData({
            scrollHeight: res.windowHeight * 2,
          });
          wx.hideLoading();
        }
      });
      that.put2(res.data);
      //  that.setData({
      //    hidden:true
      //  })
    }
  })
  }
}
Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,

    currentTab:'0',
    scrollHeight:0,
    hidden: true,
    scrollTop:0,
    author:' ',
    sign:' ',
    title:" ",
    clientX:'',
    article:" ",
    src:" ",
    avatarUrl:" ",
    content:[],
    content2:[],
  }, 
  swichNav: function (e) {
    //console.log(e);
    var that = this;
  
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    var that =this;
    console.log(e.detail.current);
    that.setData({
      currentTab: e.detail.current,
    })
  },
  touchstart: function (e) {
    start_clientX = e.changedTouches[0].clientX
  },
  // 滑动结束
  touchend: function (e) {
    end_clientX = e.changedTouches[0].clientX;
    if (end_clientX - start_clientX > 120) {
      this.setData({
        display: "block",
        translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
      })
    } else if (start_clientX - end_clientX > 0) {
      this.setData({
        display: "none",
        translate: ''
      })
    }
  },
  showview: function () {
    this.setData({
      display: "block",
      translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
    })
  },
  // 遮拦
  hideview: function () {
    this.setData({
      display: "none",
      translate: '',
    })
  },
  next:function(){
    
    wx.switchTab({
      url: '/pages/sightsee/sightsee'
    })
  },
  put: function (data) {

    var that =this;
    var conte = data.length;//16
    let number = that.data.content.length;//0
    let con = that.data.content;
    for(var i=0;i<data.length;i++){
    
     con[number+i]=data[i];
     
    }
    that.setData({
      content: con,
      hidden: false
    });
    wx.hideLoading();
  },
  putup: function (data) {

    var that = this;
    var conte = data.length;//16
    //let number = that.data.content.length;//0
    let con = that.data.content;
    for (var i = 0; i < data.length; i++) {

      con[i] = data[i];

    }
    that.setData({
      content: con,
      hidden: false
    });
    wx.hideLoading();
  },
  put2: function (data) {

    var that = this;
    var conte = data.length;//16
    let number = that.data.content2.length;//0
    let con = that.data.content2;
    for (var i = 0; i < data.length; i++) {
      con[number + i] = data[i];
    }
    that.setData({
      content2: con,
      hidden: false
    });
    wx.hideLoading();
  },
  bindDownLoad:function(that){
    var that = this;
   getList(that);
  },
  bindDownLoad2: function (that) {
    var that = this;
      getList2(that);
  },
  /**
   * 页面的初始数据
   *  currentTab: 0,
   */

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.login({
      success(res) {
        console.log(res)
        _this.setData({
          code: res.code
        })
        // console.log(_this.data.code);
        wx.request({
          url: 'https://mystoryinn.com/js',
          method: "POST",
          data: {
            "js_code": _this.data.code
          },
          success: function (res) {
            console.log("验证成功");
            app.author = res.data.openid;

          }
        })
      }
    })
  

    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
      
        that.setData({
          scrollHeight: res.windowHeight*2,
        });
       // console.log(that.data.scrollHeight);
      }
    });
    // if(!app.userInfo){
    //   wx.redirectTo({
    //     url: '/pages/authorize/authorize',
    //   })
    // }
 
  },

  gotosightsee:function(e){
  
    var content = e.currentTarget.dataset.cont;
    console.log(content[9]);
    wx.request({
      url: 'https://mystoryinn.com/jll',
      method: 'post',
      data: {
        "id": content[9]
      },
      success(res){
        console.log("浏览+1");
      }
    })
    wx.navigateTo({
      url: '/pages/sightsee/sightsee?signtext=' + content[0] + '&author=' + content[1] + '&title=' + content[2] + '&article=' + content[3] + '&background=' + content[4]  + '&begin=' + content[5] + '&bottom=' + content[6] + '&avatarUrl=' + content[7]+'&id='+content[9]+'&name='+content[11],
    })
   

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
    var that = this;
    getList(that);
    getList2(that);
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
    
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
    var that = this;
    getListup(that);
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     wx.showLoading({ title: '加载中' });
    // var that = this;
    // getList(that);
    // page++;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
