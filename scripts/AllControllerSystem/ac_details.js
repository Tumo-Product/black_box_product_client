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

        answer_button_index : 1,

        question_id : 0,

        onSelect    : async (obj) => {
            ac_details.show_container();
            await ac_details.load_details();
            ac_details.start_loading();
            await script_loader.loadScriptList("calc");
            temp_obj = obj;
            let html = await calculator_handler.generate_details(temp_obj);
            ac_details.clean_details();
            $("#item_container").html(html);
            //dt_Handlers.calculator_handler.check_events();
        }, 
    }
}
/*
        check_events : () => { 
            dt_Handlers.calculator_handler.question_event();
        },

        question_event : () => { 
            let add_question_button = document.getElementById("add_question_button");
            let question_types = document.getElementById("question_types");
            add_question_button.addEventListener('click', event => {
                question_types.style.display = "inline-block";
            })
        },

        answer_event : (type, i) => {
            let answers_blocks = document.getElementsByClassName("answers_block");
            let temp = dt_Handlers.calculator_handler.add_answer_and_point('','', type, answers_blocks[i].children.length++, i);   

            answers_blocks[i].innerHTML += temp;
        },
        
        add_type_question : (type) => {
            dt_Handlers.calculator_handler.answer_button_index++;
            let question_types = document.getElementById("question_types");
            let questions_len = document.getElementsByClassName("question_block").length;
            let flex_dir = "column";
            let answer_button;
            
            if (type == 0)
                answer_button = dt_Handlers.calculator_handler.create_answer_button(type, "add_answer");

            else
            {
                answer_button = dt_Handlers.calculator_handler.create_answer_button(type, "add_answer pic_button");
                flex_dir = "row";
            }
                

            question_types.style.display = "none";
            let questions_block = document.getElementById("content");
            questions_block.innerHTML += dt_Handlers.calculator_handler.add_question(questions_len + 1, '',  flex_dir) + answer_button;

        },

        create_answer_button : (type, class_name) => {
            return `<div id="plus_${dt_Handlers.calculator_handler.answer_button_index}" class="${class_name}">
                        <div class="add_answer_button" onclick="dt_Handlers.calculator_handler.answer_event(${type}, ${dt_Handlers.calculator_handler.answer_button_index})"> 
                            <img class="add_answer_image" src="../../images/+.svg"> 
                        </div>
                    </div> </div> </div> 
                    <div class="right_icon"> <img src="../../images/x.svg"></div>`;
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

        open_load_window : (id) =>{
            let load_button = document.getElementById(`question_image_${id}`);
            let question_block = document.getElementById(`question_${id}`);
            load_button.style.display = 'none'; 
            question_block.innerHTML += `
            <div class="load_window"> 
                <div class="right_icon window_delete"> <img src="../../images/x.svg"></div>  
                <div class="load_picture" > 
                    <img class="load_image quest_image" src="../../images/arrow.svg"> 
                </div> 
            </div>`;
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

        delete_answer : (id) => {
            let answer = document.getElementById(id);
            answer.remove();
        },

        redraw_block : (a_id, q_id, type) => {
            let answers_blocks = document.getElementsByClassName("answers_block");
            answers_blocks[q_id].children[a_id - 1].innerHTML = `
                <div class="delete"> 
                    <img src="../../images/x.svg">
                </div>
                <div class="image_block">  
                    <div class="image_load_block">
                        <img style="display:none" src="../../images/enot.jpg" class="answer_image" id="pic_answer_${dt_Handlers.calculator_handler.answer_button_index}_${a_id}"></img>
                    </div>
                    <div class="reload_picture" onchange="dt_Handlers.calculator_handler.reload_image(${a_id})"> 
                        <img class="reload_image" src="../../images/arrow.svg" > 
                        <input type="file" class="reload_image input_image" id="pic_input_${dt_Handlers.calculator_handler.answer_button_index}_${a_id}">
                    </div> 
                </div>
                `; 
            
            if (type == 1)
                answers_blocks[q_id].children[a_id - 1].innerHTML += `<div class="pic_ans_inp"><input type="text" class="points pic_text" ></div>`;

            answers_blocks[q_id].children[a_id - 1].innerHTML += `<div class="pic_points"> <p> Points : </p><input type="text" class="points" value=""> </div>`;

        },

        reload_image : async (a_id) => {
            var id = `pic_input_${dt_Handlers.calculator_handler.answer_button_index}_${a_id}`;
            let info = await dt_Handlers.calculator_handler.input_to_base(id);
            let ans_image = document.getElementById(`pic_answer_${dt_Handlers.calculator_handler.answer_button_index}_${a_id}`);
            ans_image.style.display = 'flex';
            ans_image.src = info;
        },

        input_to_base : (id) => {
            if(!id) 
                return {error : "Id not found"};
            return new Promise((resolve) => {
                if (id) {
                    input = document.getElementById(id);
                    file = input.files[0];
                    fr = new FileReader();
                    fr.readAsDataURL(file);
                    fr.onloadend = () => {
                        resolve(fr.result);
                    }
                }
            })
        },

    }
}

// function enableDragSort(listClass) {
//     const sortableLists = document.getElementsByClassName(listClass);
//     console.log(sortableLists);
//     Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
// }
  
// function enableDragList(list) {
//     Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
// }
  
// function enableDragItem(item) {
//     console.log(item);
//     item.setAttribute('draggable', true)
//     item.ondrag = handleDrag;
//     item.ondragend = handleDrop;
//   }
  
//   function handleDrag(item) {
//     const selectedItem = item.target,
//           list = selectedItem.parentNode,
//           x = event.clientX,
//           y = event.clientY;
    
//     selectedItem.classList.add('drag-sort-active');
//     let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    
//     if (list === swapItem.parentNode) {
//         swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
//         list.insertBefore(selectedItem, swapItem);
//     }
//   }
  
// function handleDrop(item) {
//     item.target.classList.remove('drag-sort-active');
// }

// (()=> {enableDragSort('answers_block')})();*/