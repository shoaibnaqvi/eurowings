export default function requireAuth ({ next, store }){
    if(!store.getters.auth.loggedIn){
        return next({
            name: 'Unauthorized-Access'
        })
    }

    return next()
}