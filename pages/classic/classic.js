import {ClassicModel} from '../../models/classic.js' ;
import { LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel() ;
let likeModel = new LikeModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        latestData: {} , // 最新一期的期刊信息
        classicData: {}, // 当前期刊信息
        first: false,
        latest: true ,
        likeStatus: 0,
        likeCount: 0
    },

    onLike: function(ev){
        console.log(ev);
        var data = this.data.classicData ;
        likeModel.like({
            behavior: ev.detail.behavior,
            artId: data.id ,
            type: data.type
        })
    },

    onNext: function(){
        this._getClassicData('next') ;
    } ,

    onPrevious: function(){
        this._getClassicData('previous');
    } ,

    _getClassicData(nextOrPrevious){
        let index = this.data.classicData.index;
        classicModel.getClassicData(index, nextOrPrevious , (res) => {
            this._getLikeStatus(res.id, res.type) ;
            this.setData({
                classicData: res,
                first: res.index == 1,
                latest: res.index == this.data.latestData.index
            })
        });
    } ,

    _getLikeStatus(artId, category){
        likeModel.getClassicLikeStatus(
            artId, 
            category, 
            (res) => {
                this.setData({
                    likeStatus: res.like_status ,
                    likeCount: res.fav_nums
                })
        })
    } ,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        classicModel.getLatest( (res) => {
            this.setData({
                classicData: res,
                latestData: res ,
                likeStatus: res.like_status ,
                likeCount: res.fav_nums
            })
        });
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