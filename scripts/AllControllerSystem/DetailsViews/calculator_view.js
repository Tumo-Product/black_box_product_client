const calc_handlers = {
    current_dat         : {},
    initialize          : (dat) => {
        calc_handlers.current_dat = dat;
    },

    onReplaceQuestions  : async(type, q_id) => {
        let index   = q_id;
        let index2  = type === "up" ? index - 1 : index + 1;
        if(index2 < 0 || index2 >= calc_handlers.current_dat.questions.length){
            return;
        }
        calc_handlers.updateData();
        let tempDat = calc_handlers.current_dat.questions[index];
        calc_handlers.current_dat.questions[index]      = calc_handlers.current_dat.questions[index2];
        calc_handlers.current_dat.questions[index2]     = tempDat;
        calc_sys.target_set = calc_handlers.current_dat;
        let scrValue = calc_sys.get_scroll();
        await dt_Handlers.calculator_handler.clear_container();
        await calc_sys.handle_set_object(calc_handlers.current_dat);
        calc_sys.scroll_to_pos(scrValue);
    },

    onReplaceAnswers    : async(type, q_id, a_id) => {
        let index   = a_id;
        let index2  = type === "up" ? index - 1 : index + 1;
        if(index2 < 0 || index2 >= calc_handlers.current_dat.questions[q_id].answers.length){
            return;
        }
        calc_handlers.updateData();
        let tempDat = calc_handlers.current_dat.questions[q_id].answers[index];
        calc_handlers.current_dat.questions[q_id].answers[index]    = calc_handlers.current_dat.questions[q_id].answers[index2];
        calc_handlers.current_dat.questions[q_id].answers[index2]   = tempDat;
        calc_sys.target_set = calc_handlers.current_dat;
        await calc_sys.update_question_answers_one(q_id);
    },

    onAddQuestion       : async() => {
        question_template = { text : "", answers : [] }
        calc_handlers.updateData();
        calc_handlers.current_dat.questions.push(question_template);
        calc_sys.target_set = calc_handlers.current_dat;
        let scrValue = calc_sys.get_scroll();
        await dt_Handlers.calculator_handler.clear_container();
        await calc_sys.handle_set_object(calc_handlers.current_dat);
        calc_sys.scroll_to_pos(scrValue);
    },

    onRemoveQuestion    : async(q_id) => {
        let scrValue = calc_sys.get_scroll();
        calc_handlers.updateData();
        calc_handlers.current_dat.questions.splice(q_id, 1);
        calc_sys.target_set = calc_handlers.current_dat;
        await dt_Handlers.calculator_handler.clear_container();
        await calc_sys.handle_set_object(calc_handlers.current_dat);
        calc_sys.scroll_to_pos(scrValue);
    },

    onRemoveAnswer      : async(q_id, a_id) => {
        calc_handlers.updateData();
        calc_handlers.current_dat.questions[q_id].answers.splice(a_id, 1);
        calc_sys.target_set = calc_handlers.current_dat;
        await calc_sys.update_question_answers_one(q_id);
    },

    onAddAnswer         : async (id) => {
        calc_handlers.updateData();
        answer_template = { text : "", points : 0 }
        calc_handlers.current_dat.questions[id].answers.push(answer_template);
        calc_sys.target_set = calc_handlers.current_dat;
        await calc_sys.update_question_answers_one(id);
    },

    updateData          : () => {           //Whole Data collection method //TODO: Image collection
        calc_handlers.current_dat.name                                                = document.getElementById("name_input").value;
        calc_handlers.current_dat.answer                                              = document.getElementById("answer_value").value;
        calc_handlers.current_dat.description                                         = document.getElementById("intro_area").value;
        for(let q_index = 0; q_index < calc_handlers.current_dat.questions.length; q_index++){
            calc_handlers.current_dat.questions[q_index].text                         = document.getElementById("question_text_"+q_index).value;
            for(let a_index = 0; a_index < calc_handlers.current_dat.questions[q_index].answers.length; a_index++){
                calc_handlers.current_dat.questions[q_index].answers[a_index].text    = document.getElementById("question_" + q_index + "_ans_"  +a_index).value;
                calc_handlers.current_dat.questions[q_index].answers[a_index].points  = document.getElementById("points_"   + q_index +   "_"    +a_index).value;
            }
        }
    }
}

//---------------------------------vvvvvvvv--------------Front End Visuals--------------vvvvvvvv---------------------------------------
const calc_sys = {
    target_set              : {},
    handle_set_object       : async (data) => {
        calc_sys.target_set = data;
        await calc_sys.assign_name();
        await calc_sys.assign_intro();
        await calc_sys.create_questions();
        await calc_sys.create_add_question();
        await calc_sys.create_answer();
        await calc_sys.fill_question_answers();
        calc_handlers.initialize(calc_sys.target_set);
    },

    create_add_question         : async() => {
        let add_quest_template  = (await module_loader.loadZorgList("calc_modules")).q_add_button;
        add_quest_template      = add_quest_template.data;
        document.getElementById("questions").innerHTML += add_quest_template;
    },

    fill_question_answers       : async() => {
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

    update_question_answers_one   : async(q_id) =>{
        let q_answer_template   = (await module_loader.loadZorgList("calc_modules")).q_answer_template;
        document.getElementById("container_answers_"+q_id).innerHTML = "";
        q_answer_template       = q_answer_template.data;
        let temp_instance       = "";
        for(let a_index = 0; a_index < calc_sys.target_set.questions[q_id].answers.length; a_index++){
            temp_instance   = q_answer_template
            temp_instance   = temp_instance.replaceAll("^{q_id}"            , q_id);
            temp_instance   = temp_instance.replaceAll("^{id}"              , a_index);
            temp_instance   = temp_instance.replaceAll("^{answer_value}"    , calc_sys.target_set.questions[q_id].answers[a_index].text);
            temp_instance   = temp_instance.replaceAll("^{point_value}"     , calc_sys.target_set.questions[q_id].answers[a_index].points);
            document.getElementById("container_answers_"+q_id).innerHTML += temp_instance;
        }
    },

    create_answer               : async () => {
        let answer_template     = (await module_loader.loadZorgList("calc_modules")).answer_template;
        answer_template         = answer_template.data;
        answer_template         = answer_template.replaceAll("^{answer_text}"   , calc_sys.target_set.answer);
        document.getElementById("questions").innerHTML += answer_template;
    },

    create_questions            : async () => {
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

    assign_name                 : async () => {
        document.getElementById("name_input").value         = calc_sys.target_set.name;
    },

    assign_intro                : async () => {
        document.getElementById("intro_area").innerHTML     = calc_sys.target_set.description;
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