const server = require('./api/server');

const port = 9000;



// START YOUR SERVER HERE
server.listen(port, (req, res)=>{
   console.log(`server running on port ${port}`)
}) 