import {
    HTTP
} from '../util/http-p.js';

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }

    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }

    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }

    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }

    getMyLikeBookCount() {
        return this.request({
            url: '/book/favor/count'
        })
    }

    getMyFavorBooks() {
        return this.request({
            url: '/classic/favor'
        })
    }

    postComment(bid, content) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'Post',
            data: {
                book_id: bid,
                content: content
            }
        })
    }

    search(start, q) {
        return this.request({
            url: '/book/search?summary=1',
            data: {
                q: q,
                start: start
            }
        })
    }
}

export {
    BookModel
};