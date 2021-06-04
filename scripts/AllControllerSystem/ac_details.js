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
    calculator_handler : {
        onSelect    : async (obj) => {
            ac_details.show_container();
            await ac_details.load_details();
            ac_details.start_loading();
            let html = dt_Handlers.calculator_handler.generate_details(obj);
            ac_details.clean_details();
            $("#item_container").html(html);
        }, 

        generate_details : (obj) => {
            let html = "";
            html += `<h3> Name  : ${obj.name} </h3>`;
            html += `<h5> Intro <input type="text" value="${obj.description}"></intro> </h5>`;
            for(let i = 0; i < obj.questions.length; i++){
                html += `<p> ${obj.questions[i].text} </p>`;
                for(let j = 0; j < obj.questions[i].answers.length; j++){
                    html += `<p> ${obj.questions[i].answers[j].text} </p>`;
                    html += `<p> Points : ${obj.questions[i].answers[j].points} </p>`;
                }
                html += `<br\>`
            }
            html += `<h5> Final : ${obj.answer} </h5>`;
            return html;
        }
    }
}