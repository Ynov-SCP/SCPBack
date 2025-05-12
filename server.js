require('dotenv').config();
const express = require('express');
const app = express();
const { initModels } = require('./models');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

initModels().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Serveur lancé sur le port ${process.env.PORT}`);
    });
});
