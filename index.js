'use strict';
const app = require('./src/app');

const startServer = async () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
};

startServer();
