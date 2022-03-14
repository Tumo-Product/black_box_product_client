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
            _uid            : dat.uid,
            _intro          : dat.intro,
            _icons          : JSON.stringify(dat.icons),
            _outcome        : dat.outcome,
            _background     : dat.background,
            _background_end : dat.background_end
        };

        let resp = await ac_network.post_request("interactive_poster/updatesetsone", req);
        await ac_sidebar.configSideBar(ac_sidebar.activeModule);
        ac_loading.closeLoading();
    }
}