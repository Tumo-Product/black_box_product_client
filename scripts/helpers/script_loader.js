//Script loader, loads the script on opened page. Activation part is done on exact script side.

const script_loader = {
    loadedScripts   : [],

    loadScriptList  : async (name)      => {
        let array   = view_scripts[name + "_scripts"];
        for(let i = 0; i < array.length; i++) {
            script_loader.loadedScripts[i]          = script_loader.getScriptModel(array[i]);
            script_loader.loadedScripts[i].element  = await script_loader.createScript(array[i].src);
            array[i].loaded = true;
        }
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