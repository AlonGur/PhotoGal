var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
var bodyParser=require('body-parser');
var model=require('./myDB/photos');

var indexRouter = require('./routes/index');
var photosRouter = require ('./routes/photos');
var registerRouter=require('./routes/register')
var loginRouter=require('./routes/login')
var uploadRouter=require('./routes/upload')


var app = express();

require('./config/passport')(passport);

app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('picsPerPage', 8)
app.locals.picsPerPage=app.get('picsPerPage')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));



//middlewear for getting lastentry from cookies
app.use(function (req,res,next){
  //if this is a new session
  if(!req.cookies.sess){
    //set this session's cookie to from last entry cookie
    res.cookie('sess',req.cookies.lastEntry || 'never')
    //update the last entry cookie to current date, for use in next login
    res.cookie('lastEntry', Date(), {expires: new Date(Date.now() + 9000000)})
  }
  //save session cookie info for use in template rendering
  res.locals.lastEntry= req.cookies.sess
  next();
})


//MW for search form submission
app.post('/search/:size', function (req,res,next){
  res.redirect(`/photos/${req.params.size}/1/${req.body.searchBox}`)
})

//full pic display route
app.get('/:picId/originalSize', 
      function (req,res,next){
        model.findById( `${req.params.picId}`, function (err,file){
          if(err){
            throw err
          }
          else{
            res.sendFile(path.join(__dirname,'public','images',file.name))
          }
      })
    }
)

//downlaod route
app.use('/:picId/download',
  function(req,res,next){
    model.findById( `${req.params.picId}`, function (err,file){
      if(err){
        throw err
      }
      else{
        res.download(`public/images/${file.name}`)
      }
    })
  }
)

app.use('/', indexRouter);
app.use('/photos', photosRouter)
app.use('/upload', uploadRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


