const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ******* Sign in validation ********************************
router.get('/v4/pre-one-login/sign-in', function (req, res) {
  // Set URl
  res.render('v4/pre-one-login/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/pre-one-login/sign-in', function (req, res) {
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
    res.render('v4/pre-one-login/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/pre-one-login/resident')
  }
})

// ******* id-check javascript ********************************
router.get('/v4/pre-one-login/id-check', function (req, res) {
  // Set URl
  res.render('v4/pre-one-login/id-check', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/pre-one-login/id-check', function (req, res) {
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
    res.render('v4/pre-one-login/id-check', {
      errorID: true,
      errorList: errors
    })
  } else {
    if (req.session.data['has-ID'] == 'no-id' ) {
      res.redirect('/v4/pre-one-login/acsp-alternate')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/pre-one-login/one-login-intro')
    }
  }
})


// ******* route javascript ********************************
router.get('/v4/pre-one-login/route', function (req, res) {
  // Set URl
  res.render('v4/pre-one-login/route', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/pre-one-login/route', function (req, res) {
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
    res.render('v4/pre-one-login/route', {
      errorRoute: true,
      errorList: errors
    })
  } else {
    if (req.session.data['which-route'] == 'gov') {
      res.redirect('/v4/pre-one-login/sign-in')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/pre-one-login/acsp-route')
    }
  }
})


// ******* resident javascript ********************************
router.get('/v4/pre-one-login/resident', function (req, res) {
  // Set URl
  res.render('v4/pre-one-login/resident', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/pre-one-login/resident', function (req, res) {
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
    res.render('v4/pre-one-login/resident', {
      errorResident: true,
      errorList: errors
    })
  } else {
    if (req.session.data['is-resident'] === 'yes') {
      res.redirect('/v4/pre-one-login/one-login-intro')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/pre-one-login/id-check')
    }
  }
})


// ******* one-login-start javascript ********************************
router.get('/v4/pre-one-login/one-login-start', function (req, res) {
  // Set URl
  res.render('v4/pre-one-login/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/pre-one-login/one-login-start', function (req, res) {
  res.redirect('/v4/one-login/computer')
})


// ******* psc-existing-company javascript ********************************
router.get('/v4/post-one-login/psc-existing-company', function (req, res) {
  // Set URl
  res.render('v4/post-one-login/psc-existing-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/post-one-login/psc-existing-company', function (req, res) {
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
    res.render('v4/post-one-login/psc-existing-company', {
      errorPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['psc-existing'] === 'yes') {
      res.redirect('/v4/post-one-login/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/post-one-login/verified-success-psc')
    }
  }
})


// ******* psc-statement javascript ********************************
router.get('/v4/post-one-login/psc-statement-one', function (req, res) {
  // Set URl
  res.render('v4/post-one-login/psc-statement-one', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/post-one-login/psc-statement-one', function (req, res) {
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
    res.render('v4/post-one-login/psc-statement-one', {
      errorStatementOne: true,
      errorList: errors
    })
  } else {
    res.redirect('/v4/post-one-login/check-your-answers')
  }
})


// ******* psc-statement javascript ********************************
router.get('/v4/post-one-login/psc-statement-two', function (req, res) {
  // Set URl
  res.render('v4/post-one-login/psc-statement-two', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/post-one-login/psc-statement-two', function (req, res) {
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
    res.render('v4/post-one-login/psc-statement-two', {
      errorStatementTwo: true,
      errorList: errors
    })
  } else {
    res.redirect('/v4/post-one-login/check-your-answers')
  }
})


// ******* other-appointments javascript ********************************
router.get('/v4/post-one-login/check-your-answers', function (req, res) {
  // Set URl
  res.render('v4/post-one-login/check-your-answers', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/post-one-login/check-your-answers', function (req, res) {
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
    res.render('v4/post-one-login/check-your-answers', {
      errorAnotherPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['psc-another'] === 'yes') {
      res.redirect('/v4/post-one-login/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/post-one-login/verified-success-psc')
    }
  }
})


// ******* other-appointments javascript ********************************
router.get('/v4/post-one-login/unlinked-identity', function (req, res) {
  // Set URl
  res.render('v4/post-one-login/unlinked-identity', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/post-one-login/unlinked-identity', function (req, res) {
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
    res.render('v4/post-one-login/unlinked-identity', {
      errorAnotherPsc2: true,
      errorList: errors
    })
  } else {
    if (req.session.data['no-psc-another'] === 'yes') {
      res.redirect('/v4/post-one-login/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/post-one-login/verified-success-psc')
    }
  }
})


// ******* company number javascript ********************************
router.get('/v4/post-one-login/company-number', function (req, res) {
  // Set URl
  res.render('v4/post-one-login/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/post-one-login/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];
  var company_1 = (req.session.data['company-number'] === '02050399');
  var company_2 = (req.session.data['company-number'] === '02367890');

  // Check if user has filled out a email
  if (req.session.data['company-number'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#company-number'
    })

    // Re-show page with error value as true so errors will show
    res.render('v4/post-one-login/company-number', {
      errorCompany: true,
      errorList: errors
    })
  } else {
    // if (company_1 || company_2) {
      res.redirect('/v4/post-one-login/correct-company')
    // } else {
    //   res.render('v4/post-one-login/company-number', {
    //     errorCompany: false,
    //     errorList: errors
    //   })
    // }
  }
})

// ******* smartphone-type javascript ********************************
router.get('/v4/one-login/computer', function (req, res) {
  // Set URl
  res.render('v4/one-login/computer', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/one-login/computer', function (req, res) {
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
    res.render('v4/one-login/computer', {
      errorLaptop: true,
      errorList: errors
    })
  } else {
    if (req.session.data['laptop'] === 'no') {
      res.redirect('/v4/one-login/computer')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/one-login/smartphone-type')
    }
  }
})


// ******* smartphone-type javascript ********************************
router.get('/v4/one-login/smartphone-type', function (req, res) {
  // Set URl
  res.render('v4/one-login/smartphone-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/one-login/smartphone-type', function (req, res) {
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
    res.render('v4/one-login/smartphone-type', {
      errorSmartphone: true,
      errorList: errors
    })
  } else {
    if (req.session.data['smartphone'] === 'no') {
      res.redirect('/v4/one-login/smartphone-type')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/one-login/interruption-card')
    }
  }
})


// ******* passport javascript ********************************
router.get('/v4/one-login/passport', function (req, res) {
  // Set URl
  res.render('v4/one-login/passport', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/one-login/passport', function (req, res) {
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
    res.render('v4/one-login/passport', {
      errorPassport: true,
      errorList: errors
    })
  } else {
    if (req.session.data['passport'] === 'yes') {
      res.redirect('/v4/one-login/one-login-working')
    } else {
      // User inputted value so move to next page
      res.redirect('/v4/one-login/passport')
    }
  }
})



// ******* linked-identity javascript ********************************
router.get('/v4/post-one-login/linked-identity', function (req, res) {
  // Set URl
  res.render('v4/post-one-login/linked-identity', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/post-one-login/linked-identity', function (req, res) {
  if (req.session.data['company-number'] === '02050399') {
    res.redirect('/v4/post-one-login/psc-statement-one')
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/post-one-login/psc-statement-two')
  }
})




module.exports=router;