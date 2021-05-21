$(async function () {
    await page_manager.activateLoading();
    await page_manager.openView("login");
    await script_loader.loadScriptList("login");
    await page_manager.disableLoading();
})