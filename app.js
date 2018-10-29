const express = require('express')
const app = express()

const logger = require('morgan')

const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

app.use(logger('dev'))

app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)

//handel erros
app.use((req, res, next) => {
	const error = new Error('Page Not Found')
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message
		}
	})
})

module.exports = app