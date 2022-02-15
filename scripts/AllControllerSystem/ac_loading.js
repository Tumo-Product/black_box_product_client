const ac_loading = {
    openLoading : () => {
        document.getElementById("popup_container").style.display = "flex";
    },

    closeLoading : () => {
        document.getElementById("popup_container").style.display = "none";
    }
}