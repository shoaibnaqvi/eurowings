import Vue from 'vue'
import Vuex from 'vuex'
import VueSession from "vue-session/index.esm";

Vue.use(Vuex)

var options = {
    persist: true
}
Vue.use(VueSession, options)

export default new Vuex.Store({
    state: {
        user: {
            loggedIn: !!Vue.prototype.$session.get('access_token'),
            accountUsername: Vue.prototype.$session.get('account_username'),
            accountId: Vue.prototype.$session.get('account_id'),
            accessToken: Vue.prototype.$session.get('access_token')
        },
        gallery: {
            images: [],
            loading: true
        }
    },
    getters: {
        auth(state) {
            return state.user
        },
        accountUsername(state) {
            return state.user.accountUsername
        },
        accountId(state) {
            return state.user.accountId
        }
    },
    setters: {

    },
    mutations: {
        login(state, params) {
            this._vm.$session.start()
            this._vm.$session.set('access_token', params.access_token)
            this._vm.$session.set('account_id', params.account_id)
            this._vm.$session.set('account_username', params.account_username)
            this._vm.$session.set('expires_in', params.expires_in)
            this._vm.$session.set('refresh_token', params.refresh_token)
            this._vm.$session.set('token_type', params.token_type)
            state.user.loggedIn = true
            state.user.accountId = this._vm.$session.get('account_id')
            state.user.accountUsername = this._vm.$session.get('account_username')
            state.user.accessToken = this._vm.$session.get('access_token')
            console.log(this._vm.$session.getAll())
        },

        logout(state) {
            console.log(this._vm.$session);
            this._vm.$session.set('access_token', null)
            this._vm.$session.set('account_id', null)
            this._vm.$session.set('account_username', null)
            this._vm.$session.set('expires_in', null)
            this._vm.$session.set('refresh_token', null)
            this._vm.$session.set('token_type', null)
            state.user.loggedIn = false
            state.user.accountId = null
            state.user.accountUsername = null
            state.user.accessToken = null
            console.log(this._vm.$session.getAll());
        },
        loadGalleryImages(state, filters) {
            var axios = require('axios');
            var url = process.env.VUE_APP_API_ENDPOINT + '/gallery/' +
                filters.activeSection + '/' +
                filters.activeSort + '/' +
                filters.activeWindow + '/' +
                filters.currentPage + '?showViral=' +
                filters.showViral + '&mature=' +
                filters.showMature + '&album_previews=' +
                filters.albumPreviews
            axios.get(url, {
                headers: {
                    'Authorization': 'Bearer 9ec5654f277ebf4664eb1044b05cddec48417f17',
                },
            }).then(function (response) {
                response.data.data.map(function (album) {
                    if(album.is_album !== undefined && album.is_album){
                        album.images.map(function (image) {
                            state.gallery.images.push(image)
                        })
                    }
                })
                console.log(state.gallery.images)
                //state.gallery.images = response.data.data
            })
        }
    },
    actions: {},
    modules: {}
})
