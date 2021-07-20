

//---------------------------------vvvvvvvv--------------Front End Visuals--------------vvvvvvvv---------------------------------------

const gallery_sys = {
    target_set              : {},
    def_set_values          : {},

    set_default_set         : (obj) => {
        gallery_sys.def_set_values = JSON.parse(JSON.stringify(obj));                       // ALERT! THIS IS ABSURD!!!! Somehow OBJ is a referance, and keeps like that
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
       // calc_sys.target_set = data;
       // await calc_sys.assign_name();
       // await calc_sys.assign_intro();
       // await calc_sys.create_questions();
       // await calc_sys.create_add_question();
       // await calc_sys.create_answer();
       // await calc_sys.fill_question_answers();
       // await calc_sys.assign_images();
       // await calc_sys.assign_final_image();
       // calc_handlers.initialize(calc_sys.target_set);
    },

    create_elements             : async () => {
        let element_template    = (await module_loader.loadZorgList("gallery_modules")).element_template;
        element_template        = element_template.data;
        let temp_instance       = "";
        for(let i_index = 0; i_index < gallery_sys.target_set.images.length; i_index++){
            temp_instance       = element_template;
            temp_instance       = temp_instance.replaceAll("^{id}"              , i_index);
            //TODO: image on place
            document.getElementById("elements").innerHTML   += temp_instance;
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