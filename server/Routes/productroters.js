const router = require('express').Router()
const producrcontrol = require('../Controllers/productcontroller')

router.route('/product')
.get(producrcontrol.getproduct)
.post(producrcontrol.createproduct)

router.route('/product/:id')
.delete(producrcontrol.deleteproduct)
.put(producrcontrol.updateproduct)

module.exports = router