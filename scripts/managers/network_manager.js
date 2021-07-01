const network = {
    post_w_token    : async (rout, query) => {
        query._token = acc.token;
        let resp = await axios.post(config.main_url + rout, query);
        if(resp.data.error) { location.reload(); }
        resp = resp.data;
        return resp;
    },
    
    get_w_token     : async (rout) => {
        let resp = await axios.get(config.main_url + rout, {params : {token : acc.token }});
        if(resp.data.error) { location.reload(); } //Acces Error, reloading
        resp = resp.data.data;
        return resp;
    },

    post_unsecure   : async (rout,query) => {   //rout ex. "ac_users/login"
        let resp = await axios.post(config.main_url + rout, query);
        resp = resp.data.data;
        return resp;
    },

    get_unsecure    : async (rout , query) => {
        let resp = await axios.get(config.main_url + rout, {params : query});
        resp = resp.data.data;
        return resp;
    }
}