const acc = {
    token       : "",
    uuid        : "",
    username    : "",
    loggedin    : false,
    check_access    : async () => {
        acc.retrieve_data();
        let resp    = await axios.post(config.main_url + "ac_users/tokenupdate", {_token : acc.token, _uuid : acc.uuid});
        if(resp.data.data){
            if(resp.data.data.token) { acc.loggedin = true; }
        }
    },

    retrieve_data   : () => {
        acc.token       = localStorage.getItem("token");
        acc.uuid        = localStorage.getItem("uuid");
        acc.username    = localStorage.getItem("username");
    },

    store_data      : () => {
        localStorage.setItem("token"    , acc.token);
        localStorage.setItem("uuid"     , acc.uuid);
        localStorage.setItem("username" , acc.username);
    },

    clear           : () => {
        localStorage.clear();
    }
}