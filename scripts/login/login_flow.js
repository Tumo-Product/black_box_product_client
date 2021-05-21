$(function () {
    login_flow.OnStartup();
})

const login_flow = {
    error_element       : undefined,
    OnStartup           : () => {
        error_element       = document.getElementById("error_p");
    },

    OnValueChange       : () => {
        login_flow.SetErrorTextState(false);
    },

    OnLoginPress        : () => {
        let loginData = {
            email   :   "",
            pass    :   ""
        }
        loginData.email     = document.getElementById("email").value;
        loginData.pass      = document.getElementById("pass").value;
        let validation = {
            filled  : false,
            long    : false
        }
        validation.filled   = loginData.email !== "" && loginData.pass !== "";
        validation.long     = loginData.pass.length >= 4;
        login_flow.SetErrorTextState(!validation.filled || !validation.long);
    },

    SetErrorTextState   :   (state) => {
        error_element.style.display = state ? "block" : "none";
    }
}