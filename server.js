//import app
const app=require("./backend/app");
//BE server is listining on http://localhost:3000
app.listen(3000,()=>{
    console.log("Express application is listening on PORT 3000..")
});