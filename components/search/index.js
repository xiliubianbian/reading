import {
    KeywordModel
} from '../../models/keyword.js';

import {
    BookModel
} from '../../models/book.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: '_load_more'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isSearching: false,
        query: '',
        historyWords: [],
        hotWords: [],
        searchList: [],
        isloading: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _load_more() {
            if (!this.data.query) {
                return;
            }
            if (this.data.isloading) {
                return;
            }
            const length = this.data.searchList.length;
            this.data.isloading = true ;
            bookModel.search(length, this.data.query).then(res => {
                let tempArr = this.data.searchList.concat(res.books);
                this.setData({
                    searchList: tempArr
                })
                this.data.isloading = false;
            })
        },
        onCancel(ev) {
            this.triggerEvent('cancel', {}, {});
        },
        onSearch(ev) {
            this.setData({
                isSearching: true
            });
            const keywords = ev.detail.value || ev.detail.text;
            if (ev.detail.text) {
                this.setData({
                    query: ev.detail.text
                });
            }
            bookModel.search(0, keywords).then(res => {
                this.setData({
                    searchList: res.books,
                })
                keywordModel.addToHistory(keywords);
            })
        },
        onClear(ev) {
            this.setData({
                isSearching: false,
                query: ''
            })
        },

        getHotWords() {
            keywordModel.getHot().then(res => {
                this.setData({
                    hotWords: res.hot
                })
            })
        }
    },

    attached() {
        const historyWords = keywordModel.getHistory();
        this.setData({
            historyWords
        })
        this.getHotWords();
    }
})