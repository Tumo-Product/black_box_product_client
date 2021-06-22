const ac_details = {
    modules         : null,
    load_details    : async () => {
        if(!ac_details.modules){
            ac_details.modules = await module_loader.loadZorgList("details_mini");
        }
    },
    load_handlers   : async (name) => {
        await script_loader.loadScriptList(name);
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
            await ac_details.load_handlers("calculator");
            // let html = dt_Handlers.calculator_handler.generate_details(obj);
            temp_obj = obj;

            let html = await dt_Handlers.calculator_handler.generate_details(temp_obj);
            ac_details.clean_details();
            $("#item_container").html(html);

        }, 

        generate_details : async (obj) => {
            let data = await module_loader.loadZorgList("calc_modules");
            console.log(data);
            return data.main_skelet.data;
            let html = "";
            html += `<h3> Name  : <textarea rows="4" cols="50" id="name_area"> ${obj.name} </textarea></h3>`;
            html += `<h5> Intro : </h5> <textarea rows="4" cols="50"> ${obj.description} </textarea>  <br>`;
            for(let i = 0; i < obj.questions.length; i++){
                html += `<textarea rows="4" cols="50"> ${obj.questions[i].text} </textarea> `;
                for(let j = 0; j < obj.questions[i].answers.length; j++){
                    html += `<textarea rows="4" cols="50"> ${obj.questions[i].answers[j].text} </textarea>`;
                    html += `<p> Points : <input type="text" class="points" value="${obj.questions[i].answers[j].points}"> </p>`;
                }
                html += `<br>`
            }
            html += `<h5> Final : ${obj.answer} </h5>`;
            return html;
        }
    }
}