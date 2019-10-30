// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 点赞的状态
        like: {
            type: Boolean,
            value: false
        },
        // 点赞数
        count: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onLike: function(event) {
            let like = this.properties.like,
                count = this.properties.count;
            this.setData({
                count: like ? count - 1 : count + 1,
                like: !like
            })

            let behavior = this.properties.like ? 'like' : 'cancel' ;
            this.triggerEvent('like', {
                behavior: behavior
            },{});
        }
    }
})