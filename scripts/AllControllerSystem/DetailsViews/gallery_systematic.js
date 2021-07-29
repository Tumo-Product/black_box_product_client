const gallery_sys_data = {
    frontURL        : 'https://tumo-product.github.io/smart_gallery/?_uuid=',

    onDeleteSet     : async () => {
        let secretKey = prompt("^^^^^^^^SECRET KEY^^^^^^^^", "0000");
        if(secretKey === ""){
            alert("Invalid Secret Key");
            return;
        }

        let data = {
            _key    : secretKey,
            _uuid   : gallery_handlers.current_dat.uid,
            _iuid   : gallery_handlers.current_dat.iuid
        }

        ac_loading.openLoading();
        let resp = await ac_network.post_request("gallery/removeimage", data);
        ac_details.clean_details();
        await ac_main.on_moduleSet(ac_main.mdl_index);
        ac_loading.closeLoading();
    },

    getURL          : () => {
        let id  = calc_handlers.current_dat.uid;
        let url = calc_sys_data.frontURL + `"${id}"`;
        prompt("vvvvvvvvvvvvvvvvvv-Grab your URL-vvvvvvvvvvvvvvvvvv", url);
    },

    onCancelEdits   : async () => {
        ac_loading.openLoading();
        await gallery_sys.reset_to_default();
        ac_loading.closeLoading();
    },

    onSaveEdits     : async () => {
        // ac_loading.openLoading();
        let req = {
            _uid    : "",
            _set    : {}
        }

        console.log(gallery_handlers.current_dat);
        await gallery_handlers.updateData();
        
        req._set.name   = gallery_handlers.current_dat.name;
        req._set.images = gallery_handlers.current_dat.images;

        // let resp = await ac_network.post_request("gallery/updateimage", req);
        // await ac_sidebar.configSideBar(ac_sidebar.activeModule);
        // ac_loading.closeLoading();
    }
}