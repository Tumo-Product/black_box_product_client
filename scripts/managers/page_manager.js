const page_manager = {
    _module_cache   :   {
        loading_module  : {html: "", id:"loadingScreen"}
    },

    activateLoading     :   async () => {
        let data;
        if(page_manager._module_cache.loading_module.html === ""){
            data = await module_loader.loadZorgList("loading");
            console.log(data);
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