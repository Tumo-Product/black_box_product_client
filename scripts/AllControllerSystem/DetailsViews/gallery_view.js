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

    onRemoveImageSet    : (id) => {
        gallery_handlers.updateData();
        gallery_handlers.images.splice(id, 1);
        gallery_handlers.target_set = gallery_handlers.current_dat;
    },

    updateData          : () => {
        gallery_handlers.current_dat.name = document.getElementById("name_input").value;

        for(let i = 0; i < gallery_handlers.current_data.images.length; i++) {
            gallery_handlers.current_data.images[i].img1 = document.getElementById(`upload_image_${i}_top`  ).src;
            gallery_handlers.current_data.images[i].img2 = document.getElementById(`upload_image_${i}_under`).src;
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
        gallery_handlers.initialize(gallery_sys.target_set);
    },

    create_elements             : async () => {
        let element_template    = (await module_loader.loadZorgList("gallery_modules")).element_template;
        let length              = gallery_sys.target_set.images.length;
        let default_images      = gallery_sys.target_set.images;
        let temp_instance       = "";
        element_template        = element_template.data;

        for(let i = 0; i < length; i++){
            temp_instance       = element_template;
            temp_instance       = temp_instance.replaceAll("^{id}", i);
            temp_instance       = temp_instance.replaceAll("^{sid}", i + 1);            // sid = set id.
            temp_instance       = temp_instance.replaceAll("^{top_img}",    `data:image/png;base64, ${default_images[i].img1}`);
            temp_instance       = temp_instance.replaceAll("^{under_img}",  `data:image/png;base64, ${default_images[i].img2}`);

            document.getElementById("elements").innerHTML += temp_instance;
            
        }
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