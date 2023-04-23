const ProjectBiz = require('../../biz/project_biz.js');


Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		pInfo: {},
		list: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		var baseInfo = wx.getStorageSync('baseInfo');
		if (baseInfo) {
			this.setData({
				pInfo: baseInfo
			})
		} 
	},

	_loadList: async function () {
	// 1. 获取数据库引用
	const db = wx.cloud.database();
	db.collection('menu').get().then(res => {
		console.log('00',res);
		this.setData({list: res.data})
	})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { 

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		this._loadList();
	},

	onPullDownRefresh: async function () {
		await this._loadList();
		wx.stopPullDownRefresh();
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

	url: async function (e) {
		// pageHelper.url(e, this);
		var webview = e.currentTarget.dataset.url;
		console.log('34',webview);
		wx.navigateTo({
		url: '/pages/wbview/webview?webview='+ webview,
		})
	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})