const ac_network = {
    load_modules :  async () => {
        return dummyJson;   //TODO: Load from Server on next iteration
    },

    post_request :  async (url, data) => {
        return await network.post_w_token(url, data);
    },

    request_data :  async (url) => {
        return await network.get_w_token(url);
    }
};



//----------------------vvvvvvv------------DUMMY JSON DATA GOES HERE------------vvvvvvv---------------------------------

let dummyJson = {
    "modulesArr": [
        {
            "name"          : "calculator",
            "img"           : "images/calculator.png",
            "searchBar"     : true,
            "addButton"     : true,
            "getRequest"    : "calc/list"
        },
        {
            "name"          : "gallery",
            "img"           : "images/gallery.png",
            "searchBar"     : true,
            "addButton"     : true,
            "getRequest"    : "gallery/list"
        },
        {
            "name"          : "poster",
            "img"           : "images/gallery.png",
            "searchBar"     : true,
            "addButton"     : true,
            "postRequest"   : "interactive_poster/list"
        },
    ]
};
