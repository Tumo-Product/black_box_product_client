const calc_sys_data = {
    frontURL        : 'https://tumo-product.github.io/CD_Quiz_Front/?_uid=',
    onDeleteSet     : async () => {
        let secretKey = prompt("^^^^^^^^SECRET KEY^^^^^^^^", "0000");
        if(secretKey === ""){
            alert("Invalid Secret Key");
            return;
        }
        let data = {
            _key    : secretKey,
            _uid    : calc_handlers.current_dat.uid
        }
        ac_loading.openLoading();
        let resp = await ac_network.post_request("calc/removeoneofsets", data);
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
        await calc_sys.reset_to_default();
        ac_loading.closeLoading();
    },

    onSaveEdits     : async () => {
        ac_loading.openLoading();
        let req = {
            _uid    : "",
            _set    : {}
        }
        await calc_handlers.updateData();
        //req._set = calc_handlers.current_dat;
        req._set.answer         = calc_handlers.current_dat.answer;
        req._set.answer_image   = calc_handlers.current_dat.answer_image;
        req._set.description    = calc_handlers.current_dat.description;
        req._set.name           = calc_handlers.current_dat.name;
        req._set.questions      = calc_handlers.current_dat.questions;
        req._set.uid            = calc_handlers.current_dat.uid;
        
        req._uid = calc_handlers.current_dat.uid;
        let resp = await ac_network.post_request("calc/updateset", req);
        await ac_sidebar.configSideBar(ac_sidebar.activeModule);
        ac_loading.closeLoading();
    }
}