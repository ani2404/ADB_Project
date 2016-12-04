$(document).ready(function() {

    $("#dp_reviewbtn").click(function(){
    //    alert("button");
			$.post('/dp_review', $("#dp_review").serialize(),function(data) {
    })
    });

    $("#dp_medicinesbtn").click(function(){
       $.get('/dp_medicines', $("#dp_medicines").serialize(),function(data){

			 })
    });
		$("#dp_represcrbtn").click(function(){
       // alert("button");
       $.get('/dp_represcr', $("#dp_represcr").serialize(),function(data){

			 })
    });
		$("#dp_wrprescrbtn").click(function(){
       // alert("button");
       $.get('/dp_wrprescr', $("#dp_wrprescr").serialize(),function(data){

			 })
    });



});
