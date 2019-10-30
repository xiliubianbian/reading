// components/epsoide/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: String,
            observer: function(nval, oval, changePath){
                this.setData({
                    _index: nval < 10 ? '0'+nval : nval 
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _index: '' ,
        year: 0,
        month: '',

        monthMap: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] 
    },

    lifetimes: {
        attached: function(){
            let today = new Date() ;

            console.log(today.getFullYear())

            this.setData({
                year: today.getFullYear() ,
                month: this.data.monthMap[today.getMonth()]
            })
        },
    } ,


    /**
     * 组件的方法列表
     */
    methods: {

    }
})
