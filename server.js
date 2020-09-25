const http = require('http');

const todos =[
    {id: 1, text: "Todo One"},
    {id: 2, text: "Todo Two"},
    {id: 3, text: "Todo Three"}

]

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


const PORT = 5000;

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))