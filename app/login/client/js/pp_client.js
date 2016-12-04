$(document).ready(function() {

    $("#pp_represcrbtn").click(function(){
       // alert("button");
			 $.post('/pp_represcr', $("#pp_represcr").serialize(),function(data) {
    })
    });

    $("#pp_reviewbtn").click(function(){
       // alert("button");
       $.post('/pp_review', $("#pp_review").serialize(),function(data){

			 })
    });



});
