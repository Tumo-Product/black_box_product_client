const timelineModel = {
    defaultSet      : {},
    currentSet      : {},
    language        : "",

    setDefaultSet   : (set) => { timelineModel.defaultSet = set; },
    setCurrentSet   : (set) => { timelineModel.currentSet = set; },

    setup           : async (set) => {
        timelineModel.language = sideBar_Handlers.timeline_handler.language;

        timelineView.modules = await module_loader.loadZorgList("timeline");
        timelineView.setupMainPage();
        timelineView.assignName(set.name);
        timelineModel.addPoints(set.points);
    },

    addPoints      : (points) => {
        let elements = "";
        for (let i = 0; i < points.length; i++) {
            let element = timelineView.modules.element.data;
            element     = element.replaceAll("^{id}",      i.toString());
            element     = element.replaceAll("^{img}",     points[i].image);
            element     = element.replaceAll("^{key}",     points[i].key);
            element     = element.replaceAll("^{text}",    points[i].text);
            elements   += element;
        }

        timelineView.fillView(elements);
        timelineView.createAddButton();
    },

    updateData      : () => {
        let points = timelineModel.currentSet.points;

        for (let i = 0; i < points.length; i++) {
            if ($(`#key_${i}`).val() === undefined) {
                points = [];
                return;
            }
            points[i].key   = $(`#key_${i}`).val();
            points[i].text  = $(`#text_${i}`).val();
            points[i].image = $(`#image_${i}`).attr("src");
            points[i].type  = "image";                      // TODO: implement type recognition.
        }

        timelineModel.currentSet.name = $("#name_input").val();
    },

    deleteElement   : (index) => {
        timelineModel.currentSet.points.splice(index, 1);
    },

    addElement      : () => {
        timelineModel.currentSet.points.push({ key: 0, type: "image", image: "", text: ""});
    },

    switchElements  : (first, second) => {
        let points  = timelineModel.currentSet.points;
        let temp    = points[first];
        points[first]   = points[second];
        points[second]  = temp;
    }
}