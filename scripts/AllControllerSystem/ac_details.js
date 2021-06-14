    const ac_details = {
    modules         : null,
    load_details    : async () => {
        if(!ac_details.modules){
            ac_details.modules = await module_loader.loadZorgList("details_mini");
        }
    },
    start_loading   : () => {
        $("#item_container").html(ac_details.modules.star_loading_md.data);
    },
    clean_details   : () => {
        $("#item_container").html("");
    },
    show_container  : () => {
        $("#item_container").show();
    },
    hide_container  : () => {
        $("#item_container").hide();
    }
}

const dt_Handlers = {
    calculator_handler  : {
        temp_obj    : {},
        
        onSelect    : async (obj) => {
            ac_details.show_container();
            await ac_details.load_details();
            ac_details.start_loading();
            temp_obj = obj;
            let html = await dt_Handlers.calculator_handler.generate_details(temp_obj);
            ac_details.clean_details();
            $("#item_container").html(html);
            dt_Handlers.calculator_handler.check_events();
        }, 

        check_events : () => {
            dt_Handlers.calculator_handler.answer_event();
            dt_Handlers.calculator_handler.question_event();
        },

        question_event : () => {
            let add_question_button = document.getElementById("add_question_button");
            let question_types = document.getElementById("question_types");
            add_question_button.addEventListener('click', event => {
                question_types.style.display = "inline-block";
                let types = document.getElementsByClassName("question_type");
                types[0].addEventListener('click', event => {
                    let questions_block = document.getElementById("content");
                    let questions_len = document.getElementsByClassName("question_block").length;
                    questions_block.innerHTML += dt_Handlers.calculator_handler.add_question(questions_len + 1, '') + `<div class="add_answer"><div class="add_answer_button"> <img class="add_answer_image" src="../../images/+.svg"> </div></div>`;
                    dt_Handlers.calculator_handler.answer_event();
                });
                // types[1].addEventListener('click', dt_Handlers.calculator_handler.add_pic_text_question(questions_block), false);
                // types[2].addEventListener('click', dt_Handlers.calculator_handler.add_picture_question(questions_block), false);
            })
            
        },

        answer_event : () => {
            let add_answer_buttons = document.getElementsByClassName("add_answer_button");
            let answers_blocks = document.getElementsByClassName("answers_block");
            for (let i = 0; i < add_answer_buttons.length; i++) {
                add_answer_buttons[i].addEventListener('click',  event => {
                    answers_blocks[i].innerHTML += dt_Handlers.calculator_handler.add_answer_and_point('','');   
                })
            }
        },
        
        // add_text_question : (question_block) => {
        //     let questions_len = document.getElementsByClassName("question_block").length;
        //     console.log(questions_len);
        //     question_block.innerHTML += dt_Handlers.calculator_handler.add_question(questions_len + 1, '');
        // },

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

        add_question : (question_number, question_text) => {
            let question = `
            <div class="question_block"> 
                <div class="question_block_icon"> 
                    <img src="../../images/=.svg"> </div> 
                <div class="question" > 

                <div class="question_header"> 
                    <h3 >Question ${question_number}</h3> 
                    <div class="load_icon"> 
                        <img class="load_image" src="../../images/arrow.svg"> 
                    </div> 
                </div>
                <textarea rows="1" cols="50" class="question_name"> ${question_text}</textarea> <br>
                <div class="answers_block">`; 
            return question;
        },

        add_answer_and_point : (text, points) => {
            let drag_item = `<div class="answer"> <div> <img src="../../images/=.svg"> </div>`;
            let answer = `<textarea rows="1" cols="50" class="answer_text"> ${text} </textarea>`;
            let point = `<p> Points : </p><input type="text" class="points" value="${points}"> <div class="right_icon"> <img src="../../images/x.svg"></div> </div>`;

            return drag_item + answer + point;
        },

        generate_details : (obj) => {
            let html = "";
            html += dt_Handlers.calculator_handler.create_header(obj.name);
            html += dt_Handlers.calculator_handler.create_description_block(obj.description);
            html += `<div id="content">`;
            for(let i = 0; i < 2/*obj.questions.length*/; i++){
                html += dt_Handlers.calculator_handler.add_question(i + 1, obj.questions[i].text);
                for(let j = 0; j < obj.questions[i].answers.length; j++){
                    html += dt_Handlers.calculator_handler.add_answer_and_point(obj.questions[i].answers[j].text, obj.questions[i].answers[j].points);
                }
                html += `</div>`;
                html += `<div class="add_answer"><div class="add_answer_button"> <img class="add_answer_image" src="../../images/+.svg"> </div></div>`;
                html += `</div></div>`;
            }
            
            html += `</div> <div id="add_question"><div id="add_question_button"> <img id="add_question_image" src="../../images/+.svg"> </div>`;
            html += `<div id="question_types" style="display:none">
                        <button class="question_type"> Text </button> 
                        <button class="question_type"> Pic&Text </button> 
                        <button class="question_type"> Pic </button>
                     </div>`;
            // html += `<h5> Final : ${obj.answer} </h5> </div>`;
            return html;
        }
    }
}