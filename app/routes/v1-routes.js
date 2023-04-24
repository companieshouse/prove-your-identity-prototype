const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* Sign in validation ********************************
router.get('/v1/sign-in', function (req, res) {
  // Set URl
  res.render('v1/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/sign-in', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var emailHasError = false
  var passwordHasError = false

  // Check if user has filled out a email
  if (req.session.data['emailAddress'] === '') {
    // No value so add error to array
    emailHasError = true
    errors.push({
      text: 'Enter your email address',
      href: '#emailAddress'
    })
  }

  // Check if user has filled out a password
  if (req.session.data['password'] === '') {
    // No value so add error to array
    passwordHasError = true
    errors.push({
      text: 'Enter your password',
      href: '#password'
    })
  }

  // Check if eother filed not filled out
  if (emailHasError || passwordHasError) {
    // Re-show page with error value as true so errors will show
    res.render('v1/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v1/resident')
  }
})

// ******* passport javascript ********************************
router.get('/v1/passport', function (req, res) {
  // Set URl
  res.render('v1/passport', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/passport', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['has-passport'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'You must select if you have a biometric passport',
      href: '#has-passport'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/passport', {
      errorPassport: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-passport'] === 'yes') {
      res.redirect('/v1/one-login-start')
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/driving-licence')
    }
  }
})


// ******* driving-licence javascript ********************************
router.get('/v1/driving-licence', function (req, res) {
  // Set URl
  res.render('v1/driving-licence', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/driving-licence', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['has-licence'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'You must select if you have a UK driving licence',
      href: '#has-licence'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/driving-licence', {
      errorLicence: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-licence'] === 'yes') {
      res.redirect('/v1/one-login-start')
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/resident')
    }
  }
})


// ******* resident javascript ********************************
router.get('/v1/resident', function (req, res) {
  // Set URl
  res.render('v1/resident', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/resident', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['is-resident'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'You must select if you have a UK driving licence',
      href: '#is-resident'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/resident', {
      errorResident: true,
      errorList: errors
    })
  } else {
    if (req.session.data['is-resident'] === 'yes') {
      res.redirect('/v1/one-login-start')
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/passport')
    }
  }
})


// ******* one-login-start javascript ********************************
router.get('/v1/one-login-start', function (req, res) {
  // Set URl
  res.render('v1/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/one-login-start', function (req, res) {
  res.redirect('/v1/verified-success')
})


module.exports=router;

