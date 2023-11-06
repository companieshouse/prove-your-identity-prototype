const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* Sign in email validation ********************************
router.get('/v8/pre-one-login/sign-in-email', function (req, res) {
  // Set URl
  res.render('v8/pre-one-login/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/v8/pre-one-login/sign-in-email', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []

  // Check if user has filled out a email
  if (req.session.data['signin-email'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your email address',
      href: '#signin-email'
    })
  }


  // Check if eother filed not filled out
  if (req.session.data['signin-email'] === '') {
    // Re-show page with error value as true so errors will show
    res.render('v8/pre-one-login/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v8/pre-one-login/sign-in-password')
  }
})


// ******* Sign in password validation ********************************
router.get('/v8/pre-one-login/sign-in-password', function (req, res) {
  // Set URl
  res.render('v8/pre-one-login/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/v8/pre-one-login/sign-in-password', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []

  // Check if user has filled out a email
  if (req.session.data['signin-password'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your password',
      href: '#signin-password'
    })
  }


  // Check if eother filed not filled out
  if (req.session.data['signin-password'] === '') {
    // Re-show page with error value as true so errors will show
    res.render('v8/pre-one-login/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v8/pre-one-login/you-need-to-verify')
  }
})

// ******* you-need-to-verify javascript ********************************
router.get('/v8/pre-one-login/you-need-to-verify', function (req, res) {
  // Set URl
  res.render('v8/pre-one-login/you-need-to-verify', {
    currentUrl: req.originalUrl
  })
})

router.post('/v8/pre-one-login/you-need-to-verify', function (req, res) {
  res.redirect('/v8/pre-one-login/one-login-intro')
})

// ******* id-check javascript ********************************
router.get('/v8/pre-one-login/id-check', function (req, res) {
  // Set URl
  res.render('v8/pre-one-login/id-check', {
    currentUrl: req.originalUrl
  })
})


// ******* one-login-start javascript ********************************
router.get('/v8/pre-one-login/one-login-start', function (req, res) {
  // Set URl
  res.render('v8/pre-one-login/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/v8/pre-one-login/one-login-start', function (req, res) {
  res.redirect('/v8/one-login/one-login-working')
})


module.exports=router;