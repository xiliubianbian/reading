import {ClassicModel} from '../../models/classic.js' ;
import { LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel() ;
let likeModel = new LikeModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        classicData: {},
        first: false,
        latest: true 
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
        console.log('next')
    } ,

    onPrevious: function(){
        console.log('previous')
    } ,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        classicModel.getLatest( (res) => {
            this.setData({
                classicData: res
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