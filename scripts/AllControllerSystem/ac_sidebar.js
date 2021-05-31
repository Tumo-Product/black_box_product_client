const ac_sidebar = {

    showSideBar: (text) => {
        $(function() {
            $("#settings").addClass("show");
            setTimeout(function() {
                $("#settings p").html(text);
            }, 50);
        });
    },
    hideSideBar: () => {
        $(function() {
            $("#settings p").html("");
            $("#settings").removeClass("show");
            ac_view.hideElement("searchBar");
            ac_view.hideElement("addButton");
        });
    }
}