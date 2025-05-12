import express from "express"
import multer from "multer"  //npm i multer
import fs from "fs"

const app= express()
const port = 3000

const storage=multer.diskStorage({     //파일 업로드에 대한 세팅
    destination: (req,file,cb)=>{      //cb는 변수로 받는 객체
        const uploadPath='uploads/'
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath)
        }
        cb(null,uploadPath)   //null 자리는 에러 객체 자리
    },
    //겹치지 않게 하기 위해 날짜 정보에 랜덤 숫자도 붙힘
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1e9)
        cb(null,uniqueSuffix+'-'+file.originalname)
    }
})

const upload=multer({storage})

app.post('/upload-single',upload.single('file'), (req,res)=>{
    console.log(req.file)
    res.json({
        message:"단일 파일 업로드 성공",
        file:req.file,
    })
}) //업로드할 파일 name값 'file' 작성

app.post("/upload-multiple",upload.array('files',5),(req,res)=>{
    console.log(req.files)
    res.json({
        message:'다중파일 업로드 성공',
        files:req.files
    })
})

app.listen(port,()=>{
    console.log(`${port}번으로 서버 실행 중`)
})