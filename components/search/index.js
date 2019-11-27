import {
    KeywordModel
} from '../../models/keyword.js';

import {
    BookModel
} from '../../models/book.js';

import { paginationBev } from '../behaviors/pagination.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
    behaviors: [paginationBev],
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
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
        isloading: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore() {
            if (!this.data.query) {
                return;
            }
            if (this.data.isloading) {
                return;
            }
            if (this.hasMore()) {
                this.data.isloading = true;
                bookModel.search(this.getCurrentStart(), this.data.query).then(res => {
                    this.setMoreData(res.books);
                    this.setData({
                        total: res.total
                    });
                    this.data.isloading = false;
                })
            }
        },
        onCancel(ev) {
            this.triggerEvent('cancel', {}, {});
        },
        onSearch(ev) {
            this.setData({
                isSearching: true
            });
            this.initData();

            const keywords = ev.detail.value || ev.detail.text;
            if (ev.detail.text) {
                this.setData({
                    query: ev.detail.text
                });
            }
            bookModel.search(0, keywords).then(res => {
                this.setMoreData(res.books);
                this.setData({
                    total: res.total
                });
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
        },

        // 私有方法
    },

    attached() {
        const historyWords = keywordModel.getHistory();
        this.setData({
            historyWords
        })
        this.getHotWords();
    }
})