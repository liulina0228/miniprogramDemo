const ProjectBiz = require('../../biz/project_biz.js');

const util = require('../../biz/util') 


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
		var fileLink = e.currentTarget.dataset.url;
		console.log('34',fileLink);
		// wx.navigateTo({
		// url: '/pages/wbview/webview?webview='+ webview,
		// })
		
		if(!fileLink) {
			return false
		}
		util.showLoading()

		// 单次下载允许的最大文件为 200MB
		wx.cloud.downloadFile({
			fileID: fileLink, // 地址已打码，自己换个其他的地址("https://www.xxxxx.com/file/测试通知.pdf")
			success: function (res) {
					console.log(res, "wx.downloadFile success res")
					if(res.statusCode != 200) {
							util.hideLoadingWithErrorTips()
							return false
					}
					var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
					wx.openDocument({
							filePath: Path,
							showMenu: true,
							success: function (res) {
									console.log('打开成功');
									util.hideLoading()
							}
					})
			},
			fail: function (err) {
					console.log(err, "wx.downloadFile fail err");
					util.hideLoadingWithErrorTips()
			}
		})
	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})