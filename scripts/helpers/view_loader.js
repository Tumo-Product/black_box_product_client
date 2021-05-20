const view_loader = {
    loadedViews     : [],
    
    loadGrutList    : (name)            => {
        let array   = view_gruts[name + "_gruts"];
        for(let i = 0; i < array.length; i++){
            view_loader.loadedViews[i]      = view_loader.getViewModel(array[i]);
            view_loader.createView(
                array[i].name, array[i].src, (resp) => {
                    array[i].data   = resp.text;
                    array[i].loaded = true;
                });
        }
    },

    createView      : (id, src, onload) => {
        fetch(src).then((resp) => {
            console.log(resp.text());
            onload(resp);
        });
    },

    getViewModel    : (element)         => {
        return {
            name    : element.name,
            src     : element.src,
            loaded  : false,
            data    : {}
        }
    }
};