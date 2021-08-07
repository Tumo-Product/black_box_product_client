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

    removeIcon     : async (id) => {
        ac_loading.openLoading();

        dt_Handlers.poster_handler.clear_container();

        let scrValue = poster_sys.get_scroll();

        poster_handlers.current_dat.icons.splice(id, 1);
        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.addIcons();

        poster_sys.scroll_to_pos(scrValue);

        ac_loading.closeLoading();
    },

    changePosition  : async (id) => {
        posPicker = await poster_sys.popupPoster();
        
        posPicker.find("img").click(function(e) {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;

            $("#picker").css("left", x - 5).css("top", y - 5);

            $(`#icon_x_${id}`).val(x);
            $(`#icon_y_${id}`).val(y);
        });
    },

    updateData      : () => {
        let dat     = poster_handlers.current_dat;
        
        dat.intro   = document.getElementById("intro").value;
        dat.outcome = document.getElementById("outcome").value;

        dat.background      = $("#poster img").attr("src");
        dat.background_end  = $("#background_end img").attr("src");

        for (let i = 0; i < $(".icon").length; i++) {
            dat.icons[i].name = $("#icon_name_" + i).val();

            let iconSrc     = $("#icon_img_" + i).attr("src");
            let fullSrc     = $("#full_img_" + i).attr("src");
            let objSrc      = $("#obj_img_"  + i).attr("src");

            dat.icons[i].icon = iconSrc;
            dat.icons[i].full = fullSrc;
            dat.icons[i].obj  = objSrc;


        }
    }
}

const poster_sys = {
    target_set      : {},
    def_set_values  : {},
    iconTemplate    : "",
    add_btn         : "",

    set_default_set         : (obj) => {
        poster_sys.def_set_values = JSON.parse(JSON.stringify(obj));                   // ALERT! THIS IS ABSURD!!!! Somehow OBJ is a referance, and keeps like that
    },

    reset_to_default        : async () => {
        poster_sys.target_set = JSON.parse(JSON.stringify(poster_sys.def_set_values));
        await dt_Handlers.gallery_handler.clear_container();
        await poster_sys.handle_set_object(poster_sys.target_set);
    },

    handle_set_object       : async (data) => {
        poster_sys.target_set = data;
        await poster_sys.assign_name();
        await poster_sys.addIcons();
        poster_handlers.initialize(data);
    },

    popupPoster            : async (data) => {
        let modules = await module_loader.loadZorgList("poster_modules");
        let positionPicker = modules.position_picker.data;
        $("#scroll_content").prepend(positionPicker);
        let posPicker = $("#positionPicker");

        return posPicker;
    },

    removePosPicker         : () => {
        $("#positionPicker").remove();
    },

    addIcons               : async () => {
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
        return document.getElementById("scroll_content").scrollTop + 450;
    },

    scroll_to_pos           : (height, smooth) => {
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