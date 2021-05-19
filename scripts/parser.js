axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    fetchModules: async () => {
        let response = await fetch(config.query_url);
        return await response.json();
    },
    axiosGet: async (request) => {
        return axios.get(request);
    }
}