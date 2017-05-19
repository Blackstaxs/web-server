$(document).ready(function(){
	console.log("main is ready");
	
	document.getElementById("topic").addEventListener("click", function(){
		
		location.replace("/topic");
		
	});
	
	document.getElementById("profile").addEventListener("click", function(){
		
		location.replace("/profile");
		
	});
	
});