

export default function ({ isServer, store, req }) {
    // If nuxt generate, pass this middleware
    if (isServer && !req) return
    const loggedUser = getUserFromLocalStorage()
    store.commit('setUser', loggedUser)
}

function getUserFromLocalStorage(){

        const json = window.localStorage.user
        return json ? JSON.parse(json) : undefined

}