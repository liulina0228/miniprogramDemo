/* 加载动画相关 */
const showLoading = (tips = '加载中...') => {
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: tips,
  })
}
 
const hideLoading = () => {
  wx.hideLoading()
  wx.hideNavigationBarLoading()
}
 
const hideLoadingWithErrorTips = (err = '加载失败...') => {
  hideLoading()
  wx.showToast({
    title: err,
    icon: 'error',
    duration: 2000
  })
}
 
module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  hideLoadingWithErrorTips: hideLoadingWithErrorTips,
}