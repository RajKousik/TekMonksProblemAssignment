const express = require('express')
const app = express()
const PORT = 3500

const storyRoute = require('./routes/storyRoute'); 

app.get('/', (req, res)=>{
    res.send("Main Page Running!");
})

app.use('/getTimeStories', storyRoute);


app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`)
})