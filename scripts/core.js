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
    let resp    = await axios.post(config.main_url + "ac_users/login", query);
    resp        = resp.data.data;
    if(!resp){      //Undefined or null for data
        await page_manager.clearPage();
        OpenLoginScreen(true);
    } else {
        acc.username    = query._username;
        acc.uuid        = resp.uuid;
        acc.token       = resp.token;
        await page_manager.openView("all_controller");
        await script_loader.loadScriptList("all_controller");
        await page_manager.disableLoading();
    }
}