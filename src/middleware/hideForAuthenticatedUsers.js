export default function hideForAuthenticatedUsers ({ next, store }){
    if(store.getters.auth.loggedIn){
        return next({
            name: 'Home'
        })
    }

    return next()
}