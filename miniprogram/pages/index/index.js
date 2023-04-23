// projects/TRIP1/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isLoad: false,
		welcomBg: '',
		pInfo: {
			welcomBg: '',
			bgColor: '#fff',
			version: 0
		}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
		var baseInfo = wx.getStorageSync('baseInfo');
		if (baseInfo) {
			this.setData({
				pInfo: baseInfo
			})
		} 
		this._loadDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
		
  },
	_loadDetail: async function () {
		// 1. 获取数据库引用
		const db = wx.cloud.database();
		db.collection('baseinfo').get().then(res => {
			// res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
			const pInfos = res.data;
			if (!pInfos.length) {
				this.setData({
					isLoad: null
				});
				return;
			}
			// 更新缓存,每次更新配置记得更新版本
			if (this.data.pInfo.version !== pInfos[0].version) {
				//更新缓存
				wx.setStorageSync('baseInfo', pInfos[0]);
			}
			// 更新data数据
			this.setData({
				isLoad: true,
				pInfo: pInfos[0]
			});
		})
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  goToIndex:function(e) {
		wx.navigateTo({
      url: '/pages/default/index/default_index',
    })
	}
})