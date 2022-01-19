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
        let id  = gallery_handlers.current_dat.uuid;
        let url = gallery_sys_data.frontURL + `${id}`;
        prompt("vvvvvvvvvvvvvvvvvv-Grab your URL-vvvvvvvvvvvvvvvvvv", url);
    },

    onCancelEdits   : async () => {
        ac_loading.openLoading();
        await gallery_sys.reset_to_default();
        ac_loading.closeLoading();
    },

    onSaveEdits     : async () => {
        ac_loading.openLoading();
        gallery_handlers.updateData();
        gallery_sys.target_set = gallery_handlers.current_dat;
        
        let defaultImages   = gallery_sys.def_set_values.images;
        let images          = gallery_handlers.current_dat.images;
        let name            = gallery_handlers.current_dat.name;

        for (let i = 0; i < defaultImages.length; i++) {
            if (images[i] === undefined) {
                let req = {
                    _uuid    : ""
                }

                req._name   = name;
                req._uuid   = gallery_handlers.current_dat.uuid;
                req._iuid   = defaultImages[i].iuid.toString();

                console.log("removing");
                let resp    = await ac_network.post_request("gallery/removeImage",    req);
            }
        }

        for (let i = 0; i < images.length; i++) {
            if (defaultImages[i] === undefined) {
                let req = {
                    _uuid    : ""
                }
                
                req._name   = name;
                req._uuid   = gallery_handlers.current_dat.uuid;
                req._index  = (i + 1).toString();
                req._img1   = images[i].img1;
                req._img2   = images[i].img2;
                req._text1  = images[i].firstText;
                req._text2  = images[i].secondText;
                images[i].iuid = (i + 1).toString();

                console.log("adding");
                let resp    = await ac_network.post_request("gallery/addimage",    req);
            }
            else if (images[i].img1 != defaultImages[i].img1 || images[i].img2 !== defaultImages[i].img2
                    || images[i].firstText !== '' || images[i].secondText) {
                let req = {
                    _uuid    : ""
                }
                console.log("updating");
                
                req._name   = name;
                req._uuid   = gallery_handlers.current_dat.uuid;
                req._iuid   = images[i].iuid.toString();
                req._img1   = images[i].img1;
                req._img2   = images[i].img2;
                req._text1  = images[i].firstText;
                req._text2  = images[i].secondText;

                let resp    = await ac_network.post_request("gallery/updateimage", req);
            }
        }

        await ac_sidebar.configSideBar(ac_sidebar.activeModule);
        gallery_sys.set_default_set(gallery_handlers.current_dat);
        ac_loading.closeLoading();
    }
}