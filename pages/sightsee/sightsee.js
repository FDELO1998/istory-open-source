
var app = getApp();
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    title:"" ,
    background:"",
    begin: "",
    avatarUrl:"",
    bottom: "",
    signtext: '#',
    article: '',
    author:'',
    id:'',
    focus:false,
    marks:'',
    mark:'',
    shareTempFilePath: "",
    canvashidden: true,
    wxappname: "页面生成图片",
    screenWidth: '' , //设备屏幕宽度
  showmark:true,
    shareImgSrc: "",
  textheight:0,
  textheight2:"",
  biaodian:" : ",
    color: '#00D8A0',
    guanzhu:"关注",
    gz:'',
  shoucang:false,
  isplay:false,
  },

getfocus:function(){
  var that =this;
  that.setData({
    focus:true
  })
},
changecolor:function(){
    var that =this ;
  if(that.data.guanzhu =="关注"){
    wx.request({
      url: 'https://mystoryinn.com/sgz',
      method: 'POST',
      head: { "content-type": "application/json" },
      data: {
        "author": app.author,
        "gz": that.data.author,
        "gztx":that.data.avatarUrl,
        "autx":app.avatarUrl,
        "name":that.data.name
      }
    })
    that.setData({
      color: '#4444',
      guanzhu: '已关注'
    });
    wx.showModal({
      title: '',
      content: '关注成功',
    })
  }else{
    wx.showModal({
      title: '',
      content: '您已关注该作者',
    })
  }
    
},
  getcont:function(e){

    this.setData({
      marks: e.detail.value,
    })
  },
putmarks:function(){
  var that = this;
  if (that.data.marks){
  wx.request({
    url: 'https://mystoryinn.com/spl',
    method:'POST',
    head:{"content-type": "application/json"},
    data:{
      "id":that.data.id,
      "pl":that.data.marks,
      "plp":app.author,
      "name":app.name
    },
    success:function(res){
      that.setData({
        focus: false,
        marks:''
      });
      that.outshowmarkhidden();
      wx.request({
        url: 'https://mystoryinn.com/opl',
        method: 'POST',
        data: {
          "id": that.data.id
        },
        success: function (res) {
          //console.log(res.data);
          that.setData({
            mark:res.data
          })
        }
      })
    },
    
    })
    }
  else{
    wx.showModal({
      title: '提示',
      content: '评论不能为空',
    })
  }
},
  shoucang:function(){
    var that = this;

    wx.request({
      url: 'https://mystoryinn.com/mcsty',
      method: 'POST',
      header: { "content-type": "application/json" },
      data: {
        "author": app.author
      },
      success: function (res) {
        var data = res.data;
    
      //  console.log("id"+data[0][9]);
        for(var i =0;i<data.length;i++){
        if (data[i][9]==that.data.id){
            that.setData({
              shoucang:true
            })
        }
      }
      if(that.data.shoucang){
         wx.showModal({
           title: '已收藏',
           content: '您已收藏该文章，请去我的收藏查看',
         })
      }else{
        wx.request({
          url: 'https://mystoryinn.com/csty',
          method: 'POST',
          head: { "content-type": "application/json" },
          data: {
            "author": app.author,
            "id": parseInt(that.data.id),
            "name" :app.name
          },
          success: function (res) {
           if(res.data=='123'){
            wx.showModal({
              title: '成功收藏',
              content: '可在我的收藏查看文章',
            })
            wx.request({
              url: 'https://mystoryinn.com/jdz',
              method: 'POST',
              header: { "content-type": "application/json" },
              data: {
                "id": parseInt(that.data.id)
              }
            })
          }}
        })
      }
      }
    });
   
  },
