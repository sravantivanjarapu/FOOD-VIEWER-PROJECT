const express = require('express');
const cors = require('cors');
const connectDB=require('./database/db');
const recipeRoutes = require('./routes/reciperoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/recipes', recipeRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});