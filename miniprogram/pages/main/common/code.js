// pages/page/common/main/code.js
import F2 from '../../../f2-canvas/lib/f2';
var e = require('../../../app.js');
const conf = {
  table: {
    titles: {
      ds: '日期',
      name: '名字',
      sex: '性别',
      age: '年龄',
      address: '地址'
    },
    colWidth: 100,
    datas: [{
        ds: '2019-10-01',
        name: 'xiaomi',
        sex: '男',
        age: 10,
        address: '北京'
      },
      {
        ds: '2019-10-02',
        name: 'huawei',
        sex: '男',
        age: 12,
        address: '深圳'
      },
      {
        ds: '2019-10-03',
        name: 'oppo',
        sex: '女',
        age: 8,
        address: '上海'
      },
    ],
  }
};
let chart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conf: conf,
    optsF2: {
      lazyLoad: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init_f2();
  },

  back: function() {
    wx.redirectTo({
      url: '../../../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //表格横行被点击
  onRowTap: function({
    detail
  }) {
    console.log(detail.index + ":" + JSON.stringify(detail.data));
  },

  //表格纵行被点击
  onColTap: function({
    detail
  }) {
    console.log(detail.col + ":" + JSON.stringify(detail.data));
  },

  //滚动条底部事件
  onBottomTap: function() {},

  //f2
  init_f2() {
    this.component = this.selectComponent('#codeF2');
    this.component.init((canvas, width, height) => {
      const data = [{
          year: '1951 年',
          sales: 38
        },
        {
          year: '1952 年',
          sales: 52
        },
        {
          year: '1956 年',
          sales: 61
        },
        {
          year: '1957 年',
          sales: 145
        },
        {
          year: '1958 年',
          sales: 48
        },
        {
          year: '1959 年',
          sales: 38
        },
        {
          year: '1960 年',
          sales: 38
        },
        {
          year: '1962 年',
          sales: 38
        },
      ];
      chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.interval().position('year*sales');
      chart.render();
      return chart;
    });
  },

})