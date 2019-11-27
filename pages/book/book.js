import { BookModel } from '../../models/book.js';
import { random } from '../../util/tool.js';

let bookModel = new BookModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        isSearching: false,
        more: ''
    },

    onSearching() {
        this.setData({
            isSearching: true
        })
    },

    onCancel() {
        this.setData({
            isSearching: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // new Promise接收一个函数作为参数
        // 该函数有两个参数 resolve, reject
        bookModel.getHotList()
            .then(
                res => {
                    this.setData({
                        books: res
                    })
                }
            )
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
        this.setData({
            more: random(16)
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})