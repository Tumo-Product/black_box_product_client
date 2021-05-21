// View Loader handles only grut loading part.
// .grut files, are handling complete page html, from <body> to </body> 

const view_loader = {
    loadedViews     : [],

    loadGrutList       : async (name)      => {
        view_loader.loadedViews = [];
        let array   = view_gruts[name + "_gruts"];
        for(let i = 0; i < array.length; i++) {
            view_loader.loadedViews[i]  = view_loader.getViewModel(array[i]);
            view_loader.loadedViews[i].data = await view_loader.getView(array[i].src);
        }
        return view_loader.loadedViews;         
    },

    getView         :  (src) => {
        return $.ajax({
            'async'     : true,
            'global'    : false,
            'url'       : src,
            'dataType'  : "text"
        })
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