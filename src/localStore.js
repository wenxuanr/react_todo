export function save(key, value){
    console.log(key, value);
    console.log(1232131);
    return window.localStorage.setItem(key, JSON.stringify(value))
}

export function load(key){
    return JSON.parse(window.localStorage.getItem(key))
}