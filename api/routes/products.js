const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'GET requests /products'
	})
})

router.post('/', (req, res, next) => {
	res.status(200).json({
		message: 'POST requests /products'
	})
})

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId
	if(id === 'special') {
		res.status(200).json({
			message: 'GET special',
			id: id
		})
	} else {
		res.status(200).json({
			message: 'GET not special',
			id: id
		})
	}
})

router.patch('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Update product'
	})
})

router.delete('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Deleted product'
	})
})



module.exports = router;