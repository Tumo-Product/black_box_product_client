// Module Loader handles only zorg loading part.
// .zorg files, are handling small module htmls, that must be attached to page, and removed on end 

const module_loader = {
    loadedModules      : {},

    loadZorgList       : async (name)   => {
        module_loader.loadedModules = {};
        let array   = module_zorg[name + "_module"];
        for(let i = 0; i < array.length; i++) {
            module_loader.loadedModules[array[i].name]      =       module_loader.getModuleModel(array[i]);
            module_loader.loadedModules[array[i].name].data = await module_loader.getModule(array[i].src);
        }
        return module_loader.loadedModules;
    },

    getModule       :  (src)            => {
        return $.ajax({
            'async'     : true,
            'global'    : false,
            'url'       : src,
            'dataType'  : "text"
        })
    },

    getModuleModel  : (element)         => {
        return {
            name    : element.name,
            src     : element.src,
            loaded  : false,
            data    : {}
        }
    }
};