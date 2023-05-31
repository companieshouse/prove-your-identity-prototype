const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* Sign in validation ********************************
router.get('/v3/sign-in', function (req, res) {
  // Set URl
  res.render('v3/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/sign-in', function (req, res) {
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
    res.render('v3/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v3/resident')
  }
})

// ******* id-check javascript ********************************
router.get('/v3/id-check', function (req, res) {
  // Set URl
  res.render('v3/id-check', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/id-check', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['has-ID'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select which type of photo ID you have',
      href: '#has-ID'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/id-check', {
      errorID: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-ID'] == 'no-id' ) {
      res.redirect('/v3/acsp-alternate')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/one-login-intro')
    }
  }
})


// ******* route javascript ********************************
router.get('/v3/route', function (req, res) {
  // Set URl
  res.render('v3/route', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/route', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['which-route'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select how you want to verify your identity',
      href: '#which-route'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/route', {
      errorRoute: true,
      errorList: errors
    })
  } else {
    if (req.session.data['which-route'] == 'gov') {
      res.redirect('/v3/sign-in')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/acsp-route')
    }
  }
})


// ******* resident javascript ********************************
router.get('/v3/resident', function (req, res) {
  // Set URl
  res.render('v3/resident', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/resident', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['is-resident'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you have a home address in the UK',
      href: '#is-resident'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/resident', {
      errorResident: true,
      errorList: errors
    })
  } else {
    if (req.session.data['is-resident'] === 'yes') {
      res.redirect('/v3/one-login-intro')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/id-check')
    }
  }
})


// ******* one-login-start javascript ********************************
router.get('/v3/one-login-start', function (req, res) {
  // Set URl
  res.render('v3/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/one-login-start', function (req, res) {
  res.redirect('/v3/one-login-working')
})

// ******* one-login-working javascript ********************************
router.get('/v3/one-login-working', function (req, res) {
  // Set URl
  res.render('v3/one-login-working', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/one-login-working', function (req, res) {
  res.redirect('/v3/address-lookup')
})


// ******* psc-existing-company javascript ********************************
router.get('/v3/psc-verification/psc-existing-company', function (req, res) {
  // Set URl
  res.render('v3/psc-verification/psc-existing-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/psc-verification/psc-existing-company', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['psc-existing'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you are a person with significant control (PSC)',
      href: '#psc-existing'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/psc-verification/psc-existing-company', {
      errorPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['psc-existing'] === 'yes') {
      res.redirect('/v3/psc-verification/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/psc-verification/verified-success-psc')
    }
  }
})


// ******* psc-statement javascript ********************************
router.get('/v3/psc-verification/psc-statement', function (req, res) {
  // Set URl
  res.render('v3/psc-verification/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/psc-verification/psc-statement', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['verification-Statement'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#verification-Statement'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/psc-verification/psc-statement', {
      errorStatement: true,
      errorList: errors
    })
  } else {
    res.redirect('/v3/psc-verification/other-appointments')
  }
})


// ******* other-appointments javascript ********************************
router.get('/v3/psc-verification/other-appointments', function (req, res) {
  // Set URl
  res.render('v3/psc-verification/other-appointments', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/psc-verification/other-appointments', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['psc-another'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you are a PSC for another company',
      href: '#psc-another'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/psc-verification/other-appointments', {
      errorAnotherPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['psc-another'] === 'yes') {
      res.redirect('/v3/psc-verification/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/psc-verification/check-your-answers')
    }
  }
})


// ******* appointments javascript ********************************
router.get('/v3/psc-verification/appointments', function (req, res) {
  // Set URl
  res.render('v3/psc-verification/appointments', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/psc-verification/appointments', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['psc-choice'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select which person with significant control (PSC) you are',
      href: '#psc-choice'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/psc-verification/appointments', {
      errorPSC: true,
      errorList: errors
    })
  } else {
    if (req.session.data['psc-choice'] == 'sally') {
      res.redirect('/v3/psc-verification/psc-statement')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/psc-verification/psc-verified-failure')
    }
  }
})


module.exports=router;



// Verify your identity as a person with significant control (PSC) with Companies House

// Are you a PSC of an existing company? - /psc-verification/psc-existing-company.html
// Needs fixing!!!!!!!!

router.post('/company-number', function(request, response) {

  var pscExisting = request.session.data['pscExisting']
  if (pscExisting == "yes"){
      response.redirect("/company-number")
  } else {
      response.redirect("https://www.google.co.uk/")
  }
})