import {
    HTTP
} from '../util/http.js';

class ClassicModel extends HTTP {
    getLatest(callback) {
        this.request({
            url: 'classic/latest',
            success: res => {
                let storageIndex = this._getKey(res.index) ;
                wx.setStorageSync(storageIndex, res) ;
                callback(res);
            }
        })
    }

    getClassicData(index, nextOrPrevious, callback){
        let keyIndex = nextOrPrevious == 'next' ? index + 1 : index - 1 ,
            storageIndex = this._getKey(keyIndex) ;
        let classic = wx.getStorageSync(storageIndex) ;

        if( !classic ) {
            this.request({
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: res => {
                    wx.setStorageSync(storageIndex, res) ;
                    callback(res);
                }
            })
        }else {
            callback(classic) ;
        }
    }

    _getKey(index) {
        return 'classic-' + index ; 
    }
}

export { ClassicModel};