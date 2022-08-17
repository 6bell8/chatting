const express = require("express"); //웹서버 전용
const http = require("http"); // node에 원래부터 있던 모듈
const path = require("path"); // node에 원래부터 있던 모듈 서버가 구동되는 폴더의 절대 경로를 알려주는 모듈
const app = express();
const moment = require("moment");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server); // 여기서 클라이언트로 데이터를 내려줌,,,
app.use(express.static(path.join(__dirname, "/public"))); // static(정적파일은 서비스하는 폴더를 지정)

app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");

io.on("connection", (socket) => {
  console.log("클라이언트 연결 되었습니다.");
  socket.on("chatting", (data) => {
    console.log(data);
    io.emit("yaho", "나는 클라이언트가 yaho로 보낸 이벤트를 받아서 다시 yaho로,이후 이벤트를 서버가 다시 yaho로 이벤트를 발송하는 것.");
  });
  socket.on("chatting", (data) => {
    // console.log(data);
    const sendTime = moment(new Date()).format("A hh:mm");
    io.emit("chatting", { nickName: data.nickName, msg: data.msg, time: sendTime });
  });
});

app.get("/chatting", (req, res) => {
  //res.send("chattingroom");
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
}); // dirname은 절대경로 앞에있는 경로를 바꿔줄 필요가 없음

app.get("/", (req, res) => {
  res.send("hello node");
});
server.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
