import {
    config
} from '../config.js';

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey不存在，请先申请',
    3000: '期刊不存在'
}

class HTTP {
    request(params) {
        if (!params.method) {
            params.method = 'GET';
        }
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header: {
                'appkey': config.appkey,
                'content-type': 'application/json'
            },
            success: res => {
                let code = res.statusCode.toString();
                if (code.startsWith('2')) {
                    params.success(res.data);
                } else {
                    this._show_error(res.statusCode);
                }
            },
            fail: err => {
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
            title: tips[err_code],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    HTTP
};