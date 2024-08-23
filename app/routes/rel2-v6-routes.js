const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Show session data and URLs in the terminal  
router.use((req, res, next) => {  
  const log = {  
    method: req.method,  
    url: req.originalUrl,  
    data: req.session.data  
  }  
  console.log(JSON.stringify(log, null, 2))  
  next()  
}) 

// ******* have-you-verified javascript ********************************
router.get('/release2-v6/uvid-binding/have-you-verified', function (req, res) {
  // Set URl
  res.render('release2-v6/uvid-binding/have-you-verified', {
    currentUrl: req.originalUrl
  })
})

router.post('/release2-v6/uvid-binding/have-you-verified', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['haveVerified'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you have verified your identity with Companies House',
      href: '#haveVerified'
    })

    // Re-show page with error value as true so errors will show
    res.render('release2-v6/uvid-binding/have-you-verified', {
      errorHaveVerified: true,
      errorList: errors
    })
  } else {
    if (req.session.data['haveVerified'] === 'yes') {
      res.redirect('/release2-v6/uvid-binding/verified-details')
    } else {
      // User inputted value so move to next page
      res.redirect('/release2-v6/pre-one-login/one-login-intro')
    }
  }
})

// ******* verified-details javascript ******************************
router.get('/release2-v6/uvid-binding/verified-details', function (req, res) {
  // Set URl
  res.render('release2-v6/uvid-binding/verified-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/release2-v6/uvid-binding/verified-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var codeHasError = false
  var dayHasError = false
  var monthHasError = false
  var yearHasError = false
  var detailsError = false

  // Check if user has filled out a email
  if (req.session.data['personalCode'] === '') {
    // No value so add error to array
    codeHasError = true
    detailsError = true
    errors.push({
      text: 'Enter the correct Companies House personal code',
      href: '#personalCode'
    })
  }

  // Check if user has filled out a day
  if (req.session.data['verifiedDob-day'] === '') {
    // No value so add error to array
    dayHasError = true
    detailsError = true
    errors.push({
      text: 'The date must include a day',
      href: '#verifiedDob-day'
    })
  }
    
  // Check if user has filled out a month
  if (req.session.data['verifiedDob-month'] === 'Choose month') {
    // No value so add error to array
    monthHasError = true
    detailsError = true
    errors.push({
      text: 'The date must include a month',
      href: '#verifiedDob-day'
    })
  }
    
  // Check if user has filled out a year
  if (req.session.data['verifiedDob-year'] === '') {
    // No value so add error to array
    yearHasError = true
    detailsError = true
    errors.push({
      text: 'The date must include a year',
      href: '#verifiedDob-day'
    })
  }


  // Check if eother filed not filled out
  if (detailsError) {
    // Re-show page with error value as true so errors will show
    res.render('release2-v6/uvid-binding/verified-details', {
      errorVerified: detailsError,
      errorVerifiedDobDay: dayHasError,
      errorVerifiedDobMonth: monthHasError,
      errorVerifiedDobYear: yearHasError,
      errorList: errors
    })
  } else if (req.session.data['personalCode'] === '444-5555-6666'){
    errors.push({
    text: 'You have entered incorrect verification details. Check your Companies House personal code and date of birth, and try again.',
    href: '#personalCode'
    })
    
    res.render('release2-v6/uvid-binding/verified-details', {
      errorVerified: true,
      matchError: true,
      errorVerifiedDobDay: true,
      errorVerifiedDobMonth: true,
      errorVerifiedDobYear: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/release2-v6/uvid-binding/verified-details')
  }
})


// ******* one-login-start javascript ********************************
router.get('/release2-v6/one-login/one-login-start', function (req, res) {
  // Set URl
  res.render('release2-v6/one-login/one-login-start', {
    currentUrl: req.originalUrl
  })
})

router.post('/release2-v6/one-login/one-login-start', function (req, res) {
  res.redirect('/release2-v1/one-login/one-login-id')
})


// ******* one-login-id javascript ********************************
router.get('/release2-v6/one-login/one-login-id', function (req, res) {
  // Set URl
  res.render('release2-v6/one-login/one-login-id', {
    currentUrl: req.originalUrl
  })
})

router.post('/release2-v6/one-login/one-login-id', function (req, res) {
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
    res.render('release2-v6/one-login/one-login-id', {
      errorPhotoID: true,
      errorList: errors
    })
  } else {
    if (req.session.data['photoID'] == 'yes' ) {
      res.redirect('/release2-v6/one-login/one-login-working')
    } else {
      res.redirect('/release2-v6/one-login/one-login-post-office')
    }
  }
})


// ******* one-login-post-0ffice javascript ********************************
router.get('/release2-v6/one-login/one-login-post-office', function (req, res) {
  // Set URl
  res.render('release2-v6/one-login/one-login-post-office', {
    currentUrl: req.originalUrl
  })
})

router.post('/release2-v6/one-login/one-login-post-office', function (req, res) {
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
    res.render('release2-v6/one-login/one-login-post-office', {
      errorPostOffice: true,
      errorList: errors
    })
  } else {
    if (req.session.data['postOffice'] == 'no' ) {
      res.redirect('/release2-v6/one-login/one-login-another-way')
    } else 
    {
      res.redirect('/release1-v4/one-login/one-login-post-office')
    }
  }
})


// ******* one-login-another-way javascript ********************************
router.get('/release2-v6/one-login/one-login-another-way', function (req, res) {
  // Set URl
  res.render('release2-v6/one-login/one-login-another-way', {
    currentUrl: req.originalUrl
  })
})

router.post('/release2-v6/one-login/one-login-another-way', function (req, res) {
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
    res.render('release2-v6/one-login/one-login-another-way', {
      errorAnotherWay: true,
      errorList: errors
    })
  } else {
    if (req.session.data['anotherWay'] == 'onelogin' ) {
      res.redirect('/release2-v6/one-login/one-login-id')
    } else {
      res.redirect('/release2-v6/post-one-login/failure-evidence')
    }
  }
})


// ******* one-login/success validation ********************************
router.get('/release2-v6/one-login/success', function (req, res) {
  // Set URl
  res.render('release2-v6/one-login/success', {
    currentUrl: req.originalUrl
  })
})

router.post('/release2-v6/one-login/success', function (req, res) {
    res.redirect('/release2-v6/post-one-login/verified-success')
})


module.exports=router;