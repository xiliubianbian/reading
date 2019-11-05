import { classicBeh } from '../classic-beh.js';

const mMgr = wx.getBackgroundAudioManager();

Component({
    behaviors: [classicBeh],
    /**
     * 组件的属性列表
     */
    properties: {
        src: String , // 音乐播放地址
        title: String 
    },

    /**
     * 组件的初始数据
     */
    data: {
        isPlaying: false 
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPlay() {
            if(this.data.isPlaying) {
                this.setData({
                    isPlaying: false
                })
                mMgr.pause();
            }else {
                this.setData({
                    isPlaying: true 
                })
                mMgr.src = this.properties.src;
                mMgr.title = this.properties.title;
            }
        }
    }
})
