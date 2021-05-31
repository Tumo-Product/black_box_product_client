const ac_network = {
    load_modules : async () => {
        return dummyJson;   //TODO: Load from Server on next iteration
    }
};



//----------------------vvvvvvv------------DUMMY JSON DATA GOES HERE------------vvvvvvv---------------------------------

let dummyJson = {
    "modulesArr": [
        {
            "name": "Calculator",
            "img": "images/calculator.png",
            "searchBar": true,
            "addButton": true,
            "getRequest": "/quiz/list"
        }
    ]
};
