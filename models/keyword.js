class KeyWordModel {
    key = 'q' 
    maxLength = 10 

    getHistory() {
        return wx.getStorageSync(key) || [] ;
    }

    getHot() {

    }

    addToHistory(keyword) {
        let words = this.getHistory();
        const has = words.include(keyword) ;
        if( !has ){
            words.unshift(keyword);
        } 
        wx.setStorageSync(key, value);
    }
}