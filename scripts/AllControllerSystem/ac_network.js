const ac_network = {
    load_modules :  async () => {
        return dummyJson;   //TODO: Load from Server on next iteration
    },

    request_data :  async (url) => {
        let resp = await axios.get(config.main_url + url, {params: { token : acc.token}});
        return resp.data.data;
    }
};



//----------------------vvvvvvv------------DUMMY JSON DATA GOES HERE------------vvvvvvv---------------------------------

let dummyJson = {
    "modulesArr": [
        {
            "name": "calculator",
            "img": "images/calculator.png",
            "searchBar": true,
            "addButton": true,
            "getRequest": "/quiz/list"
        }
    ]
};
