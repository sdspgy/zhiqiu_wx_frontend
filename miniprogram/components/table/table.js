Component({
  properties: {
    data: {
      type: Array
    },
    titles: {
      type: Object
    },
    caption: {
      type: String
    },
    scrollY: {
      type: Boolean,
      value: false
    },
    tableHeight: {
      type: Number
    },
    colWidth: {
      type: Number,
      value: 75
    }
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      //根据titles 动态设置表格的宽度 
      let keys = Object.keys(this.data.titles);
      this.setData({
        tableWidth: keys.length * this.properties.colWidth
      })
    },
  },
  observers: {
    //数据发生变化触发外部绑定的事件
    "data": function(data) {
      if (this.data.crtRow > -1) {
        this.triggerEvent('rowtap', {
          data: data[this.data.crtRow],
          index: this.data.crtRow
        }, {});
      }
      if (this.data.crtCol != null) {
        let d = [];
        data.forEach((item, index) => {
          d[index] = item[this.data.crtCol];
        })
        this.triggerEvent('coltap', {
          data: d,
          col: this.data.crtCol
        }, {});
      }
    }
  },

  data: {
    crtRow: -1, //当前被选中的行
    crtCol: null, //当前被选中的列
    left1: 0,
    left2: 0,
  },
  methods: {
    //row被tap 
    onRowTap: function(event) {
      let v = event.currentTarget;
      this.setData({
        crtRow: v.dataset.index,
        crtCol: null
      })
      //触发外部绑定的事件
      this.triggerEvent('rowtap', {
        data: this.properties.data[this.data.crtRow],
        index: this.data.crtRow
      }, {});
    },

    onColTap: function(event) {
      let v = event.currentTarget;
      this.setData({
        crtRow: -1,
        crtCol: v.dataset.col
      })
      let data = [];
      this.properties.data.forEach((item, index) => {
        data[index] = item[this.data.crtCol];
      })
      //触发外部绑定的事件
      this.triggerEvent('coltap', {
        data: data,
        col: this.data.crtCol
      }, {});
    },
    //滑动绑定
    bindToHead: function({
      detail
    }) {
      this.setData({
        left1: detail.scrollLeft
      })
    },
    //底部事件
    bottomEvent: function() {
      this.triggerEvent('bottomtap', {

      }, {});
    }
  }
})