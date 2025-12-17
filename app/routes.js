//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.use('/', require('./routes/v1-routes.js'))
router.use('/', require('./routes/v2-routes.js'))
router.use('/', require('./routes/v3-routes.js'))
router.use('/', require('./routes/v4-routes.js'))
router.use('/', require('./routes/v5-routes.js'))
router.use('/', require('./routes/v6-routes.js'))
router.use('/', require('./routes/v7-routes.js'))
router.use('/', require('./routes/v8-routes.js'))

// release 1

router.use('/', require('./routes/rel1-v1-routes.js'))
router.use('/', require('./routes/rel1-v2-routes.js'))
router.use('/', require('./routes/rel1-v3-routes.js'))
router.use('/', require('./routes/rel1-v4-routes.js'))
router.use('/', require('./routes/rel1-v5-routes.js'))
router.use('/', require('./routes/rel1-v6-routes.js'))
router.use('/', require('./routes/rel1-dev-routes.js'))
router.use('/', require('./routes/rel1-dev-v2-routes.js'))
router.use('/', require('./routes/rel1-dev-v3-routes.js'))
router.use('/', require('./routes/rel1-post-office.js'))
router.use('/', require('./routes/rel1-post-office-v2.js'))
router.use('/', require('./routes/rel1-dev-v4-routes.js'))

// release 2

router.use('/', require('./routes/rel2-v1-routes.js'))
router.use('/', require('./routes/rel2-v2-routes.js'))
router.use('/', require('./routes/rel2-v3-routes.js'))
router.use('/', require('./routes/rel2-v4-routes.js'))
router.use('/', require('./routes/rel2-v5-routes.js'))

// release 3

router.use('/', require('./routes/rel3-dev-v1-routes.js'))

// code binding

router.use('/', require('./routes/code-binding-v1-routes.js'))

// Alt routes

router.use('/', require('./routes/altroutes-v1-routes.js'))
router.use('/', require('./routes/altroutes-v2-routes.js'))
router.use('/', require('./routes/altroutes-v3-routes-new.js'))
router.use('/', require('./routes/altroutes-v4-routes-new.js'))
router.use('/', require('./routes/altroutes-v5-routes-new.js'))
router.use('/', require('./routes/altroutes-v6-routes-new.js'))