const ac_sidebar        = {
    configSideBar   : async (module) => {
        if (module.searchBar === true)  ac_view.showElement("searchBar");
        else                            ac_view.hideElement("searchBar");
        if (module.addButton === true)  ac_view.showElement("addButton");
        else                            ac_view.hideElement("addButton");
        ac_view.showElement("searchParent");
        if (module.getRequest !== undefined) {
            await sideBar_Handlers[module.name + "_handler"].load();
        }
        sideBar_Handlers.calculator_handler.draw();

    },

    showSideBar     : (text) => {
        $(function() {
            $("#settings").addClass("show");
            setTimeout(function() {
                $("#settings p").html(text);
            }, 50);
        });
    },
    hideSideBar     : () => {
        $(function() {
            $("#settings p").html("");
            $("#settings").removeClass("show");
            ac_view.hideElement("searchBar");
            ac_view.hideElement("addButton");
            ac_view.hideElement("searchParent");
        });
    }
};

const sideBar_Handlers  = {
    calculator_handler : {
        c_list      : null,
        a_c_list    : null,
        defaultHtml : "",
        load        : async () => {
            if (sideBar_Handlers.calculator_handler.defaultHtml !== ""){
                $("#searchParent").html(sideBar_Handlers.calculator_handler.defaultHtml);
            }
            sideBar_Handlers.calculator_handler.c_list      = await ac_network.request_data("quiz/list");
            sideBar_Handlers.calculator_handler.a_c_list    = await ac_network.request_data("quiz/list");
        },
        draw        : () => {
            if(sideBar_Handlers.calculator_handler.defaultHtml === ""){
                sideBar_Handlers.calculator_handler.defaultHtml =  $("#searchParent").html();
            }
            let html = "";
            let temp;
            for(let i = 0; i < sideBar_Handlers.calculator_handler.a_c_list.length; i++){
                temp = sideBar_Handlers.calculator_handler.a_c_list[i];
                html += `<div id="${i}" class="bar_names" onclick="sideBar_Handlers.calculator_handler.onElementClick(${i})"> <h3>${temp.name}</h3> </div>`;
            }
            $("#searchParent").html(html);
        },
        onElementClick  : (id)  => {
            dt_Handlers.calculator_handler.onSelect(sideBar_Handlers.calculator_handler.a_c_list[id]);
        },
    }
};