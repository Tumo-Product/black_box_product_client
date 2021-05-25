axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    fetchModules: async () => {
        let response = dummyJson;       //TODO: Switch to Axios
        return response;
    },
    axiosGet: async (request) => {
        return axios.get(request);
    }
};



//----------------------vvvvvvv------------DUMMY JSON DATA GOES HERE------------vvvvvvv---------------------------------

let dummyJson = {
    "modulesArr": [
        {
            "name": "Quiz",
            "img": "images/quiz.png",
            "searchbar": true,
            "addButton": true,
            "getRequest": "/quiz/list"
        },
        {
            "name": "Calculator",
            "img": "images/calculator.png"
        }
    ]
};
