const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* Sign in email validation ********************************
router.get('/release1-v2/pre-one-login/sign-in-email', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/pre-one-login/sign-in-email', function (req, res) {
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
    res.redirect('/release1-v2/pre-one-login/sign-in-password')
  }
})


// ******* Sign in password validation ********************************
router.get('/release1-v2/pre-one-login/sign-in-password', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/pre-one-login/sign-in-password', function (req, res) {
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
    res.redirect('/release1-v2/pre-one-login/you-need-to-verify')
  }
})

// ******* you-need-to-verify javascript ********************************
router.get('/release1-v2/pre-one-login/you-need-to-verify', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/you-need-to-verify', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/pre-one-login/you-need-to-verify', function (req, res) {
  res.redirect('/release1-v2/pre-one-login/one-login-intro')
})

// ******* id-check javascript ********************************
router.get('/release1-v2/pre-one-login/id-check', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/id-check', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/pre-one-login/id-check', function (req, res) {
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
    res.render('release1-v1/pre-one-login/id-check', {
      errorID: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-ID'] == 'no-id' ) {
      res.redirect('/release1-v2/pre-one-login/acsp-alternate')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/pre-one-login/one-login-intro')
    }
  }
})


// ******* resident javascript ********************************
router.get('/release1-v2/pre-one-login/resident', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/resident', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/pre-one-login/resident', function (req, res) {
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
    res.render('release1-v1/pre-one-login/resident', {
      errorResident: true,
      errorList: errors
    })
  } else {
    if (req.session.data['is-resident'] === 'yes') {
      res.redirect('/release1-v2/pre-one-login/one-login-intro')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/pre-one-login/id-check')
    }
  }
})


// ******* one-login-start javascript ********************************
router.get('/release1-v2/pre-one-login/one-login-start', function (req, res) {
  // Set URl
  res.render('release1-v1/pre-one-login/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/pre-one-login/one-login-start', function (req, res) {
  res.redirect('/v8/one-login/one-login-working')
})


// ******* psc-existing-company javascript ********************************
router.get('/release1-v2/post-one-login/psc-existing-company', function (req, res) {
  // Set URl
  res.render('release1-v1/post-one-login/psc-existing-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/post-one-login/psc-existing-company', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['psc-existing'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you are a PSC of an existing company',
      href: '#psc-existing'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/post-one-login/psc-existing-company', {
      errorPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['psc-existing'] === 'yes') {
      res.redirect('/release1-v2/post-one-login/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/post-one-login/verified-success-psc')
    }
  }
})


// ******* psc-statement javascript ********************************
router.get('/release1-v2/post-one-login/psc-statement-one', function (req, res) {
  // Set URl
  res.render('release1-v1/post-one-login/psc-statement-one', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/post-one-login/psc-statement-one', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['verification-Statement-one'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#verification-Statement-one'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/post-one-login/psc-statement-one', {
      errorStatementOne: true,
      errorList: errors
    })
  } else {
    res.redirect('/release1-v2/post-one-login/check-your-answers')
  }
})


// ******* psc-statement javascript ********************************
router.get('/release1-v2/post-one-login/psc-statement-two', function (req, res) {
  // Set URl
  res.render('release1-v1/post-one-login/psc-statement-two', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/post-one-login/psc-statement-two', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['verification-Statement-two'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#verification-Statement-two'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/post-one-login/psc-statement-two', {
      errorStatementTwo: true,
      errorList: errors
    })
  } else {
    res.redirect('/release1-v2/post-one-login/check-your-answers')
  }
})


// ******* other-appointments javascript ********************************
router.get('/release1-v2/post-one-login/check-your-answers', function (req, res) {
  // Set URl
  res.render('release1-v1/post-one-login/check-your-answers', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/post-one-login/check-your-answers', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['psc-another'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you need to link your verified ID to another PSC',
      href: '#psc-another'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/post-one-login/check-your-answers', {
      errorAnotherPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['psc-another'] === 'yes') {
      res.redirect('/release1-v2/post-one-login/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/post-one-login/verified-success-psc')
    }
  }
})


// ******* other-appointments javascript ********************************
router.get('/release1-v2/post-one-login/unlinked-identity', function (req, res) {
  // Set URl
  res.render('release1-v1/post-one-login/unlinked-identity', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/post-one-login/unlinked-identity', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['no-psc-another'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you need to link your verified ID to another PSC',
      href: '#no-psc-another'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/post-one-login/unlinked-identity', {
      errorAnotherPsc2: true,
      errorList: errors
    })
  } else {
    if (req.session.data['no-psc-another'] === 'yes') {
      res.redirect('/release1-v2/post-one-login/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/post-one-login/verified-success-psc')
    }
  }
})


// ******* company number javascript ********************************
router.get('/release1-v2/post-one-login/company-number', function (req, res) {
  // Set URl
  res.render('release1-v1/post-one-login/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/post-one-login/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  // Check if user has filled out a email
  if (req.session.data['company-number'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#company-number'
    })

    // Re-show page with error value as true so errors will show
    res.render('release1-v1/post-one-login/company-number', {
      errorCompany: true,
      errorList: errors
    })
  } else {
      res.redirect('/release1-v2/post-one-login/correct-company')
  }
})


// ******* smartphone-type javascript ********************************
router.get('/release1-v2/one-login/computer', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/computer', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/one-login/computer', function (req, res) {
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
      res.redirect('/release1-v2/one-login/computer')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/one-login/smartphone-type')
    }
  }
})


// ******* smartphone-type javascript ********************************
router.get('/release1-v2/one-login/smartphone-type', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/smartphone-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/one-login/smartphone-type', function (req, res) {
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
      res.redirect('/release1-v2/one-login/smartphone-type')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/one-login/interruption-card')
    }
  }
})


// ******* passport javascript ********************************
router.get('/release1-v2/one-login/passport', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/passport', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/one-login/passport', function (req, res) {
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
      res.redirect('/release1-v2/one-login/one-login-working')
    } else {
      // User inputted value so move to next page
      res.redirect('/release1-v2/one-login/passport')
    }
  }
})



// ******* linked-identity javascript ********************************
router.get('/release1-v2/post-one-login/linked-identity', function (req, res) {
  // Set URl
  res.render('release1-v1/post-one-login/linked-identity', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/post-one-login/linked-identity', function (req, res) {
  if (req.session.data['company-number'] === '02050399') {
    res.redirect('/release1-v2/post-one-login/psc-statement-one')
  } else {
    // User inputted value so move to next page
    res.redirect('/release1-v2/post-one-login/psc-statement-two')
  }
})


// ******* one-login/success validation ********************************
router.get('/release1-v2/one-login/success', function (req, res) {
  // Set URl
  res.render('release1-v1/one-login/success', {
    currentUrl: req.originalUrl
  })
})

router.post('/release1-v2/one-login/success', function (req, res) {

  if (req.session.data['version'] === 'sole-trader') {
    // ACSP
    res.redirect('/release1-v2/post-one-login/verified-success-sole-trader')
  } else {
    // General
    res.redirect('/release1-v2/post-one-login/verified-success')
  }
})


module.exports=router;