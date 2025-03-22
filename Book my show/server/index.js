const express = require('express');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const cors = require('cors');

const userRouter = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoutes')
const theatreRoute = require('./routes/theatreRoute')
const showRoute = require('./routes/showRoute')
const bookingRoute = require('./routes/bookingRoute')

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres' , theatreRoute );
app.use('/api/shows' , showRoute )
app.use('/api/bookings' , bookingRoute )



app.listen(PORT , ()=>{
    console.log(`server running at port ${PORT}`);
})