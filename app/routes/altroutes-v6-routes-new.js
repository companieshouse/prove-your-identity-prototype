const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// START TO SIGN IN
router.post('/alt-routes-v6/pre-one-login/start', function (req, res) {
  if (req.session.data['version'] === 'sole-trader') {
    // ACSP
    res.redirect('/alt-routes-v6/pre-one-login/one-login-intro')
  } else {
    // General
    res.redirect('/alt-routes-v6/pre-one-login/create-or-sign-in')
  }
})


// EMAIL TO PASSWORD

router.post('/alt-routes-v6/pre-one-login/sign-in-email', function (req, res) {
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
    res.render('alt-routes-v6/pre-one-login/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/alt-routes-v6/pre-one-login/sign-in-password')
  }
})

// PASSWORD TO ONE LOG IN INTRO

router.post('/alt-routes-v6/pre-one-login/sign-in-password', function (req, res) {
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
    res.render('alt-routes-v6/pre-one-login/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/alt-routes-v6/pre-one-login/one-login-intro')
  }
})

//ONE LOG IN INTRO TO ONE LOG IN START
router.post('/alt-routes-v6/one-login/one-login-start', function (req, res) {
  res.redirect('/alt-routes-v6/one-login/one-login-working')
})

// FIND ANOTHER WAY TO TRIAGE OR PRE-ONE LOG IN START
router.post('/alt-routes-v6/one-login/find-another-way-UR', function (req, res) {
  if (req.session.data['findAnotherWay'] === 'continue') {
    res.redirect('/alt-routes-v6/post-one-login/alt-route-triage')
  } else {
    res.redirect('/alt-routes-v6/pre-one-login/start')
  }
})

// LIVE IN UK to NATIONALITY OR FAILURE
router.post('/alt-routes-v6/post-one-login/live-in-uk', function (req, res) {
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
    res.render('alt-routes-v6/post-one-login/live-in-uk', {
      errorLiveInUk: true,
      errorList: errors
    })
  } else {
    if (req.session.data['liveInUk'] === 'no') {
      res.redirect('/alt-routes-v6/post-one-login/nationality')
    } else {
      res.redirect('/alt-routes-v6/post-one-login/failure-evidence')
    }
  }
})

//NATIONALITY TO ALT ROUTE CHOICE or FAILURE

router.post('/alt-routes-v6/post-one-login/nationality', function (req, res) {
  if (req.session.data['nationalityOne'] === 'Indian') {
    res.redirect('/alt-routes-v6/post-one-login/alt-route-choice')
  } 
  else if (req.session.data['nationalityOne'] === 'Pakistani') {
    res.redirect('/alt-routes-v6/post-one-login/alt-route-choice')
  }
  else {
    res.redirect('/alt-routes-v6/post-one-login/failure-evidence')
  }
})


//ALT ROUTE CHOICE TO ACSP OR COMPANY INFO

router.post('/alt-routes-v6/post-one-login/alt-route-choice', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['altRouteChoice'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select another way to prove your identity',
      href: '#altRouteChoice'
    })

    // Re-show page with error value as true so errors will show
    res.render('alt-routes-v6/post-one-login/alt-route-choice', {
      errorAltRouteChoice: true,
      errorList: errors
    })
  } else {
    if (req.session.data['altRouteChoice'] === 'acsp') {
      res.redirect('/alt-routes-v6/post-one-login/acsp-route')
    } else {
      // User inputted value so move to next page
      res.redirect('/alt-routes-v6/post-one-login/company-information')
    }
  }
})

//COMPANY INFO TO TRIAGE END WITH DATE PULLED THROUGH

