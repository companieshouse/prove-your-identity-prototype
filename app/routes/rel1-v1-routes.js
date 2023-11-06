const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* Sign in email validation ********************************
router.get('/release1-v1/pre-one-login/sign-in-email', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/pre-one-login/sign-in-email', function (req, res) {
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
    res.render('release1-v1/pre-one-login/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/release1-v1/pre-one-login/sign-in-password')
  }
})


// ******* Sign in password validation ********************************
router.get('/release1-v1/pre-one-login/sign-in-password', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/pre-one-login/sign-in-password', function (req, res) {
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
    res.render('release1-v1/pre-one-login/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/release1-v1/pre-one-login/you-need-to-verify')
  }
})

// ******* you-need-to-verify javascript ********************************
router.get('/release1-v1/pre-one-login/you-need-to-verify', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/you-need-to-verify', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/pre-one-login/you-need-to-verify', function (req, res) {
  res.redirect('/release1-v1/pre-one-login/one-login-intro')
})

// ******* id-check javascript ********************************
router.get('/release1-v1/pre-one-login/id-check', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/id-check', {
    currentUrl: req.originalUrl
  })
})




// ******* one-login-start javascript ********************************
router.get('/release1-v1/pre-one-login/one-login-start', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/pre-one-login/one-login-start', function (req, res) {
  res.redirect('/release1-v1/one-login/computer')
})




// ******* smartphone-type javascript ********************************
router.get('/release1-v1/one-login/computer', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/computer', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/one-login/computer', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['laptop'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you are on a computer or tablet',
      href: '#laptop'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/one-login/computer', {
      errorLaptop: true,
      errorList: errors
    })
  } else {
    if (req.session.data['laptop'] === 'no') {
      res.redirect('/release1-v1/one-login/computer')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v1/one-login/smartphone-type')
    }
  }
})


// ******* smartphone-type javascript ********************************
router.get('/release1-v1/one-login/smartphone-type', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/smartphone-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/one-login/smartphone-type', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['smartphone'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you have a smartphone you can use',
      href: '#smartphone'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/one-login/smartphone-type', {
      errorSmartphone: true,
      errorList: errors
    })
  } else {
    if (req.session.data['smartphone'] === 'no') {
      res.redirect('/release1-v1/one-login/smartphone-type')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v1/one-login/interruption-card')
    }
  }
})


// ******* passport javascript ********************************
router.get('/release1-v1/one-login/passport', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/passport', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/one-login/passport', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['passport'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you have a valid passport',
      href: '#passport'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/one-login/passport', {
      errorPassport: true,
      errorList: errors
    })
  } else {
    if (req.session.data['passport'] === 'yes') {
      res.redirect('/release1-v1/one-login/one-login-working')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v1/one-login/passport')
    }
  }
})



// ******* one-login/success validation ********************************
router.get('/release1-v1/one-login/success', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/success', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v1/one-login/success', function (req, res) {

  if (req.session.data['version'] === 'sole-trader') {
    // ACSP
    res.redirect('/release1-v1/post-one-login/verified-success-sole-trader')
  } else {
    // General
    res.redirect('/release1-v1/post-one-login/verified-success')
  }
})


module.exports=router;