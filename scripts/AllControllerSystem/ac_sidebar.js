const ac_sidebar = {
    configSideBar   : (module) => {
        if (module.searchBar === true)  ac_view.showElement("searchBar");
        else                            ac_view.hideElement("searchBar");
        if (module.addButton === true)  ac_view.showElement("addButton");
        else                            ac_view.hideElement("addButton");
        ac_view.showElement("searchParent");
        if (module.getRequest !== undefined) {

        }
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