audioplay:function(){
 
  innerAudioContext.autoplay = true;
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.loop = true;
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
 
},
  disaudioplay:function(){
    innerAudioContext.pause((res) => {
      console.log('暂停');
      console.log(res.errMsg);
    })
  },
  controlMusic:function(){
    // const innerAudioContext = wx.createInnerAudioContext();
var that =this;
    // innerAudioContext.offPause((res)=>{
    innerAudioContext.src = 'https://mystoryinn.com/image/yequ5.mp3';
    
    innerAudioContext.volume = 0.5;
    // })
    if (that.data.isplay){

      that.setData({
        isplay: false
      });
      that.disaudioplay(() => {
       });
     console.log(that.data.isplay);
   }else{
     
     that.audioplay(()=>{
      
     });
      that.setData({
        isplay: true
      });
     console.log(that.data.isplay);
   }
 
  },
  onLoad: function (options) {
    
    console.log(options);
    var that = this;
    that.setData({
      background: options.background,
      begin: options.begin,
      bottom: options.bottom,
      signtext: options.signtext,
      title:options.title,
      author:options.author,
      article: options.article.split('&hc').join('\n'),
     avatarUrl:options.avatarUrl,
     id:options.id,
     name:options.name
     
    })
    showmark: (options.showmark == "true" ? true : false)
    // wx.request({
    //   url:'https://api.github.com/users/FDELO1998',
    //   method:'GET',
    //   header:{
    //     'content-type': 'application/json'
    //   },
    //   success:function(res){
    //     console.log(res.data);
    //    that.setData({
       
    //      article:res.data
    //    })
    //   }
    // })
    wx.request({
      url: '',
      method: 'POST',
      data: {
        "id": that.data.id
      },
    })
    wx.request({
      url: 'https://mystoryinn.com/opl',
      method:'POST',
      data:{
        "id":that.data.id
      },
      success:function(res){
       
          that.setData({
            mark: res.data
          })
        
      }
    });
    wx.request({
      url: 'https://mystoryinn.com/ogz',
      method: 'POST',
      head: { "content-type": "application/json" },
      data: {
        "author": app.author
      },
      success: function (res) {
        that.setData({
          gz:res.data
        })
        var datagz = that.data.gz;
        if (datagz) {
          for (var i = 0; i < datagz.length; i++) {
            if (that.data.author == datagz[i][1]){
              that.setData({
                color: '#4444',
                  guanzhu: '已关注'
              })
            }
    }
      }}
    })
  },
showmarkhidden:function(){
  var that = this;
  that.setData({
    showview: (!that.data.showview)
  })
},
  outshowmarkhidden: function () {
    var that = this;
    if(that.data.showview){
    that.setData({
      showview: (!that.data.showview)
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

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
  saveImageToPhotosAlbum:function(){
    var that =this;
   wx.showModal({
     title: '提示',
     content: '绘制高清图片约需要10s，请耐心等待',
     success: function (res) {
       if (res.confirm) {
     that.saveImageToPhotosAlbum2();
       }}
   })
  },
  saveImageToPhotosAlbum2: function () {
    wx.showModal({
      title: '提示',
      content: '绘制图片需要10-15秒，请耐心等待',
      showCancel: true
    });
    var that = this;
    that.setData({
      canvashidden: false
    })
   
    var obj = wx.createSelectorQuery();
    obj.select('.ctext').boundingClientRect(function (rect) {

      that.setData({
        textheight: rect.height *1+150,
        textheight2: rect.height *2 +300+ "rpx"//因为加了单位，数字为上面那个的两倍
      })
      
      console.log("文本的宽高是" + rect.height)
    }).exec();
    setTimeout(this.save,800);
  },
  setbackground: function (ctx) {
    var that = this;
   
    var bgImgPath = that.data.background;
    if(bgImgPath){
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
    }else{
      that.setbegin(ctx);
    }
  },
  setbegin: function (ctx) {
    var that = this;
  
    var bgImgPath2 = that.data.begin;
    if(bgImgPath2){
    wx.getImageInfo({
      src: bgImgPath2,
      success: function (res) {
    
        let Path2 = res.path;
        ctx.drawImage(Path2, 0, 0, 375, 450);
        that.setbottom(ctx);
      }
    })}else{
      that.setbottom(ctx);
    }
  },
  setbottom: function (ctx) {
    var that = this;
    var textheight = that.data.textheight;

    var bgImgPath3 = that.data.bottom;
    if(bgImgPath3){
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
    
    })}else{
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
  
     
 save:function(){
 
     var that =this;
     //2. canvas绘制文字和图片
     const ctx = wx.createCanvasContext('mycanvas');
     that.setbackground(ctx);
   
    //ctx.fillText('前世烦恼：' + that.data.fan, 50, 330);
    //ctx.fillText('人物性格：' + that.data.xg, 50, 360);
    
   
 
 },

      // ctx.drawImage(that.data.bottom, 0, bottom, 375, 150);
     //这里很重要，主要就是布局
  
    
   
 
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
   var that = this;
    that.disaudioplay(() => {
    });
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