const express = require("express");
const port = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");


const session = require("express-session");

var pF = path.resolve(__dirname, "public");
var app = express();


const server = require("http").createServer(app);


var io = require("socket.io")(server);

app.use("/scripts", express.static("build"));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(session({
	secret:"blackstaxs",
	resave: true,
	saveUninitialized: true
}));

var allRooms = [];

/////////////////////////////////////////////////////////////////
app.get("/profile: profileindex", function(req, resp){
	var name1 = document.getElementById("username");
	var image1 = document.getElementById("userimage");
	var gender1 = document.getElementById("usergender");
	
	console.log
	
	req.session.username1 = name1;
	req.session.userimage1 = image1;
	req.session.userimage1 = gender1;
	
	resp.sendFile(pF+"/profile.html");
})


app.post("/profileCRUD", function(req, resp){
	console.log(req.body);
	
	
	
	
	
	
	if(req.body.type == "create"){
		
		//allRooms.push(req.body.room);
		
		
		resp.send({
			status:"success",
			sessionName:req.body.nickname,
			sessionImage: req.body.image,
			sessionGender: req.body.gender,
			
		});
	} 
});
/////////////////////////////////////////////////////////

app.get("/room/:roomindex", function(req, resp){
	
	
	
	
	
	
	
	console.log(req.params.roomindex);
	var index = req.params.roomindex;
	
	
	req.session.roomId = index;
	//resp.end("You are in room "+index+". Room name"+allRooms[index]);
	resp.sendFile(pF+"/room.html");
	
});



app.post("/room/roomId", function(req, resp){
	
	
	var obj = {
		roomId: req.session.roomId,
		roomName: allRooms[req.session.roomId]
	}
	resp.send(obj);
});

app.post("/roomCRUD", function(req, resp){
	//console.log(req.body);
	
	
	
	
	
	
	if(req.body.type == "create"){
		
		allRooms.push(req.body.room);
		
		
		resp.send({
			status:"success",
			name:req.body.room,
			explain: req.body.description,
			choice: req.body.category,
			index:allRooms.length-1
		});
	} else if(req.body.type == "read"){
		resp.send({
			status:"success",
			arr:allRooms
		});
	}
});

/////changing urls

app.get("/", function(req, resp){
	resp.sendFile(pF+"/main.html");
});

app.get("/topic", function(req, resp){
	resp.sendFile(pF+"/index.html");
});

app.get("/profile", function(req, resp){
	resp.sendFile(pF+"/profile.html");
});

///////////////////////////////////////////////////////////////////

io.on("connection", function(socket){
	
	
	socket.on("join room", function(roomId){
		socket.roomId = "room"+roomId;
		socket.join(socket.roomId);
	});
	
	
	socket.on("send message", function(obj){
		
		
		
		
		io.to(socket.roomId).emit("create message", obj);
	});
	
	socket.on("disconnect", function(){
		
	});
});

server.listen(port, function(err){
	if(err){
		console.log(err);
		return false;
	}
	
	console.log(port+" is running")
});