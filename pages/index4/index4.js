// pages/index4/index4.js

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
   title:" ",
    background:" ",
    begin:"",
    bottom:"",
    sign: "空",
    author: "范格",
    article:'暂无文章',
    shareTempFilePath:" ",
    avatarUrl: '',
    canvashidden:true,
    wxappname:"页面生成图片",
    shareImgSrc:" ",
    screenWidth: ' ' , //设备屏幕宽度
    name:''
  },
 
  onLoad: function (option) {
  
   
    this.setData({
      title: app.title.split('&hc').join('\n'),
      article: app.article.split('&hc').join('\n'),
      background: app.background,
      sign: app.signtext,
      signtext: app.signtext,
      begin: app.begin,
      bottom: app.bottom,
      author: app.author,
      avatarUrl:app.avatarUrl,
      src:app.src,
      time:app.time,
      name:app.name
    })
    console.log(app.signtext);
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenWidth: res.screenWidth
        })
        
      }
    })
    },
put:function(){
  var that= this;
 
  wx.request({
    url: 'https://mystoryinn.com/ssty',
    method: 'POST',
    header: { "content-type": "application/json" },
     data: {
      "sign": that.data.sign,
       "title": that.data.title,
       "article": that.data.article,
       "background": that.data.background,
       "bottom": that.data.bottom,
       "begin": that.data.begin,
       "author": that.data.author,
       "touxiang": that.data.avatarUrl,
       "moban":that.data.src,
       "time": that.data.time,
       "name":that.data.name
      },
   
    success: function (res) {
      wx.showModal({
        title: '文章发布成功',
        content: '快把你的文章分享到朋友圈吧',
        showCancel: false,
        confirmText: '好哒',
        confirmColor: '#72B9C3',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];

          //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
         
            src: "https://mystoryinn.com/image/elements/1.jpg",
            background: "https://mystoryinn.com/image/elements/1.png",
            begin: "",
            bottom: "",
            signtext: "#无标签",
            title: "",
            article: "",
          })
          wx.navigateBack({
            delta: 1
          });
          that.setData({
            canvasHidden: true
          })
          
     
        }
      })
    },
    fail:function(res){
      console.log(res);
  }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */

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
/*
var that = this;
var context = wx.createCanvasContext('mycanvas');
context.setStrokeStyle("#fff")
context.setLineWidth(1)
context.stroke()
context.draw(false, this.getTempFilePath)


  },
getTempFilePath: function () {
  wx.canvasToTempFilePath({
    canvasId: 'mycanvas',
    success: (res) => {
      this.setData({
        shareTempFilePath: res.tempFilePath
      })
    }
  })
},
drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
  var lineWidth = 0;
  var lastSubStrIndex = 0; //每次开始截取的字符串的索引
  var str2 = str.split('\n');

  for (let i = 0; i < str2.length; i++) {
    //   if(i==0){
    //     var str3 = str2[0];
    //     if(str3.length>14){

    //     }
    //     ctx.fillText(str2[0], 30, 90);
    //   }else{
    //     ctx.fillText(str2[i], 30, (i + 1) * 20);
    //   }

    //   }

    lineWidth += ctx.measureText(str2[i]).width;

    if (lineWidth <= 350) {
      console.log(lineWidth, canvasWidth)
      ctx.fillText(str2[i], leftWidth, initHeight); //绘制截取部分
      initHeight += 16; //16为字体的高度
      lineWidth = 0;
      titleHeight += 30;
    } if (lineWidth > 350) {
      console.log(lineWidth, canvasWidth)
      var str3 = str2[i];
      for (var j = 0; j < str3.length; j += 18) {
        ctx.fillText(str3.substring(j, j + 18), leftWidth, initHeight); //绘制截取部分
        initHeight += 20; //16为字体的高度
        lineWidth = 0;
        titleHeight += 30;
      }
    }
    // if (i == str2.length - 1) { //绘制剩余部分
    //   ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
    // }
  }
  // 标题border-bottom 线距顶部距离
  titleHeight = titleHeight + 10;
  return titleHeight
},
//保存至相册
saveImageToPhotosAlbum: function () {
  var that = this;
  that.setData({
    canvashidden: false
  })
  var unit = that.data.screenWidth / 375
  //2. canvas绘制文字和图片
  const ctx = wx.createCanvasContext('mycanvas');
  var bgImgPath = that.data.background;


  //这里很重要，主要就是布局
  ctx.drawImage(bgImgPath, 0, 0, 375 * unit, 580 * unit);
  ctx.drawImage(that.data.begin, 300, 24, 50, 40);
  ctx.drawImage(that.data.bottom, 10, 500, 80, 50);
  ctx.setFontSize(15)
  ctx.setFillStyle('#444444')

  ctx.fillText(that.data.title, 20, 50)

  this.drawText(ctx, this.data.article, 20, 70, 300, 400);

  //ctx.fillText('前世烦恼：' + that.data.fan, 50, 330);
  //ctx.fillText('人物性格：' + that.data.xg, 50, 360);
  ctx.stroke()
  ctx.draw(false, function () {
    // 3. canvas画布转成图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 375,
      height: 580,
      destWidth: 375,
      destHeight: 580,
      canvasId: 'mycanvas',
      success: function (res) {
        console.log(res);
        that.setData({
          shareImgSrc: res.tempFilePath
        })
        if (!res.tempFilePath) {
          wx.showModal({
            title: '提示',
            content: '图片绘制中，请稍后重试',
            showCancel: false
          })

        }
        wx.saveImageToPhotosAlbum({
          filePath: that.data.shareImgSrc,
          success(res) {
            console.log(res);
            wx.showModal({
              title: '图片保存成功',
              content: '图片成功保存到相册了，去发圈噻~',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                }
                that.setData({
                  canvasHidden: true
                })
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  });
  */