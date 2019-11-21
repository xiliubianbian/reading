// pages/book-detail/book-detail.js
import {
    BookModel
} from '../../models/book.js'

const bookModel = new BookModel() ;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: {} ,
        comments: [] ,
        likeStatus: false ,
        likeCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const bid = options.bid;
        console.log(bid);

        const detail = bookModel.getDetail(bid) ;
        const comments = bookModel.getComments(bid) ;
        const likeStatus = bookModel.getLikeStatus(bid) ;

        detail.then( res => {
            console.log(res) ;
            this.setData({
                book: res
            })
        })

        comments.then(res => {
            console.log(res) ;
            this.setData({
                comments: res
            })
        })

        likeStatus.then(res => {
            console.log(res);
            this.setData({
                likeStatus: res.like_status == 1,
                likeCount: res.fav_num
            })
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

    }
})