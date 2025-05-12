import express from 'express'
import multer from 'multer'
import sharp  from 'sharp'//npm i sharp
import fs from 'fs'
import path from 'path'
import { constants } from 'buffer'

const app= express()
const port=3000

const uploadDir= "uploads/"
const thumbDir=path.join(uploadDir,"thumb")

if(!fs.existsSync(uploadDir))fs.mkdirSync(uploadDir)
if(!fs.existsSync(thumbDir))fs.mkdirSync(thumbDir)

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
            const uniqueSuffix=Date.now()+'-'+file.originalname
            cb(null,uniqueSuffix)
        },
    })

const fileFilter=(req,file,cb)=>{
    const allowed = /jpeg|jpg|png|gif/
    const ext= path.extname(file.originalname).toLowerCase()
    const mime=file.mietype   //데이터 주고받을때 헤드에 관한 타입
    if(allowed.toLocaleString(ext)&& allowed.test(mime)){
        cb(null,true)
    }else{
        cb(new Error("이미지 파일만 업로드할 수 있습니다"))
    }
}

const upload=multer({
    storage,
    fileFilter,
    limits:{fileSize:5*1024*1024},
})

app.post("/upload-image",upload.single("image"),async(req,res)=>{
    if(!req.file) return res.status(400).json({error:"파일이 없습니다"})
    const {filename,path:filePath}=req.file

    const baseName=path.parse(filename).name   //파일 이름만 추출
    const thumbnailPngName=`thumb-${baseName}.png`
    const thumbnailPath=path.join(thumbDir,thumbnailPngName)

    const width= parseInt(req.query.width)||100
    const height= parseInt(req.query.height) ||100

    try{
        await sharp(filePath).resize(width,height).png().toFile(thumbnailPath)

        res.json({
            message:'업로드 및 PNG 썸네일 생성 성공',
            original: `/uploads${filename}`,
            thumbnail:`uploads/thumb${thumbnailPngName}`,
            size:`${width}*${height}`
        })
    }catch(err){
        console.log('썸네일 생성 실패:',err)
        res.status(500).json({error:'썸네일 생성 실패'})
    }
})

app.listen(port,()=>{
    console.log(`${port}번으로 서버 실행 중`)
})