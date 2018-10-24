const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'GET requests /orders'
	})
})

router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'POST requests /orders'
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
