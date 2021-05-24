$(function () {
    OnStartup();
})

let OnStartup = () => {
    OpenLoginScreen(false);
}

let OpenLoginScreen = async (error) => {
    await page_manager.activateLoading();
    await page_manager.openView("login");
    await script_loader.loadScriptList("login");
    login_flow.OnStartup();
    await page_manager.disableLoading();
    if(error){
        login_flow.SetErrorTextState(true);
    }
}

let LoginProcessing = async (query) => {
    await script_loader.unloadScripts();
    await page_manager.clearPage();
    await page_manager.activateLoading();
    let resp = await axios.post(config.main_url + "ac_users/login", query);
    if(!resp.data.data){   //Undefined or null for data
        await page_manager.clearPage();
        OpenLoginScreen(true);
    } else {
        console.log(resp);
    }
}