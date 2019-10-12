export function formatTime(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export function log(date: string): void {
  console.log(date);
}

// 显示繁忙提示
export function showBusy(text?: string): void {
  wx.showToast({
    title: text == undefined ? "繁忙" : text,
    icon: 'loading',
    duration: 2000
  })
}

// 显示成功提示
export function showSuccess(text?: string): void {
  wx.showToast({
    title: text == undefined ? "success" : text,
    icon: 'success'
  })
}

// 显示失败提示
export function showModel(title: string, content: any): void {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

export function request(url: string, param: any, method?: string): any {
  var _this = this;
  wx.showLoading({
    title: "数据加载中...",
    mask: true
  });
  var info: any;
  wx.request({
    url: "http://127.0.0.1:8081" + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': wx.getStorageSync("token")
    },
    data: param,
    method: method == undefined ? "POST" : "GET",
    success: (e) => {
      setTimeout(() => {
        wx.hideLoading();
      }, 100);
      if (e.data.success === true) {
        e.data = info;
      } else {
        _this.showSuccess("fail");
      }
    },
    error: function (e) {

    }
  })
  return info;
}