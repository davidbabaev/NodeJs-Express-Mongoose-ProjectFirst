const cors = require('cors');

const corsPolicyMiddleware = (cors({
    origin:[
        "http://127.0.0.1:5500",
        "localhost:5500",
        "http://127.0.0.1:5501",
        "www.tzachCards.co.il",
        "http://127.0.0.1:5500/index.html",
        "http://localhost:5173",
        "http://localhost:8181",
        "https://db-social-media-app.onrender.com",
        "https://mirage-frontend-tfxf.onrender.com/"
    ],
}))

module.exports = corsPolicyMiddleware;

