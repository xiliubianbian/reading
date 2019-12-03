import { BookModel } from '../../models/book';
import { promisic } from '../../util/tool';

const bookModel = new BookModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasAuth: false,
        userInfo: {},
        bookCount: 0,
        classics: []
    },

    onGetUserInfo(ev) {
        this.setData({
            userInfo: ev.detail.userInfo,
            hasAuth: true
        })
    },

    userAuthorized() {
        wx.getSetting({
            success: data => {
                if (data.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: data => {
                            this.setData({
                                hasAuth: true,
                                userInfo: data.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    /**
     * 将小程序对外提供的API封装成Promise的形式去调用
     */
    userAuthorized1() {
        promisic(wx.getSetting)().then(data => {
            if (data.authSetting['scope.userInfo']) {
                return this.promisic(wx.getUserInfo)();
            }
            return false;
        }).then(data => {
            if (!data) {
                return;
            }
            this.setData({
                hasAuth: true,
                userInfo: data.userInfo
            })
        })
    },

    // 将小程序提供的API写成async,await的形式去调用
    async userAuthorized2() {
        const data = await promisic(wx.getSetting)();
        if (data.authSetting['scope.userInfo']) {
            const authInfo = await this.promisic(wx.getUserInfo)();
            if (authInfo) {
                this.setData({
                    hasAuth: true,
                    userInfo: authInfo.userInfo
                })
            }
        }
    },

    /**
     * 将一个非promise的方法装换为promise的形式返回
     * @param {*} func 接收一个函数作为参数，
     */
    promisic(func) {
        // 执行func，然后将返回结果通过promise返回给调用者
        // 怎么才能接收到func的调用结果？
        // func()
        return function (params = {}) { // 如果没有参数，这一层可以省略

            return new Promise((resolve, reject) => {

                const args = Object.assign(params, {
                    success: res => {
                        resolve(res);
                    },
                    fail: err => {
                        reject(err);
                    }
                })
                func(args);
            })
        }
    },

    getMyLikeBookCount() {
        bookModel.getMyLikeBookCount().then(res => {
            this.setData({
                bookCount: res.count
            })
        })
    },

    getMyFavorBooks() {
        bookModel.getMyFavorBooks().then(res => {
            this.setData({
                classics: res
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.userAuthorized2();

        this.getMyLikeBookCount();

        this.getMyFavorBooks();
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

    }
})