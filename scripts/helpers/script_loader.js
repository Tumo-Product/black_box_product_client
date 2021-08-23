//Script loader, loads the script on opened page. Activation part is done on exact script side.

const script_loader = {
    loadedScripts   : [],

    loadScriptList  : async (name)      => {
        let array           = view_scripts[name + "_scripts"];
        let loadedindex     = script_loader.loadedScripts.length;
        if(script_loader.checkScriptLoad(array)) { return; }
        for(let i = 0; i < array.length; i++) {
            script_loader.loadedScripts[loadedindex + i]          = script_loader.getScriptModel(array[i]);
            script_loader.loadedScripts[loadedindex + i].element  = await script_loader.createScript(array[i].src);
            array[i].loaded = true;
        }
    },

    checkScriptLoad : (array)           => {
        let contains = false;
        for(let i = 0; i < array.length; i++){
            for(let j = 0; j < script_loader.loadedScripts.length; j++){
                if(array[i].name === script_loader.loadedScripts[j].name){
                    return true;
                }
            }
        }
        return contains;
    },

    unloadScripts   : ()                => {
        for(let i = 0; i < script_loader.loadedScripts.length; i++){
            script_loader.loadedScripts[i].element.remove();
        }
        script_loader.loadedScripts = [];
    },

    createScript    : (src)             => {
        return new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.setAttribute("src", src);
            document.body.appendChild(script);
            script.addEventListener("load", () => {
                resolve(script);
            }, false)
        })  
    },

    getScriptModel  : (element)         => {
        return {
            name    : element.name,
            src     : element.src,
            loaded  : false,
            element : null
        }
    }
};