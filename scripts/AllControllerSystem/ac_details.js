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
            // let html = dt_Handlers.calculator_handler.generate_details(obj);
            temp_obj = obj;
            let html = await dt_Handlers.calculator_handler.generate_details(temp_obj);
            ac_details.clean_details();
            $("#item_container").html(html);
            // let add_button = document.getElementById("add_question");
            // add_button.onclick = function (event){
            //     dt_Handlers.calculator_handler.add_question(html);
            // };
        }, 


        generate_details : (obj) => {
            let html = "";
            html += `<div id="head_container"> <h3 id="name"> Name :</h3><input type="text" id="name_area" value="${obj.name}"> <div id="head_buttons"><button class="head_button">Url</button> <button class="head_button">Cancel</button> <button class="head_button">Save</button></div></div>`;
            html += `<div id="description_block"> <h3 id="description"> Intro :</h3><textarea rows="4" cols="50">${obj.description}</textarea> </div><br>`;
            for(let i = 0; i < obj.questions.length; i++){
                // html += `<div id="content"> <textarea rows="4" cols="50"> ${obj.questions[i].text} </textarea> `;
                // for(let j = 0; j < obj.questions[i].answers.length; j++){
                //     html += `<textarea rows="4" cols="50"> ${obj.questions[i].answers[j].text} </textarea>`;
                //     html += `<p> Points : <input type="text" class="points" value="${obj.questions[i].answers[j].points}"> </p>`;
                // }
                // html += `<br>`
            }
            // html += `<h5> Final : ${obj.answer} </h5> </div>`;
            return html;
        }
    }
}