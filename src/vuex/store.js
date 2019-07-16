let store = {}
export function setStore(_store){
    store = _store
}

export function commit(name, playload){
    store.commit(name, playload)
}

export function dispatch(name, playload){
    store.dispatch(name, playload)
}
