$(document).ready(function() {
	var el = document.getElementById('register_link');
	el.onclick = function() {
       // alert("button");
       document.getElementById('login-form').style.display="none" ;
       document.getElementById('register-form').style.display="block" ;

    };

    var el1 = document.getElementById('signin_link');
	el1.onclick = function() {
       // alert("button");
       document.getElementById('login-form').style.display="block" ;
       document.getElementById('register-form').style.display="none" ;

    };

    $("#login_button").click(function(){
       // alert("button");
       $.post('/login')
    });

    $("#register_button").click(function(){
       // alert("button");
       $.post('/register')
    });

});