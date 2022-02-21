const timelineController = {
    onUploadPressed : (id) => {
        document.getElementById(`input_${id}`).click();
    },

    onImageUpload   : async (id) => {
        let input   = document.getElementById(`input_${id}`);
        let file    = input.files[0];

        if(file === undefined) { alert("No file."); return; }

        let fr      = new FileReader();
        let basedat = await (new Promise((resolve)=>{
            fr.readAsDataURL(file);
            fr.onloadend = () => {
                resolve(fr.result);
            }
        }));

        document.getElementById(`image_${id}`).src = basedat;
    },

    onSwitchElements: (id, dir) => { timelineController.onModifyElements(timelineModel.switchElements,  [id, id + dir]); },
    onRemoveElement : (id)      => { timelineController.onModifyElements(timelineModel.deleteElement,   [id]); },
    onAddElement    : ()        => { timelineController.onModifyElements(timelineModel.addElement,      []); },

    onModifyElements: (callback, args) => {
        timelineModel.updateData();
        callback(...args);
        timelineView.clearView();
        timelineModel.addPoints(timelineModel.currentSet.points);
    },

    onSave          : async () => {
        ac_loading.openLoading();

        timelineModel.updateData();
        let updatedSet = await timelineNetwork.update();
        updatedSet = updatedSet.updated;
        timelineModel.setCurrentSet(updatedSet);
        timelineModel.setDefaultSet(updatedSet);
        timelineView.clearView();
        timelineModel.addPoints(updatedSet.points);
        timelineView.assignName(updatedSet.name);

        ac_loading.closeLoading();
    },

    getURL          : async () => {
        prompt("Here is the link", `https://tumo-product.github.io/InteractiveTimeline/?lan=${timelineModel.language}&id=${timelineModel.currentSet._id}`)
    }
}