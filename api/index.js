const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const connectStore = require('connect-mongo');
const multer = require('multer');
const env = require('./.env');
const routesConfig  = require('./routesConfig');

const app = express();
const MongoStore = connectStore(session);

init();
initDatabase();
initStorage();
routesConfig.initialize(app);
initProductionSettings();

app.listen(env.PORT, () => console.log(`LISTENING ON PORT ${env.PORT}`));

function init() {
    app.use(cors( {
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(session({
        name: env.SESSION_NAME,
        secret: env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'session',
            ttl: parseInt(env.SESSION_LIFETIME) / 1000
        }),
        proxy : true,
        cookie: {
            sameSite: true,
            secure: env.NODE_ENV === 'production',
            maxAge: parseInt(env.SESSION_LIFETIME)
        }
    }));
    app.disable('x-powered-by');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(logger('dev'));
}

function initDatabase() {
    const dbRoute = env.MONGO_URI;
    mongoose.connect(dbRoute, {useNewUrlParser: true});
    let db = mongoose.connection;
    db.once('open', () => console.log('connected to the database'));
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

function initStorage() {
    const multerMid = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })

    app.disable('x-powered-by')
    app.use(multerMid.single('medias'))
}


function initProductionSettings() {
    /** Deployment config.json? */
//app.use(express.static(path.join(__dirname, '/../view/build')));
//app.get('/*', function (req, res) {
//  res.sendFile(path.join(__dirname, '/../view/build/index.html'));
//});
}


