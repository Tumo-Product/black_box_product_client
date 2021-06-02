const ac_view = {
    loaderState : true,
    toggleLoadingScreen : () => {
        if (ac_view.loaderState)    { $("#loadingScreen").hide(); }
        else                        { $("#loadingScreen").show(); }
        ac_view.loaderState = !ac_view.loaderState;
    },

    drawModulesList     : (data) => {
        for (let i = 0; i < data.length; i++) {
            ac_view.drawModule(data[i].img, i);
        }
    },

    drawModule          : (module, index) => {
        $(function() {
            $("nav").append(`<img class="side_img" onclick="ac_main.on_moduleSelect(${index})" src="${module}">`);
        });
    },

    hideElement         : (id) => {
        $(function() {
            $("#" + id).hide();
        });
    },

    showElement         : (id) => {
        $(function() {
            $("#" + id).show();
        });
    }
};