const timelineNetwork = {
    update  : async () => {
        let defSet  = JSON.stringify(timelineModel.defaultSet);
        let currSet = JSON.stringify(timelineModel.currentSet);
        
        let request = { language: timelineModel.language, oldSet: defSet, newSet: currSet, name: timelineModel.currentSet.name, id: timelineModel.currentSet._id };
        console.log(request);
        return await network.post_w_token("timeline/update", request);
    },

    delete  : async (id, language) => {
        let request = { id: id, language: language };
        return await network.delete_w_token("timeline/delete", request);
    }
}