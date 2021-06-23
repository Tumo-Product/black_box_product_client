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
        document.getElementById("smallLoadingScreen").remove();
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
    calculator_handler  : {
        temp_obj    : {},
        onSelect    : async (obj) => {
                    ac_details.show_container();
            await   ac_details.load_details();
                    ac_details.start_loading();
            await   ac_details.load_handlers("calculator");
            
            temp_obj = obj;
            let html = await dt_Handlers.calculator_handler.get_page_template();
            $("#item_container").html(html);
            ac_details.start_loading();
            await   calc_sys.handle_set_object(temp_obj);
            ac_details.stop_loading();
        }, 

        get_page_template   :   async () => {
            let data = await module_loader.loadZorgList("calc_modules");
            return data.main_skelet.data;       //Hard coded, due dt_Handlers.calculator_handel is specific for calculator tool
        }
    }
}