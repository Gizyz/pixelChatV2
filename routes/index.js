var db = require('./functions.js');
var express = require('express');
var router = express.Router();

console.log("http://localhost:3000");
const redirectLogin = (req, res, next) => {
    res.redirect('/login')

}
const redirectHome = (req, res, next) => {
    res.redirect('/')

}



/* GET home page. */
router.get('/', redirectLogin,function(req, res, next) {
  console.log(req.session)

  res.render('index', { title: 'Home' });

});

/* GET about page. */
router.get('/about',redirectLogin, function(req, res, next) {
  console.log("http://localhost:3000/about");
  res.render('about', { title: 'About me' });
});

/* GET project page. */
router.get('/projects', redirectLogin, function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET signup page. */
router.get('/signup', redirectHome, function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

/* GET login page. */
router.get('/login', redirectHome, function(req, res, next) {
  // req.session.userId = 
  res.render('login', { title: 'Login' });
});
router.post('/login', redirectHome, (req, res) => {
  const { email, password } = req.body

})
router.get('/logout', redirectLogin, function(req, res, next) {
  // req.session.userId = 
  res.render('login', { title: 'Login' });
});
module.exports = router;
