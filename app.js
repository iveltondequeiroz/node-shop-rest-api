const express = require('express')
const app = express()

const logger = require('morgan')
const bodyParser = require('body-parser')

const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

// middlewares
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS
app.use((req, res, next) => {
	req.header('Access-Control-Allow-Origin', '*')
	req.header(
		'Access-Control-Allow-Headers', 
		'Origin, X-Requested-With, Content-type, Accept, Authorization' 
	)
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return res.setStatus(200).json({})
	}
	next();
})

// routes
app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)

//errors handling
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