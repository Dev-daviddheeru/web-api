const http = require("http");
const app = require("./app")
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
const host = '0.0.0.0';
const server = http.createServer(app);

server.listen(port,host, err=>{
    console.log(`this app is running`)
})
// hello i am Rahul 
