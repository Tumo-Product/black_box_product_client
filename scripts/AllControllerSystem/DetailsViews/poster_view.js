const poster_handlers = {
    current_dat : {},

    initialize      : (dat) => {
        poster_handlers.current_dat = dat;
    },

    onUploadPressed : (id) => {
        document.getElementById(id).click();
    },
    
    onUpload        : async (i, id, type) => {
        let input   = document.getElementById(id);
        let file    = input.files[0];

        if(file === undefined) { alert("Upload an SVG!"); return; }

        let fr      = new FileReader();
        let basedat = await (new Promise((resolve)=>{
            fr.readAsDataURL(file);
            fr.onloadend = () => {
                resolve(fr.result);
            }
        }));

        if (type == "poster" || type == "background_end") {
            $(`#${type} img`).attr("src", basedat);
        } else {
            document.getElementById(`${type}_img_${i}`).src = basedat;
        }
    },

    addIcon         : async () => {
        let newIcon = poster_sys.iconTemplate;
        newIcon     = newIcon.replaceAll("^{id}", $(".icon").length);
        $(".icons").append(newIcon);
        $("#add_icon_btn").remove();
        $(".icons").append(poster_sys.add_btn);

        poster_sys.scroll_to_bottom(true);
    },

    updateData      : () => {
        
    }
}

const poster_sys = {
    target_set      : {},
    def_set_values  : {},
    iconTemplate    : "",
    add_btn         : "",

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
        if (poster_sys.target_set.background != "") {
            $("#poster img").attr("src", poster_sys.target_set.background);
        } else {
            $("#poster img").attr("src", document.location.href + "images/poster_resolution.png");
        }

        if (poster_sys.target_set.background_end != "") {
            $("#background_end img").attr("src", poster_sys.target_set.background_end);
        } else {
            $("#background_end img").attr("src", document.location.href + "images/poster_resolution.png");
        }

        let icons               = poster_sys.target_set.icons;
        let modules             = await module_loader.loadZorgList("poster_modules");
        poster_sys.add_btn      = modules.add_icon_button.data;
        poster_sys.iconTemplate = modules.icon_template.data;
        let icon                = poster_sys.iconTemplate;

        if (icons.length == 0)
        {
            icon = icon.replaceAll("^{id}", 0);
            $(".icons").append(icon);
        }
        else
        {
            for (let i = 0; i < icons.length; i++) {
                icon = icon.replaceAll("^{id}", i);
                $(".icons").append(icon);
            }
        }

        $(".icons").append(poster_sys.add_btn);
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

    scroll_to_bottom        : async (smooth) => {
        let div         = document.getElementById("scroll_content");

        if (smooth === true) {
            div.style.scrollBehavior = "smooth";
        } else if (smooth === false || smooth === undefined) {
            div.style.scrollBehavior = "auto";
        }

        div.scrollTop   = div.scrollHeight - div.clientHeight;
    }
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}