$(document).ready(function(){
	console.log("main is ready");
	
	document.getElementById("back").addEventListener("click", function(){
		
		location.replace("/");
		
	});
	
	
	document.getElementById("save").addEventListener("click", function(){
		
		$.ajax({
			url:"/profileCRUD",
			type:"post",
			data:{
				nickname: document.getElementById("username").value,
				image: document.getElementById("userimage").value,
				gender: document.getElementById("usergender").value,
		
				type: "create"
			},
			success:function(resp){
				console.log(resp);
				
				if(resp.status == "success"){
					
					var ndiv = document.createElement("div");
					var newpic = document.createElement("img");
					ndiv.innerHTML = '<b>' + "<h2>"+"Your username for this session is: "+ "<br />"+resp.sessionName+"</h2>" + '</b>'+ "<br />"+ "and you profile picture is: "+ "<br />";
					//ndiv.style.backgroundColor = "#ADF";
					newpic.src = resp.sessionImage;
					ndiv.style.padding = "5px";
					ndiv.style.margin = "5px";
					document.body.appendChild(ndiv);
					document.body.appendChild(newpic);
					
					localStorage.myname = resp.sessionName;
					localStorage.myimage = resp.sessionImage;
					localStorage.mygender = resp.sessionGender;
				
					
					}
				}
		});

	
});
	});