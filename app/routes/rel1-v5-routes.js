const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* start validation ********************************
router.get('/release1-v5/pre-one-login/start', function (req, res) {
  // Set URl
  res.render('release1-v5/pre-one-login/start', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/pre-one-login/start', function (req, res) {
  if (req.session.data['version'] === 'sole-trader') {
    // ACSP
    res.redirect('/release1-v5/pre-one-login/one-login-intro')
  } else {
    // General
    res.redirect('/release1-v5/pre-one-login/create-or-sign-in')
  }
})


// ******* Sign in email validation ********************************
router.get('/release1-v5/pre-one-login/sign-in-email', function (req, res) {
  // Set URl
  res.render('release1-v5/pre-one-login/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/pre-one-login/sign-in-email', function (req, res) {
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
    res.render('release1-v5/pre-one-login/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/release1-v5/pre-one-login/sign-in-password')
  }
})


// ******* Sign in password validation ********************************
router.get('/release1-v5/pre-one-login/sign-in-password', function (req, res) {
  // Set URl
  res.render('release1-v5/pre-one-login/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/pre-one-login/sign-in-password', function (req, res) {
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
    res.render('release1-v5/pre-one-login/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/release1-v5/pre-one-login/one-login-intro')
  }
})

// ******* one-login-start javascript ********************************
router.get('/release1-v5/one-login/one-login-start', function (req, res) {
  // Set URl
  res.render('release1-v5/one-login/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/one-login/one-login-start', function (req, res) {
  res.redirect('/release1-v5/one-login/one-login-id')
})


// ******* one-login-id javascript ********************************
router.get('/release1-v5/one-login/one-login-id', function (req, res) {
  // Set URl
  res.render('release1-v5/one-login/one-login-id', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/one-login/one-login-id', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['photoID'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you have any of these types of photo ID',
      href: '#photoID'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v5/one-login/one-login-id', {
      errorPhotoID: true,
      errorList: errors
    })
  } else {
    if (req.session.data['photoID'] == 'yes' ) {
      res.redirect('/release1-v5/one-login/one-login-working')
    } else {
      res.redirect('/release1-v5/one-login/one-login-post-office')
    }
  }
})


// ******* one-login-post-0ffice javascript ********************************
router.get('/release1-v5/one-login/one-login-post-office', function (req, res) {
  // Set URl
  res.render('release1-v5/one-login/one-login-post-office', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/one-login/one-login-post-office', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['postOffice'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you have any of these types of photo ID',
      href: '#postOffice'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v5/one-login/one-login-post-office', {
      errorPostOffice: true,
      errorList: errors
    })
  } else {
    if (req.session.data['postOffice'] == 'no' ) {
      res.redirect('/release1-v5/one-login/one-login-another-way')
    }
  }
})


// ******* one-login-another-way javascript ********************************
router.get('/release1-v5/one-login/one-login-another-way', function (req, res) {
  // Set URl
  res.render('release1-v5/one-login/one-login-another-way', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/one-login/one-login-another-way', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['anotherWay'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you have any of these types of photo ID',
      href: '#anotherWay'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v5/one-login/one-login-another-way', {
      errorAnotherWay: true,
      errorList: errors
    })
  } else {
    if (req.session.data['anotherWay'] == 'onelogin' ) {
      res.redirect('/release1-v5/one-login/one-login-id')
    } else {
      res.redirect('/release1-v5/post-one-login/failure-evidence')
    }
  }
})


// ******* one-login/success validation ********************************
router.get('/release1-v5/one-login/success', function (req, res) {
  // Set URl
  res.render('release1-v5/one-login/success', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v5/one-login/success', function (req, res) {

  if (req.session.data['version'] === 'sole-trader') {
    // ACSP
    res.redirect('/release1-v5/post-one-login/verified-success-sole-trader')
  } else {
    // General
    res.redirect('/release1-v5/post-one-login/verified-success')
  }
})


module.exports=router;