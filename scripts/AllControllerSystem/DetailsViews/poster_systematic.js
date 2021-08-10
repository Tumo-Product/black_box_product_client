const poster_sys_data = {
    frontURL    : 'https://tumo-product.github.io/interactive_poster/?_uid=',

    getURL      : () => {
        let id  = poster_handlers.current_dat.uid;
        let url = poster_sys_data.frontURL + `${id}`;
        prompt("vvvvvvvvvvvvvvvvvv-Grab your URL-vvvvvvvvvvvvvvvvvv", url);
    },
}