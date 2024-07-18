const router = require('express').Router()
const categorycontrol = require('../Controllers/categorycontrol')
const auth = require('../middleware/auth')
const authadmin = require('../middleware/adminauth')

router.route('/category')
.get(categorycontrol.getCategories)
.post(auth,authadmin,categorycontrol.createCatgory)


router.route('/category/:id')
.delete(auth,authadmin,categorycontrol.deleteCategory)
.put(auth,authadmin,categorycontrol.updateCategory)

module.exports = router