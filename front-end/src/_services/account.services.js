export let saveToken = (token) => {
    localStorage.setItem('token', token);
}
export let logout = () => {
    localStorage.removeItem('token');
}
export let getToken = () => {
    return localStorage.getItem('token');
}
export function isLoggedIn() {
    let token = getToken();
    if (token) {
        let payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    } else {
        return false;
    }
}

export let getUserID = () => {
    if (!isLoggedIn())
        return false;
    return JSON.parse(atob(getToken().split('.')[1])).id;
}
export let getUserRole = () => {
    if (!isLoggedIn())
        return false;
    return JSON.parse(atob(getToken().split('.')[1])).Role;
}
export let getCurrentUser = () => {
    if (!isLoggedIn())
        return false;
    return JSON.parse(atob(getToken().split('.')[1]));
}