$(document).ready(function(){
	console.log("jquery is ready!");
	
	document.getElementById("view").addEventListener("click", function(){
		$.ajax({
			url:"/roomCRUD",
			type:"post",
			data:{
				type: "read"
			},
			success:function(resp){
				
				if(resp.status == "success"){
					var rooms = resp.arr;
					for(var i = 0; i < rooms.length; i++){
						var ndiv = document.createElement("div");
						ndiv.innerHTML = rooms[i];
						ndiv.style.backgroundColor = "#ADF";
						ndiv.style.padding = "5px";
						ndiv.style.margin = "5px";
						document.body.appendChild(ndiv);
						
						
						ndiv.myindex = i;
						ndiv.addEventListener("click", function(){
							
							location.href = "/room/"+this.myindex;
						});
					}
				}
			}
		});
	});
	
	document.getElementById("create").addEventListener("click", function(){
		$.ajax({
			url:"/roomCRUD",
			type:"post",
			data:{
				room: document.getElementById("room").value,
				description: document.getElementById("description").value,
				category: document.getElementById("category").value,
				type: "create"
			},
			success:function(resp){
				console.log(resp);
				
				if(resp.status == "success"){
					
					var ndiv = document.createElement("div");
					ndiv.innerHTML = '<b>' + "<h2>"+resp.name+"</h2>" + '</b>'+ "<br />"+ resp.explain + "<br />" + "<u>"+ resp.choice +"</u>";
					//ndiv.style.backgroundColor = "#ADF";
					if (document.getElementById("category").value == "help"){
						ndiv.style.backgroundImage = "url('http://www.fitzroviait.com/wp-content/uploads/2016/07/Help-the-Logo-250x153.png')";
					}
					else if (document.getElementById("category").value == "question"){
						ndiv.style.backgroundImage = "url('http://www.word-game-world.com/images/green-yellow-question-mark.png')";
					}
					else if (document.getElementById("category").value == "opinion"){
						ndiv.style.backgroundImage = "url('http://i1.kym-cdn.com/photos/images/newsfeed/000/661/223/1d5.jpg')";
					}
					else if (document.getElementById("category").value == null){
						
					}
					ndiv.style.padding = "5px";
					ndiv.style.margin = "5px";
					document.body.appendChild(ndiv);
					
					
					ndiv.myindex = resp.index;
					ndiv.addEventListener("click", function(){
							
							location.href = "/room/"+this.myindex;
						});
					}
				}
		});
	});
	
	
	document.getElementById("back").addEventListener("click", function(){
		
		
		location.replace("/");
		
	});
	
});