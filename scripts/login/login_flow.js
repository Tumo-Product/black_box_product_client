login_flow = {
    error_element       : undefined,
    OnStartup           : () => {
        login_flow.error_element       = document.getElementById("error_p");
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
            long    : false,
            ok      : false
        }
        validation.filled   = loginData.email !== "" && loginData.pass !== "";
        validation.long     = loginData.pass.length >= 4;
        validation.ok       = validation.filled && validation.long;
        login_flow.SetErrorTextState(!validation.ok);
        if(validation.ok){ login_flow.ProcessLogin(loginData); }
    },

    ProcessLogin        :   (dat)   => {
        query = {
            _username : dat.email,
            _password : sha256(dat.pass)
        }
        LoginProcessing(query);
    },

    SetErrorTextState   :   (state) => {
        login_flow.error_element.style.display = state ? "block" : "none";
    }
}