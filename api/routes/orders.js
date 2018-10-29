const express = require('express')
const router = express.Router()

// handling orders request
router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'GET requests /orders'
	})
})

router.post('/', (req, res, next) => {
	const order = {
		productId: req.body.productId,
		quantity: req.body.quantity
	}
	res.status(201).json({
		message: 'POST requests /orders',
		order: order
	})
})

router.get('/:orderId', (req, res, next) => {
	const id = req.params.orderId
	res.status(200).json({
		message: 'GET order',
			id: id
	})
})

router.patch('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: 'Update order'
	})
})

router.delete('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: 'Deleted order'
	})
})

module.exports = router
