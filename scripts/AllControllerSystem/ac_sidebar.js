const ac_sidebar        = {
    activeModule    : {},
    configSideBar   : async (module) => {
        if (module.searchBar === true)  ac_view.showElement("searchBar");
        else                            ac_view.hideElement("searchBar");
        if (module.addButton === true)  ac_view.showElement("addButton");
        else                            ac_view.hideElement("addButton");
        ac_view.showElement("searchParent");
        if (module.getRequest !== undefined) {
            await sideBar_Handlers[module.name + "_handler"].load();
        }
        sideBar_Handlers[module.name + "_handler"].draw();
        ac_sidebar.activeModule = module;
    },

    onAddPressed    : () => {
        sideBar_Handlers[ac_sidebar.activeModule.name + "_handler"].onAddButton();
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
            sideBar_Handlers.calculator_handler.c_list      = await ac_network.request_data("calc/list");
            sideBar_Handlers.calculator_handler.a_c_list    = await ac_network.request_data("calc/list");
        },
        onAddButton : async () => {
            let name = prompt("Name of new Calculator Set", "name");
            if(name != null){
                ac_loading.openLoading();
                let data = await ac_network.post_request("calc/create", {_name : name });
                await ac_sidebar.configSideBar(ac_sidebar.activeModule);
                ac_loading.closeLoading();
            }
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