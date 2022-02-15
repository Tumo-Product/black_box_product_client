const timelineView = {
    modules         : {},

    setupMainPage   : () => {
        let page = timelineView.modules.mainTemplate.data;
        $("#item_container").html(page);
    },

    assignName      : (name) => {
        $("#name_input").val(name);
    },

    fillView        : (content) => {
        $("#scroll_content").append(content);
    },

    createAddButton : () => {
        $("#scroll_content").append(timelineView.modules.addButton.data);
    },

    clearView       : () => {
        $("#scroll_content").empty();
    }
}