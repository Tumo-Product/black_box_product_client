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

        if (type == "poster" || type.includes("background_end")) {
            $(`#${type} img`).attr("src", basedat);
        } else {
            document.getElementById(`${type}_img_${i}`).src = basedat;
        }
    },
    
    addIcon         : async () => {
        ac_loading.openLoading();

        poster_handlers.updateData();

        dt_Handlers.poster_handler.clear_container();
        poster_handlers.current_dat.icons.push({stick: undefined, full: undefined, obj: undefined, img: undefined});
        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.addIcons();
        
        poster_sys.scroll_to_bottom(true);
        ac_loading.closeLoading();
    },

    removeIcon      : async (id) => {
        ac_loading.openLoading();

        poster_handlers.updateData();
        let scrValue = poster_sys.get_scroll();

        dt_Handlers.poster_handler.clear_container();
        poster_handlers.current_dat.icons.splice(id, 1);
        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.addIcons();

        poster_sys.scroll_to_pos(scrValue);

        ac_loading.closeLoading();
    },

    addEndBg      : async () => {
        ac_loading.openLoading();

        poster_handlers.updateData();
        let scrValue = poster_sys.get_scroll();

        dt_Handlers.poster_handler.clear_backgrounds();
        poster_handlers.current_dat.background_end += "%{div}";
        poster_handlers.current_dat.outcome        += "%{div}";
        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.setupBackgrounds();

        poster_sys.scroll_to_pos(scrValue);

        ac_loading.closeLoading();
    },

    removeEndBackground : async(id) => {
        ac_loading.openLoading();

        poster_handlers.updateData();
        dt_Handlers.poster_handler.clear_backgrounds();

        let bgArray     = poster_handlers.current_dat.background_end.split("%{div}");
        let newString   = "";
        bgArray.splice(id, 1);

        for (let i = 0; i < bgArray.length; i++) {
            if (i == bgArray.length - 1) newString += bgArray[i];
            else                         newString += bgArray[i] + "%{div}";
        }

        poster_handlers.current_dat.background_end = newString;

        newString = "";
        let outcomeArray = poster_handlers.current_dat.outcome.split("%{div}");
        outcomeArray.splice(id, 1);

        for (let i = 0; i < outcomeArray.length; i++) {
            if (i == outcomeArray.length - 1) newString += outcomeArray[i];
            else                              newString += outcomeArray[i] + "%{div}";
        }

        poster_handlers.current_dat.outcome = newString;
        poster_sys.target_set = poster_handlers.current_dat;

        await poster_sys.setupBackgrounds();

        ac_loading.closeLoading();
    },

    onReplaceBackgrounds    : async(dir, id) => {
        poster_handlers.updateData();

        let backgrounds = poster_handlers.current_dat.background_end.split("%{div}");
        let outcomes    = poster_handlers.current_dat.outcome.split("%{div}");
        let scrValue    = poster_sys.get_scroll();
        let index       = id;
        let newIndex    = dir === "up" ? index - 1 : index + 1;

        if (backgrounds.length > 1) {
            if(newIndex < 0 || newIndex >= outcomes.length) return;
            else ac_loading.openLoading();
        } else return;

        await dt_Handlers.poster_handler.clear_backgrounds();

        let tempDat         = outcomes[index];
        outcomes[index]     = outcomes[newIndex];
        outcomes[newIndex]  = tempDat;

        tempDat                 = backgrounds[index];
        backgrounds[index]      = backgrounds[newIndex];
        backgrounds[newIndex]   = tempDat;

        let newString   = "";

        for (let i = 0; i < backgrounds.length; i++) {
            if (i == backgrounds.length - 1)
                newString += backgrounds[i];
            else
                newString += backgrounds[i] + "%{div}";
        }

        poster_handlers.current_dat.background_end = newString;
        newString = "";

        for (let i = 0; i < outcomes.length; i++) {
            if (i == outcomes.length - 1)
                newString += outcomes[i];
            else
                newString += outcomes[i] + "%{div}";
        }

        poster_handlers.current_dat.outcome = newString;

        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.setupBackgrounds();
        poster_sys.scroll_to_pos(scrValue);

        ac_loading.closeLoading();
    },

    changePosition   : async (id) => {
        let msg = await poster_handlers.updateData();

        if (poster_handlers.current_dat.background == poster_sys.poster_res) {
            ac_loading.openLoading();
            await poster_sys.popup("Poster image not set");
            ac_loading.closeLoading();
            return;
        }

        posPicker = await poster_sys.popupPoster($(`#icon_x_${id}`).val(), $(`#icon_y_${id}`).val());
        
        posPicker.find("img").click(function(e) {
            let offset = $(this).offset();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;

            $("#picker").css("left", x - 8).css("top", y - 8);

            $(`#icon_x_${id}`).val(x);
            $(`#icon_y_${id}`).val(y);
        });
    },

    updateData      : async () => {
        let msg     = "";
        let dat     = poster_handlers.current_dat;
        
        dat.intro   = document.getElementById("intro").value;

        dat.background = $("#poster img").attr("src");
        if (dat.background == poster_sys.poster_res)
            msg = "Not all backgrounds are set";

        let newString = "";

        $(".bg img").each(function(i) {
            if ($(this).attr("src") == poster_sys.poster_res)
                msg = "Not all backgrounds are set";

            if (i == $(".bg").length - 1)
                newString += $(this).attr("src");
            else
                newString += $(this).attr("src") + "%{div}";
        });

        dat.background_end  = newString;
        newString = "";

        $(".bg textarea").each(function(i) {
            if (i == $(".bg").length - 1)
                newString += $(this).val();
            else
                newString += $(this).val() + "%{div}";
        });

        dat.outcome         = newString;
        
        for (let i = 0; i < $(".icon").length; i++) {
            if (dat.icons[i] == undefined) dat.icons[i] = {};

            dat.icons[i].name = i.toString();

            let iconSrc = $("#icon_img_" + i).attr("src");
            let fullSrc = $("#full_img_" + i).attr("src");
            let objSrc  = $("#obj_img_"  + i).attr("src");
            
            let xVal    = parseInt($("#icon_x_" + i).val());
            let yVal    = parseInt($("#icon_y_" + i).val());

            if (xVal < 0 || yVal < 0 || !fullSrc.includes("png")) {
                dat.icons[i].stick = undefined;
            } else {
                dat.icons[i].stick = {x: xVal, y: yVal};
            }

            if (fullSrc == poster_sys.def_images.full) {
                dat.icons[i].full = undefined;
            }
            else {
                dat.icons[i].full = fullSrc;
            }

            if (dat.icons[i].full === undefined || dat.icons[i].stick === undefined) {
                dat.icons[i].stick  = undefined;
                dat.icons[i].full   = undefined;
            }

            dat.icons[i].img    = iconSrc;
            dat.icons[i].obj    = objSrc;

            if (!objSrc.includes("png") || !iconSrc.includes("svg")) {
                msg = "Not all icons and object images are uploaded";
            }
        }

        if ($(".icon").length == 0) {
            msg = "Poster needs at least one icon";
        }

        poster_sys.target_set   = dat;
        return msg;
    }
}

