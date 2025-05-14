/*
    웹소켓    (npm i socket.io)
    웹소켓은 웹 브라우저와 서버 사이에 지속적으로 연결을 유지하면서 
    실시간으로 데이터를 주고받을 수 있는 통신 방식 (실시간 채팅)
*/
import express from "express"
import {createServer}from "http"
import path from "path"
import {Server} from "socket.io"
import { fileURLToPath } from "url"
import fs from 'fs'

const app= express()
const server=createServer(app)
const io= new Server(server)     //양방향 가능한 웹 소켓 
// ES(.mjs)에서는 __dirname, __filename이 없음
// import.meta.url: 현재 파일의 경로
// fileURLToPath: 실제 경로를 문자열로 변환
// path.dirname: 디렉토리 이름만 추출
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const logsDir=path.join(__dirname,"logs")
if(!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

app.use(express.static(path.join(__dirname,"public")))  //정적

const users={}
const channels=['lobby','sports','programming','music']

function getLog(channel){
    const file=path.join(logsDir,`${channel}.json`)
    return fs.existsSync(file)? JSON.parse(fs.readFileSync(file)):[]
}

function logMessage(channel,message){
    const file=path.join(logsDir,`${channel}.json`)
    const log=getLog(channel)
    log.push(message)
    fs.writeFileSync(file,JSON.stringify(log,null,2))   //null=>replacer (찾아서 바꾸고 싶은걸 작성 없을 시 null), 2=> 들여쓰기
}

// on : 서버의 이벤트를 작동,  1:1로 작동
io.on("connection", (socket) => {
  socket.on("join", ({ nickname, channel }) => {
    socket.nickname = nickname;
    socket.channel = channel;
    users[socket.id] = { nickname, channel };
    socket.join(channel);
    const msg = { user: "system", text: `${nickname}님이 입장했습니다.` };
    io.to(channel).emit("message", msg);
    // console.log("nickname: ", nickname, "channel :", channel);
    const previousLog=getLog(channel)
    socket.emit('chatLog',previousLog)
    updateUserList();
  });

    socket.on("chat",({text,to})=>{
        const sender = users[socket.id]
        if(!sender) return
        const payload={user:sender.nickname,text}

        // 귓속말처리
        if(to){
            const receiverSocket=Object.entries(users).find(
                ([id,u])=>u.nickname===to)?.[0]  //[0] 소켓 id, ?. (옵셔널 체이닝): 값이 
                // undefined일 경우 에러 없이 넘어가게함 (사용자가 없을 수도 있으니 안전하게 접근)
                if(receiverSocket) {
                    io.to(receiverSocket).emit("whisper",payload)
                    socket.emit("whisper",payload)
                }
        }else{
            //io.to()만 하면 모든 사람 다  왼쪽은 채널에 있는 사람만 보내기
            io.to(sender.channel).emit("message",payload) 
            logMessage(sender.channel,payload)
 }
    })
 socket.on("changeChannel",({newChannel})=>{
    const oldChannel=socket.channel
    const nickname=socket.nickname
    socket.leave(oldChannel)
    io.to(oldChannel).emit("message",{
        user:"system",
        text:`${nickname}님이 ${newChannel}채널로 이동했습니다`
    })
    socket.chennel=newChannel
    users[socket.id].channel=newChannel
    socket.join(newChannel)

    const joinMsg={user:"system",text:`${nickname}님이 입장했습니다`}
    io.to(newChannel).emit("message",joinMsg)
    logMessage(newChannel,joinMsg)

    const previousLog=getLog(newChannel)
    socket.emit("chatLog",previousLog)

    updateUserList()
 })

//  채팅방 나가기
        socket.on("disconnect",()=>{
            const user=users[socket.id]
            if(user){
                const msg={
                    user:"system",text:`${user.nickname}님이 퇴장했습니다.`,
                }
                io.to(user.channel).emit("message",msg)
                logMessage(user.channel,msg)
                delete users[socket.id]

                updateUserList()
            }
        })

        function updateUserList(){
            const userList=Object.values(users)   //[{nickname,channel},..]
            io.emit("userList",userList)
        }
    })



server.listen(3000,()=>{
    console.log("서버 실행 중")
})