let paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null,
        noneResult: false ,
        isloading: false
    },

    methods: {
        setMoreData(dataArray) {
            let tempArr = this.data.dataArray.concat(dataArray);
            this.setData({
                dataArray: tempArr
            })
        },

        // 获取当前的记录数
        getCurrentStart() {
            return this.data.dataArray.length;
        },

        setTotal(total) {
            this.data.total = total;
            if (total === 0) {
                this.setData({
                    noneResult: true
                })
            }
        },

        // 判断服务器是否还有更多的数据返回
        hasMore() {
            return this.data.dataArray.length < this.data.total;
        },

        locked(){
            this.setData({
                isloading: true
            })
        },

        unLocked(){
            this.setData({
                isloading: false
            })
        },

        initData() {
            this.setData({
                dataArray: [],
                noneResult: false,
                isloading: false 
            })
            this.data.total = null;
        }
    }
})

export {
    paginationBev
}