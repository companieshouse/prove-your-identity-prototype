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

// ******* live-in-uk javascript ********************************
router.get('/alt-routes-v1/post-one-login/live-in-uk', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/live-in-uk', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/live-in-uk', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['liveInUk'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you live in the UK',
      href: '#liveInUk'
    })

    // Re-show page with error value as true so errors will show
    res.render('alt-routes-v1/post-one-login/live-in-uk', {
      errorLiveInUk: true,
      errorList: errors
    })
  } else {
    if (req.session.data['liveInUk'] === 'no') {
      res.redirect('/alt-routes-v1/post-one-login/nationality')
    } else {
      res.redirect('/alt-routes-v1/post-one-login/failure-evidence')
    }
  }
})


// ******* country-list validation ********************************
router.get('/alt-routes-v1/post-one-login/nationality', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/nationality', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/nationality', function (req, res) {
  if (req.session.data['nationalityOne'] === 'India') {
    res.redirect('/alt-routes-v1/post-one-login/failure-evidence-alt-route')
  } else {
    res.redirect('/alt-routes-v1/post-one-login/failure-evidence')
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


// ******* primary-id javascript ********************************
router.get('/alt-routes-v1/post-one-login/primary-id', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/primary-id', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/primary-id', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['primaryId'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select at least one type of identity document',
      href: '#primaryId'
    })

    // Re-show page with error value as true so errors will show
    res.render('alt-routes-v1/post-one-login/primary-id', {
      errorPrimaryId: true,
      errorList: errors
    })
  } else {
    res.redirect('/alt-routes-v1/post-one-login/primary-id-upload')
  }
})

// ******* primary-id-upload javascript ********************************
router.get('/alt-routes-v1/post-one-login/primary-id-upload', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/primary-id-upload', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/primary-id-upload', function (req, res) {
  res.redirect('/alt-routes-v1/post-one-login/secondary-id')
})


// ******* secondary-id javascript ********************************
router.get('/alt-routes-v1/post-one-login/secondary-id', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/secondary-id', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/secondary-id', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['secondaryId'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select one document you are going to upload',
      href: '#secondaryId'
    })

    // Re-show page with error value as true so errors will show
    res.render('alt-routes-v1/post-one-login/secondary-id', {
      errorSecondaryId: true,
      errorList: errors
    })
  } else {
    res.redirect('/alt-routes-v1/post-one-login/secondary-id-upload')
  }
})

// ******* secondary-id-upload javascript ********************************
router.get('/alt-routes-v1/post-one-login/secondary-id-upload', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/secondary-id-upload', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/secondary-id-upload', function (req, res) {
  res.redirect('/alt-routes-v1/post-one-login/check-id-details')
})



// ******* upload-id-video javascript ********************************
router.get('/alt-routes-v1/post-one-login/upload-id-video', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/upload-id-video', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/upload-id-video', function (req, res) {
  res.redirect('/alt-routes-v1/post-one-login/declaration')
})


// ******* declaration javascript ********************************
router.get('/alt-routes-v1/post-one-login/declaration', function (req, res) {
  // Set URl
  res.render('/alt-routes-v1/post-one-login/declaration', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/declaration', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['declaration'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select declaration',
      href: '#declaration'
    })

    // Re-show page with error value as true so errors will show
    res.render('/alt-routes-v1/post-one-login/declaration', {
      errorDeclaration: true,
      errorList: errors
    })
  } else {
      res.redirect('/alt-routes-v1/post-one-login/vouching-intro')
  }
})


// ******* applicant-details javascript ******************************
router.get('/alt-routes-v1/post-one-login/voucher-details', function (req, res) {
  // Set URl
  res.render('alt-routes-v1/post-one-login/voucher-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v1/post-one-login/voucher-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var voucherNameError = false
  var voucherEmailError = false
  var voucherRoleError = false
  var detailsError = false

  // Check if user has filled out first name
  if (req.session.data['voucherName'] === '') {
    // No value so add error to array
    voucherNameError = true
    detailsError = true
    errors.push({
      text: 'Enter the vouchers full name',
      href: '#voucherName'
    })
  }

  // Check if user has filled out first name
  if (req.session.data['voucherEmail'] === '') {
    // No value so add error to array
    voucherEmailError = true
    detailsError = true
    errors.push({
      text: 'Enter the vouchers email address',
      href: '#voucherEmail'
    })
  }

    // Check if user has filled out first name
    if (req.session.data['voucherRole'] === '') {
      // No value so add error to array
      voucherRoleError = true
      detailsError = true
      errors.push({
        text: 'Enter the vouchers role',
        href: '#voucherRole'
      })
    }

  // Check if eother filed not filled out
  if (detailsError) {
    // Re-show page with error value as true so errors will show
    res.render('alt-routes-v1/post-one-login/voucher-details', {
      errorVoucherName: voucherNameError,
      errorVoucherEmail: voucherEmailError,
      errorVoucherRole: voucherRoleError,
      errorVoucherDetails: detailsError,
      errorList: errors
    })
  } 
  else  
  {res.redirect('/alt-routes-v1/post-one-login/check-details')}
})



module.exports=router;