const poster_sys = {
    target_set      : {},
    def_set_values  : {},
    poster_res      : document.location.href + "images/poster_resolution.png",

    def_images      : {
        full : window.location.href + "images/poster_resolution.png",
        obj  : window.location.href + "images/obj_img.png",
        icon : window.location.href + "images/icon_img.png"
    },

    set_default_set         : (obj) => {
        poster_sys.def_set_values = JSON.parse(JSON.stringify(obj));                   // ALERT! THIS IS ABSURD!!!! Somehow OBJ is a referance, and keeps like that
    },

    reset_to_default    : async () => {
        poster_sys.target_set = JSON.parse(JSON.stringify(poster_sys.def_set_values));
        await dt_Handlers.poster_handler.clear_backgrounds();
        await dt_Handlers.poster_handler.clear_container();
        await poster_sys.handle_set_object(poster_sys.target_set);
    },

    handle_set_object   : async (data) => {
        poster_sys.target_set = data;
        await poster_sys.assign_name();
        await poster_sys.setupBackgrounds();
        await poster_sys.addIcons();
        poster_handlers.initialize(data);
    },

    popup               : async (msg) => {
        $(".sml_loader").hide();

        let modules = await module_loader.loadZorgList("poster_modules");
        let popup   = modules.popup.data;
        popup       = popup.replaceAll("^{txt}", msg);
        $("#popup_container").append(popup);

        await timeout(3000);
        $(".sml_loader").show();
        $("#popup").remove();
    },

    popupPoster         : async (x, y) => {
        let modules         = await module_loader.loadZorgList("poster_modules");
        let positionPicker  = modules.position_picker.data;
        positionPicker      = positionPicker.replaceAll("^{poster}", poster_sys.target_set.background);
        $("#scroll_content").prepend(positionPicker);
        let posPicker       = $("#positionPicker");

        $("#picker").css("left", x + "px").css("top", y + "px");

        return posPicker;
    },

    removePosPicker     : () => {
        $("#positionPicker").remove();
    },

    addIcons            : async () => {
        let icons        = poster_sys.target_set.icons;
        let modules      = await module_loader.loadZorgList("poster_modules");
        let add_btn      = modules.add_icon_button.data;
        let iconTemplate = modules.icon_template.data;

        for (let i = 0; i < icons.length; i++) {
            let icon            = iconTemplate;

            icon = icon.replaceAll("^{id}",   i);
            if (icons[i].name  != undefined)
                icon = icon.replaceAll("^{name}", icons[i].name);
            else
                icon = icon.replaceAll("^{name}", "Name");

            if (icons[i].stick != undefined) {
                icon = icon.replaceAll("^{xval}", icons[i].stick.x);
                icon = icon.replaceAll("^{yval}", icons[i].stick.y);
            } else {
                icon = icon.replaceAll("^{xval}", -1);
                icon = icon.replaceAll("^{yval}", -1);
            }

            if (icons[i].full === undefined) {
                icon = icon.replaceAll("^{fullImg}", poster_sys.def_images.full);
            } else {
                icon = icon.replaceAll("^{fullImg}", icons[i].full);
            }
            if (icons[i].obj  === undefined || icons[i].obj  == "") {
                icon = icon.replaceAll("^{objImg}",  poster_sys.def_images.obj);
            } else {
                icon = icon.replaceAll("^{objImg}",  icons[i].obj);
            }
            if (icons[i].img === undefined || icons[i].img == "") {
                icon = icon.replaceAll("^{iconImg}", poster_sys.def_images.icon);
            } else {
                icon = icon.replaceAll("^{iconImg}", icons[i].img);
            }
            
            $(".icons").append(icon);
        }

        $(".icons").append(add_btn);
    },

    setupBackgrounds    : async() => {
        let modules     = await module_loader.loadZorgList("poster_modules");
        let add_btn     = modules.add_bg_button.data;
        let bgTemplate  = modules.background_end_template.data;

        if (poster_sys.target_set.background != "") {
            $("#poster img").attr("src", poster_sys.target_set.background);
        } else {
            $("#poster img").attr("src", poster_sys.poster_res);
        }

        let backgrounds = poster_sys.target_set.background_end.split("%{div}");
        let outcomes    = poster_sys.target_set.outcome.split("%{div}");

        for (let i = 0; i < backgrounds.length; i++) {
            let bg  = bgTemplate;

            bg      = bg.replaceAll("^{id}", i);
            $("#end_backgrounds").append(bg);

            if (backgrounds[i] != "")
                $(`#background_end_${i} img`).attr("src", backgrounds[i]);
            else
                $(`#background_end_${i} img`).attr("src", poster_sys.poster_res);
        }

        for (let i = 0; i < outcomes.length; i++) {
            if (outcomes[i] != "")
                $(`#background_end_${i} textarea`).val(outcomes[i]);
        }

        $("#end_backgrounds").append(add_btn);
    },

    assign_name         : async () => {
        document.getElementById("name_input").value = poster_sys.target_set.name;
    },

    get_scroll          : () => {
        return document.getElementById("scroll_content").scrollTop + 450;
    },

    scroll_to_pos       : (height) => {
        let div         = document.getElementById("scroll_content");
        div.scrollTop   = height;
    },

    scroll_to_bottom    : async (smooth) => {
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