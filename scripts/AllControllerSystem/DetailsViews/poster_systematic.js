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
        
        await poster_handlers.updateData();
        
        let req = {};

        req._uid            = poster_handlers.current_dat.uid;
        req._intro          = poster_handlers.current_dat.intro;
        req._icons          = poster_handlers.current_dat.icons;
        req._outcome        = poster_handlers.current_dat.outcome;
        req._background     = poster_handlers.current_dat.backgroud;
        req._background_end = poster_handlers.current_dat.background_end;

        let resp = await ac_network.post_request("interactive_poster/updatesetone", req);

        await ac_sidebar.configSideBar(ac_sidebar.activeModule);
        ac_loading.closeLoading();
    }
}