const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
// определение фильтра
const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"||
    file.mimetype === "image/svg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }
 
app.use(express.static(__dirname));
 
app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000, ()=>{console.log("Server started");});