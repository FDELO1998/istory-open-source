var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    background: "",
    begin: "",
    avatarUrl: "",
    bottom: "",
    signtext: '#',
    article: '',
    author: '',
    id: '',
    focus: false,
    marks: '',
    mark: '',
    shareTempFilePath: "",
    canvashidden: true,
    wxappname: "页面生成图片",
    screenWidth: '', //设备屏幕宽度
    showmark: true,
    shareImgSrc: "",
    textheight: 0,
    textheight2: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
    onLoad: function (options) {
      
      var that = this;
      that.setData({
        background: options.background,
        begin: options.begin,
        bottom: options.bottom,
        signtext: options.signtext,
        title: options.title,
        author: options.author,
        id:options.id,
        article: options.article.split('&hc').join('\n'),
        avatarUrl: options.avatarUrl,
      })
  },

adelete:function(){
  var that = this;

  var id = parseInt(that.data.id);
 
  wx.showModal({
    title: '提示',
    content: '是否确认删除此篇文章',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        wx.request({
          url: 'https://mystoryinn.com/dsty',
          method: 'POST',
          head: { "content-type": "application/json" },
          data: {
            "id": id
          },
          success: function (res) {
            wx.showModal({
              title: '删除',
              content: '成功删除此文章',
            })
            console.log(res);
           
            
            wx.request({
              url: 'https://mystoryinn.com/msty',
              method: 'POST',
              header: { "content-type": "application/json" },
              data: {
                "author": app.author
              },
              success: function (res) {
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
               
                prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                  imageurl: res.data
                });
                wx.navigateBack({
                  delta: 1
                });
              }
            });
           
          }
        });
      }
    }
  });
 
  
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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

        ctx.fillText(str2[i], leftWidth, initHeight); //绘制截取部分
        initHeight += 20; //16为字体的高度
        lineWidth = 0;
        titleHeight += 38;
      } if (lineWidth > 350) {

        var str3 = str2[i];
        for (var j = 0; j < str3.length; j += 20) {
          ctx.fillText(str3.substring(j, j + 20), leftWidth, initHeight); //绘制截取部分
          initHeight += 20; //16为字体的高度
          lineWidth = 0;
          titleHeight += 38;
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
    wx.showModal({
      title: '提示',
      content: '绘制图片需要2~3秒，请耐心等待',
      showCancel: true
    });
    var that = this;
    that.setData({
      canvashidden: false
    })

    var obj = wx.createSelectorQuery();
    obj.select('.ctext').boundingClientRect(function (rect) {

      that.setData({
        textheight: rect.height * 1 + 150,
        textheight2: rect.height * 2 + 300 + "rpx"//因为加了单位，数字为上面那个的两倍
      })

      console.log("文本的宽高是" + rect.height)
    }).exec();
    setTimeout(this.save, 800);
  },
  setbackground: function (ctx) {
    var that = this;

    var bgImgPath = that.data.background;
    if (bgImgPath) {
      wx.getImageInfo({
        src: bgImgPath,//服务器返回的图片地址
        success: function (res) {
          //res.path是网络图片的本地地址
          var textheight = that.data.textheight;
          let Path = res.path;
          ctx.drawImage(Path, 0, 0, 375, textheight);
          that.setbegin(ctx);

        },
        fail: function (res) {
          console.log(res);
        }

      })
    } else {
      that.setbegin(ctx);
    }
  },
  setbegin: function (ctx) {
    var that = this;

    var bgImgPath2 = that.data.begin;
    if (bgImgPath2) {
      wx.getImageInfo({
        src: bgImgPath2,
        success: function (res) {

          let Path2 = res.path;
          ctx.drawImage(Path2, 0, 0, 375, 450);
          that.setbottom(ctx);
        }
      })
    } else {
      that.setbottom(ctx);
    }
  },
  setbottom: function (ctx) {
    var that = this;
    var textheight = that.data.textheight;

    var bgImgPath3 = that.data.bottom;
    if (bgImgPath3) {
      wx.getImageInfo({
        src: bgImgPath3,
        success: function (res) {
          var textheight = that.data.textheight;
          var bottom = textheight - 300;
          let Path3 = res.path;
          ctx.drawImage(Path3, 0, bottom, 375, 300);
          that.settitle(ctx);
          ctx.stroke();
          ctx.draw(false, function () {
            // 3. canvas画布转成图片
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: 375,
              height: textheight,
              destWidth: 375 * 1250 / wx.getSystemInfoSync().windowWidth,
              destHeight: textheight * 1250 / wx.getSystemInfoSync().windowWidth,
              canvasId: 'mycanvas',
              success: function (res) {

                console.log(res);
                that.setData({
                  shareImgSrc: res.tempFilePath,
                  canvashidden: true

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
          }, 800);

        }

      })
    } else {
      that.settitle(ctx);
      ctx.stroke();
      ctx.draw(false, function () {
        // 3. canvas画布转成图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375,
          height: textheight,
          destWidth: 375 * 1750 / wx.getSystemInfoSync().windowWidth,
          destHeight: textheight * 1750 / wx.getSystemInfoSync().windowWidth,
          canvasId: 'mycanvas',
          success: function (res) {

            console.log(res);
            that.setData({
              shareImgSrc: res.tempFilePath,
              canvashidden: true

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
      }, 800);

    }
  },
  settitle: function (ctx) {
    var that = this;

    var textheight = that.data.textheight;

    ctx.setFontSize(25);
    ctx.setFillStyle('#222222');
    ctx.fillText(that.data.title, 25, 50);

    ctx.setFontSize(15);
    ctx.setFillStyle('#444444');
    that.drawText(ctx, that.data.article, 35, 130, 300, textheight);

  },


  save: function () {

    var that = this;
    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('mycanvas');
    that.setbackground(ctx);

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