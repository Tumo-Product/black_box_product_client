const poster_handlers = {
    current_dat : {},

    initialize  : (dat) => {
        poster_handlers.current_dat = dat;
    }

}

const poster_sys = {
    target_set      : {},
    def_set_values  : {},

    set_default_set         : (obj) => {
        poster_sys.def_set_values = JSON.parse(JSON.stringify(obj));                   // ALERT! THIS IS ABSURD!!!! Somehow OBJ is a referance, and keeps like that\
    },

    reset_to_default        : async () => {
        poster_sys.target_set = JSON.parse(JSON.stringify(poster_sys.def_set_values));
        await dt_Handlers.gallery_handler.clear_container();
        await poster_sys.handle_set_object(poster_sys.target_set);
    },

    handle_set_object       : async (data) => {
        poster_sys.target_set = data;
        await poster_sys.assign_name();
        await poster_sys.setup();
        poster_handlers.initialize(data);
    },

    setup               : async () => {
        console.log(poster_sys.target_set);
        $("#poster").attr("src", poster_sys.target_set.background);
    },

    assign_name             : async () => {
        document.getElementById("name_input").value = poster_sys.target_set.name;
    },

    get_scroll              : () => {
        return document.getElementById("scroll_content").scrollTop;
    },

    scroll_to_pos           : (height) => {
        let div         = document.getElementById("scroll_content");
        div.scrollTop   = height;
    },

    scroll_to_bottom        : () => {
        let div         = document.getElementById("scroll_content");
        div.scrollTop   = div.scrollHeight - div.clientHeight;
    }
}