import {
    config
} from '../config.js';

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey不存在，请先申请',
    3000: '期刊不存在'
}

class HTTP {
    request({url, data = {}, method = 'GET'}) {
        return new Promise( (resolve, reject) => {
            this._request(url, resolve, reject, data, method) ;
        })
    }
    // 必填参数需要放在选填之前
    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'appkey': config.appkey,
                'content-type': 'application/json'
            },
            success: res => {
                let code = res.statusCode.toString();
                if (code.startsWith('2')) {
                    resolve(res.data);
                } else {
                    reject();
                    this._show_error(res.statusCode);
                }
            },
            fail: err => {
                reject();
                this._show_error(1);
            }
        })
    }

    // 形式上的私有函数
    _show_error(err_code) {
        if (!tips[err_code]) {
            err_code = 1;
        }
        wx.showToast({
            title: tips[err_code] ? tips[err_code] : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    HTTP
};