calculator_handler = {
    temp_obj    : {},
    
    generate_details : (obj) => {
        let html = "";
        let qn_id = 0;
        let an_id = 0;
        html += calculator_handler.create_header(obj.name);
        html += calculator_handler.create_description_block(obj.description);
        html += `<div id="content">`;
        for(let i = 0; i < obj.questions.length; i++){
            html += calculator_handler.add_question(i + 1, obj.questions[i].text, 'text');
            for(let j = 0; j < obj.questions[i].answers.length; j++){
                html += calculator_handler.add_answer_and_point(obj.questions[i].answers[j].text, obj.questions[i].answers[j].points, 0, an_id++);
            }
            an_id = 0;
            html += `</div>`;
            html += `<div class="add_answer"><div class="add_answer_button" onclick="calculator_handler.answer_event(0, ${qn_id++})">  <img class="add_answer_image" src="../../images/+.svg"> </div></div>`;
            html += `</div> <div class="right_icon"> <img src="../../images/x.svg"></div> </div>`;
        }
        
        html += `</div> <div id="add_question"><div id="add_question_button"> <img id="add_question_image" src="../../images/+.svg"> </div>`;
        html += `<div id="question_types" style="display:none">
                    <button class="question_type" onclick="calculator_handler.add_type_question(0)"> Text </button> 
                    <button class="question_type" onclick="calculator_handler.add_type_question(1)"> Pic&Text </button> 
                    <button class="question_type" onclick="calculator_handler.add_type_question(2)"> Pic </button>
                 </div>`;
        html += `<h5> Final : ${obj.answer} </h5> </div>`;
        return html;
    },

    create_header : (name) => {
        let header = 
            `<div id="head_container"> 
                <h3 id="name"> Name :</h3>
                <input type="text" id="name_area" value="${name}"> 

                <div id="head_buttons">
                    <button class="head_button">Url</button> 
                    <button class="head_button">Cancel</button> 
                    <button class="head_button">Save</button>
                </div>
            </div>`;

        return header;
    },

    create_description_block : (description) => {
        let description_block = 
            `<div id="description_block"> 
                <h3 id="description"> Intro :</h3>
                <textarea rows="4" cols="50" id="description_area">${description}</textarea> 
            </div> `;
        
            return description_block;
    },

    add_question : (question_number, question_text, flex_dir) => {
        let question = `    
        <div class="question_block" id="question_${dt_Handlers.calculator_handler.question_id}"> 
            <div class="question_block_icon"> 
                <img src="../../images/=.svg"> </div> 
            <div class="question" > 

            <div class="question_header"> 
                <h3 >Question ${question_number}</h3> 
                <div class="load_icon" id="question_image_${dt_Handlers.calculator_handler.question_id}"> 
                    <img class="load_image" src="../../images/arrow.svg" onclick="dt_Handlers.calculator_handler.open_load_window(${dt_Handlers.calculator_handler.question_id})"> 
                </div> 
            </div>
            <textarea rows="1" cols="50" class="question_name"> ${question_text}</textarea> <br>
            <div class="answers_block" style="flex-direction:${flex_dir}">
            `; 
        dt_Handlers.calculator_handler.question_id++;
        return question;
    },

    add_answer_and_point : (text, points, type, id, i) => {
        let answer;
        let final_block;
        let point = `<p> Points : </p><input type="text" class="points" value="${points}"> `;
        if (type == 0){
            let drag_item = `<div class="answer" id="answer_${i}_${id}"> <div> <img src="../../images/=.svg"> </div>`;
            answer = `<textarea rows="1" cols="50" class="answer_text"> ${text} </textarea>`;
            final_block =  drag_item + answer + point + `<div class="right_icon" onclick="dt_Handlers.calculator_handler.delete_answer('answer_${i}_${id}')"> <img src="../../images/x.svg"></div> </div> `;
        }
        else {
            answer = `
            <div class="pic_answer" id="answer_${i}_${id}"> 
                <div class="image_block">  
                    <div class="load_picture" onclick="dt_Handlers.calculator_handler.redraw_block(${id}, ${dt_Handlers.calculator_handler.answer_button_index}, ${type})"> 
                        <img class="load_image" src="../../images/arrow.svg"> 
                    </div> 
                </div>
            </div>
            `;
            let add_button = document.getElementById("plus_"+i);
            let copy = `<div id="plus_${dt_Handlers.calculator_handler.answer_button_index}" class="add_answer pic_button"><div class="add_answer_button" onclick="dt_Handlers.calculator_handler.answer_event(${type}, ${dt_Handlers.calculator_handler.answer_button_index})"> <img class="add_answer_image" src="../../images/+.svg"> </div></div></div>`;
            add_button.remove();
            
            answer += copy;
            final_block = answer;
        }
        
        return final_block;
    },

}