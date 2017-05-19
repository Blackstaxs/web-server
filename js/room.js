$(document).ready(function(){
	$.ajax({
		url:"/room/roomId",
		type:"post",
		success:function(resp){
			
			document.getElementById("status").innerHTML = "You are in room "+resp.roomId+": "+resp.roomName;
			
			initSockets(resp.roomId);
		}
	})
})


function initSockets(roomId){
	
	if (localStorage.myname != null){
		
	
	
	var socket = io();
	
	
	socket.emit("join room", roomId);
			
	document.getElementById("send").addEventListener("click", function(){
			
			
			
			var obj = {
				msg: document.getElementById("msg").value
			};
			
			
			
			socket.emit("send message", obj);
		});
			
			//
		socket.on("create message", function(obj){
			
			console.log(obj);
			
			
			var ndiv = document.createElement("div");
			
			ndiv.innerHTML = '<img src="' + localStorage.myimage + '">' + "      " + localStorage.myname +":   "+  obj.msg;
			if (localStorage.mygender == "male"){
				ndiv.style.color = 'blue';
			}
			else if (localStorage.mygender == "female"){
				ndiv.style.color = 'red';
			}
			
			document.getElementById("display").appendChild(ndiv);
			
		})
	}
	else{
		var socket = io();
	
	
	socket.emit("join room", roomId);
			
	document.getElementById("send").addEventListener("click", function(){
			
			
			
			var obj = {
				msg: document.getElementById("msg").value
			};
			
			
			
			socket.emit("send message", obj);
		});
			
			//
		socket.on("create message", function(obj){
			
			console.log(obj);
			
			
			var ndiv = document.createElement("div");
			
			ndiv.innerHTML = obj.msg;
			
			
			document.getElementById("display").appendChild(ndiv);
			
		})
	}
}