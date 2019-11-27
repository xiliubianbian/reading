let paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null
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
        },

        // 判断服务器是否还有更多的数据返回
        hasMore() {
            return this.data.dataArray.length < this.data.total;
        },

        initData() {
            this.data.dataArray = [];
            this.data.total = null;
        }
    }
})

export {
    paginationBev
}