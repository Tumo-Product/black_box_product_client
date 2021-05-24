const page_manager = {
    _module_cache   :   {
        loading_module  : {html: "", id:"loadingScreen"}
    },
    _page_cache     :   {
        login_page      : {html: ""}
    },

    clearPage           :   ()              => {
        document.body.innerHTML = "";
    },

    openView            :   async (name)    => {
        let data;
        if(page_manager._page_cache.login_page.html === ""){
            data = await view_loader.loadGrutList(name);
            for(let i = 0; i < data.length; i++){
                page_manager._page_cache.login_page.html += data[i].data;
            }
        }
        document.body.innerHTML += page_manager._page_cache.login_page.html;
    },

    activateLoading     :   async ()        => {
        let data;
        if(page_manager._module_cache.loading_module.html === ""){
            data = await module_loader.loadZorgList("loading");
            for(let i = 0; i < data.length; i++){
                page_manager._module_cache.loading_module.html += data[i].data;
            }
        }
        document.body.innerHTML += page_manager._module_cache.loading_module.html;
    },

    disableLoading      :   ()      => {
        let obj = document.getElementById(page_manager._module_cache.loading_module.id);
        obj.remove();
    }

}