const getBase64 = async (file) => {
    let fr      = new FileReader();
    let baseData = await (new Promise((resolve)=>{
        fr.readAsDataURL(file);
        fr.onloadend = () => {
            resolve(fr.result);
        }
    }));

    return baseData;
}

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
        baseData    = await getBase64(input.files[0]);
        if (type == "poster" || type.includes("background_end")) {
            $(`#${type} img`).attr("src", baseData);
        } else {
            document.getElementById(`${type}_img_${i}`).src = baseData;
        }
    },

    onUploadAudio   : async (id, msg) => {
        let input   = document.getElementById(`${msg}Input_${id}`);
        baseData    = await getBase64(input.files[0]);
        $(`#${msg}Audio_${id}`).attr("src", baseData);
        $(`#${msg}Msg_${id}`).addClass("enabled");
    },

    onRemoveAudio   : async (id) => {
        $(`#${id}`).removeClass("enabled");
    },
    
    addIcon         : async () => {
        ac_loading.openLoading();

        poster_handlers.updateData();

        dt_Handlers.poster_handler.clear_container();
        poster_handlers.current_dat.icons.push({ stick: undefined, full: undefined, obj: undefined, img: undefined });
        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.addIcons();
        
        poster_sys.scroll_to_bottom();
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

        const arrays = {
            background_end  : poster_handlers.current_dat.background_end.split("%{div}"),
            outcome         : poster_handlers.current_dat.outcome.split("%{div}")
        }

        for (const which in arrays) {
            let newString = "";
            let array = arrays[which];
            array.splice(id, 1);

            for (let i = 0; i < array.length; i++) {
                newString += i == array.length - 1 ? array[i] : array[i] + "%{div}";
            }

            poster_handlers.current_dat[which] = newString;
        }

        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.setupBackgrounds();
        ac_loading.closeLoading();
    },

    onReplaceBackgrounds    : async(dir, id) => {
        poster_handlers.updateData();

        let bg = {
            backgrounds: poster_handlers.current_dat.background_end.split("%{div}"),
            outcomes: poster_handlers.current_dat.outcome.split("%{div}")
        }
        let scrValue    = poster_sys.get_scroll();
        let index       = id;
        let newIndex    = dir === "up" ? index - 1 : index + 1;

        if (bg.backgrounds.length > 1) {
            if (newIndex < 0 || newIndex >= bg.outcomes.length) return;
            else ac_loading.openLoading();
        } else return;

        await dt_Handlers.poster_handler.clear_backgrounds();

        for (let name in bg) {
            let arr         = bg[name];
            
            let tempDat     = arr[index];
            arr[index]      = arr[newIndex];
            arr[newIndex]   = tempDat;
        }

        let dataFields  = { outcomes: "outcome", backgrounds: "background_end"};

        for (let field in dataFields) {
            let newString  = "";
            let arr = bg[field];
            
            for (let i = 0; i < arr.length; i++) {
                newString += i == arr.length - 1 ? arr[i] : arr[i] + "%{div}";
            }

            poster_handlers.current_dat[dataFields[field]] = newString;
        }

        poster_sys.target_set = poster_handlers.current_dat;
        await poster_sys.setupBackgrounds();
        poster_sys.scroll_to_pos(scrValue);
        ac_loading.closeLoading();
    },

    positionOffset: 8,
    changePosition   : async (id) => {
        await poster_handlers.updateData();

        if (poster_handlers.current_dat.background == poster_sys.poster_res) {
            await poster_sys.popup("Poster image not set");
            return;
        }

        posPicker = await poster_sys.popupPoster($(`#icon_x_${id}`).val(), $(`#icon_y_${id}`).val());
        posPicker.find("img").click(function(e) {
            let offset = $(this).offset();
            let x = e.pageX - offset.left - poster_handlers.positionOffset;
            let y = e.pageY - offset.top  - poster_handlers.positionOffset;

            $("#picker").css("left", x).css("top", y);
            $(`#icon_x_${id}`).val(x);
            $(`#icon_y_${id}`).val(y);
        });
    },

    updateData      : async () => {
        let dat     = poster_handlers.current_dat;
        
        dat.intro   = document.getElementById("intro").value;
        dat.background = $("#poster img").attr("src");
        poster_handlers.updateSettings(dat);

        let defImg      = poster_sys.def_images.full;
        let newString   = "";

        // Updating outcomes.
        if ($("#outcomeAudioTab .audioContainer").hasClass("enabled")) {
            dat.outcome = $("#bgAudio").attr("src");
        } else {
            dat.outcome = "";
        }

        // Updating end backgrounds.
        $(`.bg img`).each(function(i) {
            let val = $(this).attr("src")
            if (val == undefined) val = $(this).val();
            newString += i == $(".bg").length - 1 ? val : val + "%{div}";
        });

        if (newString.includes(defImg)) {
            newString = "";
        }
        dat.background_end = newString;

        // Updating icons.
        for (let i = 0; i < $(".icon").length; i++) {
            if (dat.icons[i] == undefined) dat.icons[i] = {};
            dat.icons[i].name = i.toString();
            
            let xVal    = parseInt($("#icon_x_" + i).val());
            let yVal    = parseInt($("#icon_y_" + i).val());

            let messages = { correct: $(`#correctAudio_${i}`).attr("src"), wrong: $(`#wrongAudio${i}`).attr("src") }
            if (!$(`#correctMsg_${i}`).hasClass("enabled")) { messages.correct = undefined; }
            if (!$(`#wrongMsg_${i}`).hasClass("enabled")) { messages.wrong = undefined; }

            if (xVal > -1 && yVal > -1) {
                dat.icons[i].stick = { x: xVal, y: yVal, correctMsg: messages.correct, wrongMsg: messages.wrong };
            }

            if (messages.correct === undefined && messages.wrong !== undefined) {
                dat.icons[i].wrongMsg = messages.wrong;
            }

            let fullSrc         = $("#full_img_" + i).attr("src");
            let iconSrc         = $("#icon_img_" + i).attr("src");
            dat.icons[i].img    = iconSrc == poster_sys.def_images.icon ? undefined : iconSrc;
            dat.icons[i].obj    = $("#obj_img_"  + i).attr("src");
            dat.icons[i].full   = fullSrc == defImg ? undefined : fullSrc;
        }

        poster_sys.target_set = dat;
        return dat;
    },

    updateSettings: (dat) => {
        dat.finalized   = $("#isFinalized").prop("checked") ? true : undefined;
        dat.objectBased = $("#objectBased").prop("checked") ? true : undefined;
        dat.divisions   = $("#divisionsAvailable").prop("checked") ? $("#divisions").val() : undefined;
        if (parseInt(dat.divisions) === NaN) dat.divisions = undefined;

        let popupText   = $("#popupTextarea").val().trim()
        dat.popupText   = popupText === "" ? undefined : popupText;
    },

    toggleVoice         : async (index) => {
        if ($(`#icon_${index} .voiceSwitch`).hasClass("enabled")) {
            poster_handlers.disableVoice(`#icon_${index}`, ["voiceSwitch", "voiceTab"]);
        } else {
            poster_handlers.enableVoice(`#icon_${index}`, ["voiceSwitch", "voiceTab"]);
        }
    },

    onBgAudioUpload     : async (source) => {
        let src;

        if (source !== undefined) {
            src = source;
        } else {
            let input = document.getElementById("outcomeAudioInput");
            src = await getBase64(input.files[0]);
        }

        $("#bgAudio").attr("src", src);
        $("#outcomeAudioTab .audioContainer").addClass("enabled");
        $("#outcomeAudioInput").val("");
    },

    onRemoveBgAudio     : () => {
        $("#outcomeAudioTab .audioContainer").removeClass("enabled");
    },

    enableVoice         : async (which, classes) => {
        for (const cls of classes) {
            $(`${which} .${cls}`).addClass("enabled");
        }
    },

    disableVoice        : async (which, classes) => {
        for (const cls of classes) {
            $(`${which} .${cls}`).removeClass("enabled");
        }
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
        poster_sys.def_set_values = JSON.parse(JSON.stringify(obj));
    },

    reset_to_default    : async () => {
        poster_sys.target_set = JSON.parse(JSON.stringify(poster_sys.def_set_values));
        await dt_Handlers.poster_handler.clear_backgrounds();
        await dt_Handlers.poster_handler.clear_container();
        await poster_sys.handle_set_object(poster_sys.target_set);
    },

    handle_set_object   : async (data) => {
        poster_sys.target_set = data;
        await poster_sys.handleSettings();
        await poster_sys.assign_name();
        await poster_sys.setupBackgrounds();
        await poster_sys.addIcons();
        poster_handlers.initialize(data);
    },

    popup               : async (msg) => {
        ac_loading.openLoading();
        $(".sml_loader").hide();

        let modules = await module_loader.loadZorgList("poster_modules");
        let popup   = modules.popup.data;
        popup       = popup.replaceAll("^{txt}", msg);
        $("#popup_container").append(popup);

        await timeout(3000);
        $(".sml_loader").show();
        $("#popup").remove();
        ac_loading.closeLoading();
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

    handleSettings    : async () => {
        $("#isFinalized").prop("checked", poster_sys.target_set.finalized);
        
        let divisionsAvailable = parseInt(poster_sys.target_set.divisions) !== NaN;
        $("#divisionsAvailable").prop("checked", divisionsAvailable);
        if (divisionsAvailable) {
            $("#divisions").val(poster_sys.target_set.divisions);
        }

        $("#objectBased").prop("checked", poster_sys.target_set.objectBased);
        $("#popupTextarea").val(poster_sys.target_set.popupText);
    },

    addIcons            : async () => {
        let icons        = poster_sys.target_set.icons;
        let modules      = await module_loader.loadZorgList("poster_modules");
        let add_btn      = modules.add_icon_button.data;
        let iconTemplate = modules.icon_template.data;

        let allMessages = [];

        for (let i = 0; i < icons.length; i++) {
            let icon = iconTemplate;
            icon = icon.replaceAll("^{id}",   i);
            icon = icon.replaceAll("^{name}", icons[i].name     !== undefined ? icons[i].name     : "Name");
            icon = icon.replaceAll("^{xval}", icons[i].stick    !== undefined ? icons[i].stick.x  : -1);
            icon = icon.replaceAll("^{yval}", icons[i].stick    !== undefined ? icons[i].stick.y  : -1);

            let messages = { correct: undefined, wrong: undefined}

            if (icons[i].stick !== undefined) {
                messages.correct    = icons[i].stick.correctMsg;
                messages.wrong      = icons[i].stick.wrongMsg;
            } else {
                messages.wrong      = icons[i].wrongMsg;
            }

            allMessages[i] = messages;

            let imgTypes = ["full", "obj"];
            for (let type of imgTypes) {
                let condition = icons[i][type] === undefined || icons[i].obj === "";
                icon = icon.replaceAll(`^{${type}Img}`, condition ? poster_sys.def_images[type] : icons[i][type]);
            }
            icon = icon.replaceAll("^{iconImg}", icons[i].img === undefined || icons[i].img == "" ? poster_sys.def_images.icon : icons[i].img);

            $(".icons").append(icon);
        }

        for (let i = 0; i < allMessages.length; i++) {
            let messages = allMessages[i];

            for (let msg in messages) {
                if (messages[msg] !== undefined) {
                    poster_handlers.enableVoice(`#icon_${i}`, ["voiceSwitch", "voiceTab"]);
                    $(`#${msg}Msg_${i}`).addClass("enabled");
                    $(`#${msg}Audio_${i}`).attr("src", messages[msg]);
                }
            }
        }

        $(".icons").append(add_btn);
    },

    setupBackgrounds    : async() => {
        let modules     = await module_loader.loadZorgList("poster_modules");
        let add_btn     = modules.add_bg_button.data;
        let bgTemplate  = modules.background_end_template.data;

        let bg = poster_sys.target_set.background;
        $("#poster img").attr("src", bg !== "" ? bg : poster_sys.poster_res);

        let backgrounds = poster_sys.target_set.background_end.split("%{div}");
        let outcomes    = poster_sys.target_set.outcome.split("%{div}");

        for (let i = 0; i < backgrounds.length; i++) {
            let bg = bgTemplate;

            bg = bg.replaceAll("^{id}", i);
            $("#end_backgrounds").append(bg);
            $(`#background_end_${i} .bgImage`).attr("src", backgrounds[i] !== "" ? backgrounds[i] : poster_sys.poster_res);
        }

        for (let i = 0; i < outcomes.length; i++) {
            if (outcomes[i] != "") {
                $(`#background_end_${i} textarea`).val(outcomes[i]);
                if (outcomes[i].includes("https://content-tools.tumo.world/")) {
                    poster_handlers.onBgAudioUpload(outcomes[i]);
                }
            }
        }

        $("#end_backgrounds").append(add_btn);
    },

    assign_name         : async () => {
        document.getElementById("name_input").value = poster_sys.target_set.name;
        document.getElementById("intro").value = poster_sys.target_set.intro;
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
        div.style.scrollBehavior = smooth ? "smooth" : "auto";
        div.scrollTop   = div.scrollHeight - div.clientHeight;
    }
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}