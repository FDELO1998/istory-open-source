var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.request({
      url: 'https://mystoryinn.com/ogz',
      method: 'POST',
      head: { "content-type": "application/json" },
      data: {
        "author": app.author
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          content:res.data
        })
       
      }
    })
  },
quguan:function(e){
  var that = this;
  var content = e.currentTarget.dataset.cont;

  wx.showModal({
    title: '取消关注',
    content: '您确认取消关注该作者吗',
    success: function (res) {
      if (res.confirm) {
        wx.request({
          url: 'https://mystoryinn.com/qgz',
          method: 'POST',
          head: { "content-type": "application/json" },
          data: {
            "author": app.author,
            "gz": content[1],
          },
          success:function(){
            that.onLoad();
          }
        })
      }
  }
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