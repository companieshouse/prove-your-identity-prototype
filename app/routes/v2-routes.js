const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* Sign in validation ********************************
router.get('/v2/sign-in', function (req, res) {
  // Set URl
  res.render('v2/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/sign-in', function (req, res) {
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
    res.render('v2/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/resident')
  }
})

// ******* passport javascript ********************************
router.get('/v2/passport', function (req, res) {
  // Set URl
  res.render('v2/passport', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/passport', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['has-passport'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you have a biometric passport',
      href: '#has-passport'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/passport', {
      errorPassport: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-passport'] === 'yes') {
      res.redirect('/v2/one-login-start')
    } else {
      // User inputted value so move to next page
      res.redirect('/v2/driving-licence')
    }
  }
})


// ******* driving-licence javascript ********************************
router.get('/v2/driving-licence', function (req, res) {
  // Set URl
  res.render('v2/driving-licence', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/driving-licence', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['has-licence'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you have a UK driving licence',
      href: '#has-licence'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/driving-licence', {
      errorLicence: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-licence'] === 'yes') {
      res.redirect('/v2/one-login-start')
    } else {
      // User inputted value so move to next page
      res.redirect('/v2/alternative-provider')
    }
  }
})


// ******* resident javascript ********************************
router.get('/v2/resident', function (req, res) {
  // Set URl
  res.render('v2/resident', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/resident', function (req, res) {
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
    res.render('v2/resident', {
      errorResident: true,
      errorList: errors
    })
  } else {
    if (req.session.data['is-resident'] === 'yes') {
      res.redirect('/v2/one-login-start')
    } else {
      // User inputted value so move to next page
      res.redirect('/v2/passport')
    }
  }
})


// ******* one-login-start javascript ********************************
router.get('/v2/one-login-start', function (req, res) {
  // Set URl
  res.render('v2/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/one-login-start', function (req, res) {
  res.redirect('/v2/one-login-working')
})

// ******* one-login-working javascript ********************************
router.get('/v2/one-login-working', function (req, res) {
  // Set URl
  res.render('v2/one-login-working', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/one-login-working', function (req, res) {
  res.redirect('/v2/address-lookup')
})


// ******* address-lookup javascript ********************************
router.get('/v2/address-lookup', function (req, res) {
  // Set URl
  res.render('v2/address-lookup', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/address-lookup', function (req, res) {
  res.redirect('/v2/address-confirm')
})

// ******* address-confirm javascript ********************************
router.get('/v2/address-confirm', function (req, res) {
  // Set URl
  res.render('v2/address-confirm', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/address-confirm', function (req, res) {
  res.redirect('/v2/verified-success')
})


// ******* address-manual javascript ********************************
router.get('/v2/address-manual', function (req, res) {
  // Set URl
  res.render('v2/address-manual', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/address-manual', function (req, res) {
  res.redirect('/v2/address-confirm')
})


module.exports=router;

