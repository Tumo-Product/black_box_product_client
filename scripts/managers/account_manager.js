const acc = {
    token       : "",
    uuid        : "",
    username    : "",

    store_data  : () => {
        localStorage.setItem("token"    , acc.token);
        localStorage.setItem("uuid"     , acc.uuid);
        localStorage.setItem("username" , acc.username);
    }
}