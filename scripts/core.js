const scriptStorage = {};

$(function () {
    OnStartup();
});

let OnStartup = async () => {
    await page_manager.activateLoading();
    await acc.check_access();
    if(!acc.loggedin){
        OpenLoginScreen(false);
    } else {
        await LoadController();
    }
};

let OpenLoginScreen = async (error) => {
    await page_manager.openView("login");
    await script_loader.loadScriptList("login");
    login_flow.OnStartup();
    await page_manager.disableLoading();
    if(error){
        login_flow.SetErrorTextState(true);
    }
};

let LoginProcessing = async (query) => {
    await script_loader.unloadScripts();
    await page_manager.clearPage();
    await page_manager.activateLoading();
    let resp    = await network.post_unsecure("ac_users/login", query);
    if(!resp){      //Undefined or null for data
        await page_manager.clearPage();
        OpenLoginScreen(true);
    } else {
        acc.username    = query._username;
        acc.uuid        = resp.uuid;
        acc.token       = resp.token;
        acc.store_data();
        await LoadController();
    }
};

let LoadController = async () => {
    await page_manager.openView("all_controller");
    await script_loader.loadScriptList("all_controller");
    await page_manager.disableLoading();
}