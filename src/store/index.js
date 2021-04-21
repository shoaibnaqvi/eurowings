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
            loading: true,
            currentPage: 1
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
    setters: {},
    mutations: {
        login(state) {
            state.user.loggedIn = true
            state.user.accountId = Vue.prototype.$session.get('account_id')
            state.user.accountUsername = Vue.prototype.$session.get('account_username')
            state.user.accessToken = Vue.prototype.$session.get('access_token')
        },

        logout(state) {
            state.user.loggedIn = false
            state.user.accountId = null
            state.user.accountUsername = null
            state.user.accessToken = null
        },
        loadGalleryImages(state, filters) {
            state.gallery.loading = true
            state.gallery.currentPage === filters.currentPage ? (state.gallery.images = []) : (state.gallery.currentPage = filters.currentPage)
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
                    'Authorization': 'Bearer ' + this._vm.$session.get('access_token'),
                },
            }).then(function (response) {
                response.data.data.map(function (album) {
                    if (album.is_album !== undefined && album.is_album) {
                        album.images.map(function (image) {
                            state.gallery.images.push(image)
                        })
                    }
                    return state.gallery.images.push(album)
                })
                state.gallery.loading = false
            })
        }
    },
    actions: {
        loadGalleryImages(context, filters) {
            context.commit('loadGalleryImages', filters)
        },
        login(context, params) {
            Vue.prototype.$session.start()
            Vue.prototype.$session.set('access_token', params.access_token)
            Vue.prototype.$session.set('account_id', params.account_id)
            Vue.prototype.$session.set('account_username', params.account_username)
            Vue.prototype.$session.set('expires_in', params.expires_in)
            Vue.prototype.$session.set('refresh_token', params.refresh_token)
            Vue.prototype.$session.set('token_type', params.token_type)
            context.commit('login')
        },
        logout(context) {
            Vue.prototype.$session.set('access_token', null)
            Vue.prototype.$session.set('account_id', null)
            Vue.prototype.$session.set('account_username', null)
            Vue.prototype.$session.set('expires_in', null)
            Vue.prototype.$session.set('refresh_token', null)
            Vue.prototype.$session.set('token_type', null)
            context.commit('logout')
        },
    },
    modules: {}
})
