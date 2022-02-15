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
    },

    languagePopup       : (languages, handlers) => {
        $("#popup_container").css("display", "flex");
        $("#popup_container").append('<div class="popup"></div>');
        
        for (let l = 0; l < languages.length; l++) {
            $(".popup").append(`<button onclick="${handlers[l]}">${languages[l]}</button>`);
        }
    },

    closeLanguagePopup  : () => {
        $("#popup_container").hide();
        $(".popup").remove();
    }
};