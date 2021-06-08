const ac_network = {
    load_modules :  async () => {
        return dummyJson;   //TODO: Load from Server on next iteration
    },

    request_data :  async (url) => {
        return await network.get_w_token(url);;
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
            "getRequest": "/calc/list"
        }
    ]
};
