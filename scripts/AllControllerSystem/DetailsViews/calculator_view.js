const calc_handlers = {
    current_dat         : {},
    initialize          : (dat) => {
        calc_handlers.current_dat = dat;
    },

    onAddAnswer         : (id) => {
        
    }
}

//---------------------------------vvvvvvvv--------------Front End Visuals--------------vvvvvvvv---------------------------------------
const calc_sys = {
    target_set          : {},
    handle_set_object   : async (data) => {
        calc_sys.target_set = data;
        await calc_sys.assign_name();
        await calc_sys.assign_intro();
        await calc_sys.create_questions();
        await calc_sys.create_add_question();
        await calc_sys.create_answer();
        await calc_sys.fill_question_answers();
        calc_handlers.initialize(calc_sys.target_set);
    },

    create_add_question     : async() => {
        let add_quest_template  = (await module_loader.loadZorgList("calc_modules")).q_add_button;
        add_quest_template      = add_quest_template.data;
        document.getElementById("questions").innerHTML += add_quest_template;
    },

    fill_question_answers   : async() => {
        let q_answer_template   = (await module_loader.loadZorgList("calc_modules")).q_answer_template;
        q_answer_template       = q_answer_template.data;
        let temp_instance       = "";
        for(let q_index = 0; q_index < calc_sys.target_set.questions.length; q_index++){
            for(let a_index = 0; a_index < calc_sys.target_set.questions[q_index].answers.length; a_index++){
                temp_instance   = q_answer_template
                temp_instance   = temp_instance.replaceAll("^{q_id}"            , q_index);
                temp_instance   = temp_instance.replaceAll("^{id}"              , a_index);
                temp_instance   = temp_instance.replaceAll("^{answer_value}"    , calc_sys.target_set.questions[q_index].answers[a_index].text);
                temp_instance   = temp_instance.replaceAll("^{point_value}"     , calc_sys.target_set.questions[q_index].answers[a_index].points);
                document.getElementById("container_answers_"+q_index).innerHTML += temp_instance;
            }
        }
    },

    create_answer           : async () => {
        let answer_template     = (await module_loader.loadZorgList("calc_modules")).answer_template;
        answer_template         = answer_template.data;
        answer_template         = answer_template.replaceAll("^{answer_text}"   , calc_sys.target_set.answer);
        document.getElementById("questions").innerHTML += answer_template;
    },

    create_questions        : async () => {
        let question_template   = (await module_loader.loadZorgList("calc_modules")).question_template;
        question_template       = question_template.data;
        let temp_instance       = "";
        for(let q_index = 0; q_index < calc_sys.target_set.questions.length; q_index++){
            temp_instance       = question_template;
            temp_instance       = temp_instance.replaceAll("^{id}"              , q_index);
            temp_instance       = temp_instance.replaceAll("^{question_text}"   , calc_sys.target_set.questions[q_index].text);
            document.getElementById("questions").innerHTML  += temp_instance;
        }
    },

    assign_name             : async () => {
        document.getElementById("name_input").value         = calc_sys.target_set.name;
    },

    assign_intro            : async () => {
        document.getElementById("intro_area").innerHTML     = calc_sys.target_set.description;
    }
}