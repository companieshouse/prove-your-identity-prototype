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
    res.redirect('/v2/one-login-intro')
  }
})

// ******* id-check javascript ********************************
router.get('/v2/id-check', function (req, res) {
  // Set URl
  res.render('v2/id-check', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/id-check', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['has-ID'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select what type of ID you have',
      href: '#has-ID'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/id-check', {
      errorID: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-ID'] == 'no-id' ) {
      res.redirect('/v2/acsp-alternate')
    } else {
      // User inputted value so move to next page
      res.redirect('/v2/sign-in')
    }
  }
})

// ******* route javascript ********************************
router.get('/v2/route', function (req, res) {
  // Set URl
  res.render('v2/route', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/route', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['which-route'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'You must select how you would you like to verify your identity with Companies House',
      href: '#which-route'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/route', {
      errorRoute: true,
      errorList: errors
    })
  } else {
    if (req.session.data['which-route'] == 'gov') {
      res.redirect('/v2/resident')
    } else {
      // User inputted value so move to next page
      res.redirect('/v2/acsp-route')
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
      res.redirect('/v2/sign-in')
    } else {
      // User inputted value so move to next page
      res.redirect('/v2/id-check')
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

