// pages/book-detail/book-detail.js
import {
    BookModel
} from '../../models/book.js';
import {
    LikeModel
} from '../../models/like.js';

const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: {},
        comments: [],
        likeStatus: false,
        likeCount: 0,
        isShowPosting: false
    },

    onLike: function(ev) {
        likeModel.like({
            behavior: ev.detail.behavior,
            artId: this.data.book.id,
            type: 400
        })
    },

    onShowPosing() {
        this.setData({
            isShowPosting: true
        })
    },

    onCancelPosting() {
        this.setData({
            isShowPosting: false
        })
    },

    onPost(ev) {
        const comment = ev.detail.text || ev.detail.value ;
        if(!comment) {
            return ;
        }
        if( comment.length > 12 ){
            wx.showToast({
                title: '短评最多输入12个字',
                icon: 'none'
            })
            return;
        }
        bookModel.postComment(this.data.book.id, comment).then( res => {
            wx.showToast({
                title: '+1',
                icon: 'none'
            })
            this.data.comments.unshift({
                content: comment,
                nums: 1
            });
            this.setData({
                comments: this.data.comments,
                isShowPosting: false 
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const bid = options.bid;

        const detail = bookModel.getDetail(bid);
        const comments = bookModel.getComments(bid);
        const likeStatus = bookModel.getLikeStatus(bid);

        detail.then(res => {
            this.setData({
                book: res
            })
        })

        comments.then(res => {
            this.setData({
                comments: res.comments
            })
        })

        likeStatus.then(res => {
            this.setData({
                likeStatus: res.like_status == 1,
                likeCount: res.fav_nums
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