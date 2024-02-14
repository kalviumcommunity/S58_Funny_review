const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;

// ping route
app.get('/ping',(req , res)=>{
  res.send({"msg":"pong"})
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`server running on PORT: ${port}`);
  });
}

module.exports = app;