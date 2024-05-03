const app = require('./app')
const connectdb = require('./database/connection')

const dotenv = require('dotenv')



dotenv.config()

connectdb();



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.PORT}`);
})
