const script_loader = {
    loadedScripts   : [],

    loadScriptList  : (name)           => {
        let array   = view_scripts[name + "_scripts"];
        for(let i = 0; i < array.length; i++) {
            script_loader.loadedScripts[i]          = script_loader.getScriptModel(array[i]);
            script_loader.loadedScripts[i].element  = script_loader.createScript(
                array[i].name, array[i].src, () => {
                    array[i].loaded = true;
                });
        }
        console.log(script_loader.loadedScripts);
    },

    createScript    : (id, src, onload) => {
        let script = document.createElement("script");
        script.setAttribute("src", src);
        document.body.appendChild(script);
        if(onload !== undefined) {
            script.addEventListener("load", onload, false);
        }
        return script;
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