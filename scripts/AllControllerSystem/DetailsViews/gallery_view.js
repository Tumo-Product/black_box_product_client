const gallery_handlers = {
    current_dat : {},

    initialize          : (dat) => {
        gallery_handlers.current_dat = dat;
    },

    onImgUpload         : async (id, pos) => {
        let input   = document.getElementById(`input_${id}_${pos}`);
        let file    = input.files[0];

        if(file === undefined) { alert("Upload an SVG!"); return; }

        let fr      = new FileReader();
        let basedat = await (new Promise((resolve)=>{
            fr.readAsDataURL(file);
            fr.onloadend = () => {
                resolve(fr.result);
            }
        }));

        document.getElementById(`upload_image_${id}_${pos}`).src = basedat;
    },

    onUploadPressed     : async (id, pos) => {
        await document.getElementById(`input_${id}_${pos}`).click();
    },

    onReplaceImages  : async(dir, id) => {
        let index    = id;
        let newIndex = dir === "up" ? index - 1 : index + 1;

        if (gallery_handlers.current_dat.images.length > 1) {
            if(newIndex < 0 || newIndex >= gallery_handlers.current_dat.images.length) return;
            else ac_loading.openLoading();
        } else return;

        if(newIndex < 0 || newIndex >= gallery_handlers.current_dat.images.length){
            return;
        }
        gallery_handlers.updateData();

        let scrValue = gallery_sys.get_scroll();
        let tempDat  = gallery_handlers.current_dat.images[index];
        gallery_handlers.current_dat.images[index]    = gallery_handlers.current_dat.images[newIndex];
        gallery_handlers.current_dat.images[newIndex] = tempDat;

        gallery_sys.target_set = gallery_handlers.current_dat;
        
        await dt_Handlers.gallery_handler.clear_container();
        await gallery_sys.create_elements();

        let images = gallery_handlers.current_dat.images;
        for (let i = 0; i < images.length; i++) {
            images[i].iuid = (i + 1).toString();
            console.log("running");
        }
        
        gallery_sys.target_set = gallery_handlers.current_dat;
        gallery_sys.scroll_to_pos(scrValue);
        ac_loading.closeLoading();
    },

    onRemoveImageSet    : async (id) => {
        ac_loading.openLoading();

        gallery_handlers.updateData();
        let scrValue = gallery_sys.get_scroll();

        await dt_Handlers.gallery_handler.clear_container();
        gallery_handlers.current_dat.images.splice(id, 1);
        gallery_sys.target_set = gallery_handlers.current_dat;
        
        await gallery_sys.create_elements();
        
        gallery_sys.scroll_to_pos(scrValue);
        ac_loading.closeLoading();
    },

    onAddImageSet       : async () => {
        ac_loading.openLoading();
        let defaultImage = document.location.href + "images/gallery_resolution.png";

        gallery_handlers.updateData();
        await dt_Handlers.gallery_handler.clear_container();

        gallery_handlers.current_dat.images.push( {iuid: undefined, img1: defaultImage, img2: defaultImage} );
        gallery_sys.target_set = gallery_handlers.current_dat;
        await gallery_sys.create_elements();

        gallery_sys.scroll_to_bottom();

        ac_loading.closeLoading();
    },

    updateData          : () => {
        gallery_handlers.current_dat.name = document.getElementById("name_input").value;

        for(let i = 0; i < gallery_handlers.current_dat.images.length; i++) {
            gallery_handlers.current_dat.images[i].img1 = document.getElementById(`upload_image_${i}_top`  ).src;
            gallery_handlers.current_dat.images[i].img2 = document.getElementById(`upload_image_${i}_under`).src;

            gallery_handlers.current_dat.images[i].firstText    = document.getElementById(`firstText_${i}` ).value.trim();
            gallery_handlers.current_dat.images[i].secondText   = document.getElementById(`secondText_${i}`).value.trim();
        }
    }
}

//---------------------------------vvvvvvvv--------------Front End Visuals--------------vvvvvvvv---------------------------------------

const gallery_sys = {
    target_set              : {},
    def_set_values          : {},

    set_default_set         : (obj) => {
        gallery_sys.def_set_values = JSON.parse(JSON.stringify(obj));                   // ALERT! THIS IS ABSURD!!!! Somehow OBJ is a referance, and keeps like that\
    },

    reset_to_default        : async () => {
        gallery_sys.target_set = JSON.parse(JSON.stringify(gallery_sys.def_set_values));
        await dt_Handlers.gallery_handler.clear_container();
        await gallery_sys.handle_set_object(gallery_sys.target_set);
    },

    handle_set_object       : async (data) => {
        gallery_sys.target_set = data;
        await gallery_sys.assign_name();
        await gallery_sys.create_elements();
        gallery_handlers.initialize(data);
    },

    create_elements             : async () => {
        let gallery_modules     = await module_loader.loadZorgList("gallery_modules");
        let add_button          = gallery_modules.add_button;
        let element_template    = gallery_modules.element_template;
        let length              = gallery_sys.target_set.images.length;
        let default_images      = gallery_sys.target_set.images;
        let temp_instance       = "";
        element_template        = element_template.data;

        for(let i = 0; i < length; i++){
            let img1 = default_images[i].img1, img2 = default_images[i].img2;
            let fT = default_images[i].firstText;
            let sT = default_images[i].secondText;
            
            temp_instance       = element_template;
            temp_instance       = temp_instance.replaceAll("^{id}", i);
            temp_instance       = temp_instance.replaceAll("^{sid}", i + 1);            // sid = set id.
            temp_instance       = temp_instance.replaceAll("^{top_img}",    img1);
            temp_instance       = temp_instance.replaceAll("^{under_img}",  img2);
            temp_instance       = temp_instance.replaceAll("^{fT}", fT !== undefined ? fT : "");
            temp_instance       = temp_instance.replaceAll("^{sT}", sT !== undefined ? sT : "");

            document.getElementById("elements").innerHTML += temp_instance;
        }

        document.getElementById("scroll_content").innerHTML += add_button.data;
    },

    assign_name                 : async () => {
        document.getElementById("name_input").value         = gallery_sys.target_set.name;
    },

    get_scroll                  : () => {
        return document.getElementById("scroll_content").scrollTop;
    },

    scroll_to_pos               : (height) => {
        let div         = document.getElementById("scroll_content");
        div.scrollTop   = height;
    },

    scroll_to_bottom            : () => {
        let div         = document.getElementById("scroll_content");
        div.scrollTop   = div.scrollHeight - div.clientHeight;
    }
}