import {
    HTTP
} from '../util/http.js';

class LikeModel extends HTTP {
    like(params) {
        this.request({
            url: params.behavior == 'like' ? 'like' : 'like/cancel',
            method: 'Post',
            data: {
                art_id: params.artId,
                type: params.type
            }
        })
    }

    getClassicLikeStatus(artId, categoay, callback){
        this.request({
            url: `classic/${categoay}/${artId}/favor` ,
            data: {
                id: params.artId,
                type: params.type
            }
        }) 
    }
}

export {
    LikeModel
};