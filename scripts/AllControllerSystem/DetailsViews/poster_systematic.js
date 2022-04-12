const poster_sys_data = {
    frontURL    : 'https://tumo-product.github.io/interactive_poster/?_uid=',

    getURL      : () => {
        let id  = poster_handlers.current_dat.uid;
        let url = poster_sys_data.frontURL + `${id}`;
        prompt("vvvvvvvvvvvvvvvvvv-Grab your URL-vvvvvvvvvvvvvvvvvv", url);
    },

    onCancelEdits   : async () => {
        ac_loading.openLoading();
        await poster_sys.reset_to_default();
        ac_loading.closeLoading();
    },

    onSaveEdits     : async () => {
        ac_loading.openLoading();
        let dat = await poster_handlers.updateData();
        
        let req     = {
            uid             : dat.uid,
            intro           : dat.intro,
            icons           : JSON.stringify(dat.icons),
            outcome         : dat.outcome,
            background      : dat.background,
            background_end  : dat.background_end,
            divisions       : dat.divisions,
            finalized       : dat.finalized,
            objectBased     : dat.objectBased,
            objScale        : dat.objScale,
            popupText       : dat.popupText,
        };

        let resp = await ac_network.post_request("interactive_poster/updatesetsone", req);
        await ac_sidebar.configSideBar(ac_sidebar.activeModule);
        ac_loading.closeLoading();
    }
}