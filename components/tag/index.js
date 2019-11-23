// components/tag/index.js
Component({
    options: {
        multipleSlots: true , // 启用插槽
    } ,
    /**
     * 组件的属性列表
     */
    properties: {
        text: String
    },

    externalClasses: ['tag-class'] ,

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap() {
            this.triggerEvent('onTapping', {
                text: this.properties.text
            })
        }
    }
})
