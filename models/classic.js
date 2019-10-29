import {
    HTTP
} from '../util/http.js';

class classicModel extends HTTP {
    getLatest(callback) {
        this.request({
            url: 'classic/latest',
            success: res => {
                console.log(res)
                callback(res);
            }
        })
    }
}

export {classicModel};