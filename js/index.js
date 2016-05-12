"use strict"

function login () {
    
    var team_name = document.getElementById("teamName").value;
    var team_pwd = document.getElementById("teamPwd").value;

    if (!team_name || !team_pwd) {
        alert("Team name and password are required!");
        return;
    }

    db_access('loginToken', 'GET', 'teamName=' + team_name + "&pwd=" + team_pwd, login_return);
}

function login_return (res) {
    res = JSON.parse(res);

    if(res.statusCode != 200) {
        alert(res.message);
    }
    else {
        storage.data.token = res.message;
        storage.save();
        window.location.href = "tabs/strategy.html";
    }
}

