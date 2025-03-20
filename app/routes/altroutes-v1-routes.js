const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* start validation ********************************
router.get('/alt-routes-v1/pre-one-login/start', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/pre-one-login/start', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/pre-one-login/start', function (req, res) {
  if (req.session.data['version'] === 'sole-trader') {
    // ACSP
    res.redirect('/alt-routes-v1/pre-one-login/one-login-intro')
  } else {
    // General
    res.redirect('/alt-routes-v1/pre-one-login/create-or-sign-in')
  }
})


// ******* Sign in email validation ********************************
router.get('/alt-routes-v1/pre-one-login/sign-in-email', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/pre-one-login/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/pre-one-login/sign-in-email', function (req, res) {
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
    res.render('alt-routes-v1/pre-one-login/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/alt-routes-v1/pre-one-login/sign-in-password')
  }
})


// ******* Sign in password validation ********************************
router.get('/alt-routes-v1/pre-one-login/sign-in-password', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/pre-one-login/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/pre-one-login/sign-in-password', function (req, res) {
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
    res.render('alt-routes-v1/pre-one-login/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/alt-routes-v1/pre-one-login/one-login-intro')
  }
})

// ******* one-login-start javascript ********************************
router.get('/alt-routes-v1/one-login/one-login-start', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/one-login/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/one-login/one-login-start', function (req, res) {
  if (req.session.data['version'] === 'sole-trader') {
    // ACSP
    res.redirect('/alt-routes-v1/one-login/one-login-id')
  } else {
    // General
    res.redirect('https://govuk-one-login-prototype-6d2545e2d700.herokuapp.com/page-index/ipv-core/id-screener')
  }
})


// ******* full name validation ********************************
router.get('/alt-routes-v1/post-one-login/full-name', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/full-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/full-name', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []

  // Check if user has filled out a email
  if (req.session.data['fullName'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your full name',
      href: '#fullName'
    })
  }

  // Check if eother filed not filled out
  if (req.session.data['fullName'] === '') {
    // Re-show page with error value as true so errors will show
    res.render('alt-routes-v1/post-one-login/full-name', {
      errorFullName: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/alt-routes-v1/post-one-login/dob')
  }
})


// ******* director-details javascript ******************************
router.get('/alt-routes-v1/post-one-login/dob', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/dob', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/dob', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var dayHasError = false
  var monthHasError = false
  var yearHasError = false
  var dobError = false

    // Check if user has filled out a day
  if (req.session.data['dob-day'] === '') {
    // No value so add error to array
    dayHasError = true
    dobError = true
    errors.push({
      text: 'The date must include a day',
      href: '#dob-day'
    })
  }

  // Check if user has filled out a month
  if (req.session.data['dob-month'] === '') {
    // No value so add error to array
    monthHasError = true
    dobError = true
    errors.push({
      text: 'The date must include a month',
      href: '#dob-day'
    })
  }

  // Check if user has filled out a year
  if (req.session.data['dob-year'] === '') {
    // No value so add error to array
    yearHasError = true
    dobError = true
    errors.push({
      text: 'The date must include a year',
      href: '#dob-day'
    })
  }

  // Check if other filed not filled out
  if (dobError) {
    // Re-show page with error value as true so errors will show
    res.render('alt-routes-v1/post-one-login/dob', {
      errorDobDay: dayHasError,
      errorDobMonth: monthHasError,
      errorDobYear: yearHasError,
      errorDob: dobError,
      errorList: errors
    })
  } else {
    res.redirect('/alt-routes-v1/post-one-login/address')
  }
})


// ******* address validation ********************************
router.get('/alt-routes-v1/post-one-login/address', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/address', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/address', function (req, res) {
    res.redirect('/alt-routes-v1/post-one-login/address-confirm')
})



module.exports=router;