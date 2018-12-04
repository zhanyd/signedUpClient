// pages/addActivity/addActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    activityDate: '',
    activityTime: '09:00',
    cutOffDate: '',
    cutOffTime: '09:00'
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
    }
    
  })