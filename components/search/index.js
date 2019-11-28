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
        isloadingCenter: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore() {
            if (!this.data.query) {
                return;
            }
            if (this.locked()) {
                return;
            }
            if (this.hasMore()) {
                this.locked();
                bookModel.search(this.getCurrentStart(), this.data.query).then(res => {
                    this.setMoreData(res.books);
                    this.setData({
                        total: res.total
                    });
                    this.unLocked();
                }).then( () => {
                    this.unLocked();
                })
            }
        },
        onCancel(ev) {
            this.initData();
            this.triggerEvent('cancel', {}, {});
        },
        onSearch(ev) {
            this._showResult();
            const keywords = ev.detail.value || ev.detail.text;
            if (ev.detail.text) {
                this.setData({
                    query: ev.detail.text
                });
            }
            this.setData({
                isloadingCenter: true 
            })
            bookModel.search(0, keywords).then(res => {
                this.setMoreData(res.books);
                this.setTotal(res.total);
                this.setData({
                    isloadingCenter: false
                });
                keywordModel.addToHistory(keywords);
            })
        },
        onClear(ev) {
            this.initData();
            this._hideResult();
            this.setData({
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
        _showResult(){
            this.setData({
                isSearching: true
            })
        },
        _hideResult(){
            this.setData({
                isSearching: false
            })
        },
        
    },

    attached() {
        const historyWords = keywordModel.getHistory();
        this.setData({
            historyWords
        })
        this.getHotWords();
    }
})