const http = require('http');
const OS = require('os')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length
var child_process = require('child_process');


const todos =[
    {id: 1, text: "Todo One"},
    {id: 2, text: "Todo Two"},
    {id: 3, text: "Todo Three"}

]

//const PORT = Math.floor(Math.random() * 1000) + 5000 || 5000;
// const PORT = 8080;

// if(cluster.isMaster){
//   console.log("This is the master process:", process.pid);
//   for(let i=0; i<numCPUs; i++){
//     cluster.fork()
//   }

// }else {
//   console.log(`started a worker at ${process.pid}`);
//   http.createServer((req, res) => { 
//     const {method,url} = req;

//     let body =[];
//     req.on('data',chunk=>{
//         body.push(chunk)
//     }).on('end',()=>{
//         body = Buffer.concat(body).toString();

//             let status = 404;
//             const response = {
//                 success: false,
//                 data: null,
//                 errror: null
//             }

//             if(req.url === '/kill'){
//                 process.exit()
//               }

//             if(method === 'GET' && url === '/todos') {
//                 status = 200;
//                 response.success = true;
//                 response.data = todos;
//                 response.processId = process.pid;
//             }else if(method === 'POST' && url === '/todos') {
//                 const {id,text} = JSON.parse(body);

//                 if(!id || !text){
//                     status = 400;
//                     response.error = "Please add id and text"
//                 }else{
//                     todos.push({id,text});
//                 status = 201;
//                 response.success = true;
//                 response.data = todos;
//                 }
            
//             }

//                 res.writeHead(status,{
//                 'Content-Type' : 'application/json',
//                 'X-Powered-By': 'Node.js'
//             })
//             res.end(JSON.stringify({
//                response
//             }))
//     })


//   }).listen(PORT,()=>console.log(`Server running on port ${PORT}`));
// }

const server = http.createServer((req,res)=>{


    const {method,url} = req;

    // res.statusCode = 404;
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello');

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello</h1>');

    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('X-Powered-By', 'Node.js');
    // res.write('<h1>Hello</h1>');

    // res.writeHead(400,{
    //     'Content-Type' : 'application/json',
    //     'X-Powered-By': 'Node.js'
    // })

    // console.log(req.headers.authorization);

    let body =[];
    req.on('data',chunk=>{
        body.push(chunk)
    }).on('end',()=>{
        body = Buffer.concat(body).toString();

            let status = 404;
            const response = {
                success: false,
                data: null,
                errror: null
            }

            if(method === 'GET' && url === '/todos') {
                status = 200;
                response.success = true;
                response.data = todos;
            }else if(method === 'POST' && url === '/todos') {
                const {id,text} = JSON.parse(body);

                if(!id || !text){
                    status = 400;
                    response.error = "Please add id and text"
                }else{
                    todos.push({id,text});
                status = 201;
                response.success = true;
                response.data = todos;
                }
            
            }

                res.writeHead(status,{
                'Content-Type' : 'application/json',
                'X-Powered-By': 'Node.js'
            })
            res.end(JSON.stringify({
               response
            }))
    })

            // res.end(JSON.stringify({
            //     success: true,
            //     error: 'Please add email',
            //     data: data
            // }))

})


const PORT = Math.floor(Math.random() * 1000) + 5000 || 5000;
server.listen(PORT,()=>console.log(`Server ${OS.hostname()} running on port ${PORT}`))
setTimeout(() => {
        console.log(`Server ${OS.hostname()} closed on port ${PORT}`);
        server.close();
}, 600000);