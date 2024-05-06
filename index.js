//var btnSign_  =  document.getElementById('btnSign');
var txtUsername_ = document.getElementById("txtUsername");
var txtPassword_ = document.getElementById("txtPassword");
function btnSignin() {
    if(txtUsername_.value == "teamanuada@email.com" && txtPassword_.value == "teamanuada"){
        txtUsername_.style.border = "1px solid green";
        txtPassword_.style.border = "1px solid green";
        location.href = "mainpage.html";
        localStorage.setItem("teamanuada@email.com", "teamanuada");
    }

    txtUsername_.style.border = "1px solid green";
    txtPassword_.style.border = "1px solid green";

    if (txtUsername_.value != "teamanuada@email.com"){
        txtUsername_.style.border = "1px solid red";
    }
    if (txtPassword_.value != "teamanuada"){
        txtPassword_.style.border = "1px solid red";
    }
}
