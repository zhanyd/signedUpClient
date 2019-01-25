// pages/addActivity/addActivity.js

// 引入SDK核心类
let QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
let qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    activityDate: '',
    activityTime: '09:00',
    cutOffDate: '',
    cutOffTime: '09:00',
    latitude: '',
    longitude: '',
    centerLongitude: '',
    centerLatitude: '',
    markers: [],
    currentAddress: '' //当前选择地址
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      today: this.getNowFormatDate(),
      activityDate: this.getNowFormatDate(1),
      cutOffDate: this.getNowFormatDate(1)
    })
    console.log(this.data.activityDate)

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'BPZBZ-VW7HR-VPEW2-WVCJ7-6UPNT-AGF6S'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')

    //获取当前位置
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        that.mapCtx.moveToLocation()
      }
    })
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

  },


   bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      activityDate: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      activityTime: e.detail.value
    })
  },
  bindCutOffDateChange: function(e){
    this.setData({
      cutOffDate: e.detail.value
    })
  },
  bindCutOffTimeChange: function(e){
    this.setData({
      cutOffTime: e.detail.value
    })
  },
  //获取当前时间，格式YYYY-MM-DD
  getNowFormatDate: function(days) {
    let date = new Date();
    if (days != '' && days != null && days != undefined && !isNaN(days)){
      date.setDate(date.getDate() + days)
    }
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if(month >= 1 && month <= 9) {
    month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
    },

  /**
   * 移动到坐标
   */
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  /**
   * 拖动地图回调
   */
  regionChange: function (res) {
    // 改变中心点位置  
    if (res.type == "end") {
      this.getCenterLocation();
    }
  },

  /**
  * 得到中心点坐标
  */
  getCenterLocation: function () {
    let that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          centerLongitude: res.longitude,
          centerLatitude: res.latitude
        })
        that.regeocodingAddress();
      }
    })
  },

  /**
   * 逆地址解析
   */
  regeocodingAddress: function () {
    let that = this;
    console.log("that.data.centerLatitude = " + that.data.centerLatitude);
    console.log("that.data.centerLongitude = " + that.data.centerLongitude);
    //通过经纬度解析地址
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.centerLatitude,
        longitude: that.data.centerLongitude
      },
      success: function (res) {
        console.log(res);
        that.setData({
          currentAddress: res.result.address_component.city + res.result.address_component.district +           res.result.address_component.street
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },


  })