router.post('/alt-routes-v6/post-one-login/company-information', function (req, res) {
  // Get the date parts from the form
  const day = req.body['confirmationDate-day'];
  const month = req.body['confirmationDate-month'];
  const year = req.body['confirmationDate-year'];

  // If any part of the date is missing, redirect to the no date page
  if (!day || !month || !year) {
    return res.redirect('/alt-routes-v6/post-one-login/triage-end-no-cs-date');
  }

  // Convert month number to month name
  const monthNames = [
    '', // so that monthNames[1] is January
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[parseInt(month, 10)];

  // Otherwise, save the date and continue as normal
  req.session.data['confirmationDate'] = { day, month, monthName, year };
  res.redirect('/alt-routes-v6/post-one-login/triage-end');
});

// second step in pulling date
router.get('/alt-routes-v6/post-one-login/triage-end', function(req, res) {
  const confirmationDate = req.session.data['confirmationDate'];
  res.render('alt-routes-v6/post-one-login/triage-end', { confirmationDate });
});


//PHOEBE NOTE - adapted the routing up to here, validation routing that follows is just a pure copy 

// ******* full name validation ********************************
router.get('/alt-routes-v6/post-one-login/full-name', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/full-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/full-name', function (req, res) {
    // Create empty array and set error variables to false
    var errors = []
    var firstNameError = false
    var lastNameError = false
    var detailsError = false
  
    // Check if user has filled out first name
    if (req.session.data['firstName'] === '') {
      // No value so add error to array
      firstNameError = true
      detailsError = true
      errors.push({
        text: 'Enter your full given name',
        href: '#firstName'
      })
    }
  
    // Check if user has filled out last name
    if (req.session.data['lastName'] === '') {
      // No value so add error to array
      lastNameError = true
      detailsError = true
      errors.push({
        text: 'Enter your full family name',
        href: '#lastName'
      })
    }

    // Check if eother filed not filled out
    if (detailsError) {
      // Re-show page with error value as true so errors will show
      res.render('alt-routes-v6/post-one-login/full-name', {
        errorFirstName: firstNameError,
        errorLastName: lastNameError,
        errorDetails: detailsError,
        errorList: errors
      })
    } 
    else {
      res.redirect('/alt-routes-v6/post-one-login/dob')
    }
})


// ******* director-details javascript ******************************
router.get('/alt-routes-v6/post-one-login/dob', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/dob', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/dob', function (req, res) {
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
    res.render('alt-routes-v6/post-one-login/dob', {
      errorDobDay: dayHasError,
      errorDobMonth: monthHasError,
      errorDobYear: yearHasError,
      errorDob: dobError,
      errorList: errors
    })
  } else {
    res.redirect('/alt-routes-v6/post-one-login/address')
  }
})


// ******* address validation ********************************
router.get('/alt-routes-v6/post-one-login/address', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/address', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/address', function (req, res) {
    res.redirect('/alt-routes-v6/post-one-login/address-confirm')
})


// ******* primary-id javascript ********************************
router.get('/alt-routes-v6/post-one-login/primary-id', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/primary-id', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/primary-id', function (req, res) {
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
    res.render('alt-routes-v6/post-one-login/primary-id', {
      errorPrimaryId: true,
      errorList: errors
    })
  } else {
    res.redirect('/alt-routes-v6/post-one-login/primary-id-upload')
  }
})

// ******* primary-id-upload javascript ********************************
router.get('/alt-routes-v6/post-one-login/primary-id-upload', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/primary-id-upload', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/primary-id-upload', function (req, res) {
  res.redirect('/alt-routes-v6/post-one-login/secondary-id')
})


// ******* secondary-id javascript ********************************
router.get('/alt-routes-v6/post-one-login/secondary-id', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/secondary-id', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/secondary-id', function (req, res) {
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
    res.render('alt-routes-v6/post-one-login/secondary-id', {
      errorSecondaryId: true,
      errorList: errors
    })
  } else {
    res.redirect('/alt-routes-v6/post-one-login/secondary-id-upload')
  }
})

// ******* secondary-id-upload javascript ********************************
router.get('/alt-routes-v6/post-one-login/secondary-id-upload', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/secondary-id-upload', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/secondary-id-upload', function (req, res) {
  res.redirect('/alt-routes-v6/post-one-login/upload-id-video')
})



// ******* upload-id-video javascript ********************************
router.get('/alt-routes-v6/post-one-login/upload-id-video', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/upload-id-video', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/upload-id-video', function (req, res) {
  res.redirect('/alt-routes-v6/post-one-login/declaration')
})


// ******* declaration javascript ********************************
router.get('/alt-routes-v6/post-one-login/declaration', function (req, res) {
  // Set URl
  res.render('/alt-routes-v6/post-one-login/declaration', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/declaration', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['declaration'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select the declaration',
      href: '#declaration'
    })

    // Re-show page with error value as true so errors will show
    res.render('/alt-routes-v6/post-one-login/declaration', {
      errorDeclaration: true,
      errorList: errors
    })
  } else {
      res.redirect('/alt-routes-v6/post-one-login/vouching-intro')
  }
})


// ******* applicant-details javascript ******************************
router.get('/alt-routes-v6/post-one-login/voucher-details', function (req, res) {
  // Set URl
  res.render('alt-routes-v6/post-one-login/voucher-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/alt-routes-v6/post-one-login/voucher-details', function (req, res) {
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
    res.render('alt-routes-v6/post-one-login/voucher-details', {
      errorVoucherName: voucherNameError,
      errorVoucherEmail: voucherEmailError,
      errorVoucherRole: voucherRoleError,
      errorVoucherDetails: detailsError,
      errorList: errors
    })
  } 
  else  
  {res.redirect('/alt-routes-v6/post-one-login/check-details')}
})


module.exports=router;