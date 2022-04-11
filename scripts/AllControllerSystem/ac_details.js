const ac_details = {
    modules         : null,
    load_details    : async () => {
        if(!ac_details.modules){
            ac_details.modules = await module_loader.loadZorgList("details_mini");
        }
    },
    load_handlers   : async (name) => {
        await script_loader.loadScriptList(name);
    },
    start_loading   : () => {
        $("#item_container").append(ac_details.modules.star_loading_md.data);
    },
    stop_loading    : () => {
        if (document.getElementById("smallLoadingScreen") !== null) {
            document.getElementById("smallLoadingScreen").remove();
        }
    },
    clean_details   : () => {
        $("#item_container").html("");
    },
    show_container  : () => {
        $("#item_container").show();
    },
    hide_container  : () => {
        $("#item_container").hide();
    }
}

const dt_Handlers = {
    poster_handler      : {
        temp_obj            : {},
        onSelect            : async (obj) => {
                    ac_details.show_container();
            await   ac_details.load_details();
                    ac_details.start_loading();
            await   ac_details.load_handlers("poster");
            temp_obj = JSON.parse(JSON.stringify(obj));
            let html = await dt_Handlers.poster_handler.get_page_template();
            $("#item_container").html(html);
            ac_details.start_loading();
            await poster_sys.set_default_set(temp_obj);
            await poster_sys.handle_set_object(temp_obj);
            ac_details.stop_loading();
        },

        clear_container     : async () => {
            $(".icons").empty();
        },

        clear_backgrounds   : async() => {
            $("#end_backgrounds .element_body").empty();
        },

        get_page_template   : async () => {
            let data = await module_loader.loadZorgList("poster_modules");
            return data.main_skelet.data;                                       //Hard coded, due dt_Handlers.gallery_handler is specific for calculator tool
        }
    },

    gallery_handler     : {
        temp_obj            : {},
        onSelect            : async (obj) => {
                    ac_details.show_container();
            await   ac_details.load_details();
                    ac_details.start_loading();
            await   ac_details.load_handlers("gallery");
            temp_obj = JSON.parse(JSON.stringify(obj));
            let html = await dt_Handlers.gallery_handler.get_page_template();
            $("#item_container").html(html);
            ac_details.start_loading();
            await gallery_sys.set_default_set(temp_obj);
            await gallery_sys.handle_set_object(temp_obj);
            ac_details.stop_loading();
        },

        clear_container     :   async () => {
            let html = await dt_Handlers.gallery_handler.get_page_template();
            $("#item_container").html(html);
            await gallery_sys.assign_name();
        },

        get_page_template   :   async () => {
            let data = await module_loader.loadZorgList("gallery_modules");
            return data.main_skelet.data;                                       //Hard coded, due dt_Handlers.gallery_handler is specific for calculator tool
        }
    },
    
    calculator_handler  : {
        temp_obj            : {},
        onSelect            : async (obj) => {
                    ac_details.show_container();
            await   ac_details.load_details();
                    ac_details.start_loading();
            await   ac_details.load_handlers("calculator");
            temp_obj = JSON.parse(JSON.stringify(obj));                         // ALERT! THIS IS ABSURD!!!! Somehow OBJ is a referance, and keeps like that
            let html = await dt_Handlers.calculator_handler.get_page_template();
            $("#item_container").html(html);
            ac_details.start_loading();
            await   calc_sys.set_default_set(temp_obj);
            await   calc_sys.handle_set_object(temp_obj);
            ac_details.stop_loading();
        },
        
        clear_container     :   async () => {
            let html = await dt_Handlers.calculator_handler.get_page_template();
            $("#item_container").html(html);
        },

        get_page_template   :   async () => {
            let data = await module_loader.loadZorgList("calc_modules");
            return data.main_skelet.data;                                       //Hard coded, due dt_Handlers.calculator_handel is specific for calculator tool
        }
    },

    timeline_handler    : {
        onSelect            : async (obj) => {
                    ac_details.show_container();
            await   ac_details.load_details();
                    ac_details.start_loading();
            await   ac_details.load_handlers("timeline");

            let objCopy = JSON.parse(JSON.stringify(obj));
                    timelineModel.setCurrentSet(obj);
                    timelineModel.setDefaultSet(objCopy);
            await   timelineModel.setup(obj);
            ac_details.stop_loading();
        }
    }
}