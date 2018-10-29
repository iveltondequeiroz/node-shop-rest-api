const express = require('express')
const app = express()

const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

// starting db
var uri = 'mongodb+srv://ivelton:'+process.env.MONGO_ATLAS_WP+"@cluster0.mongodb.net/test";
mongoose.connect(uri, {useMongoClient:true})

console.log("process.env.MONGO_ATLAS_DB", process.env.MONGO_ATLAS_DB)
console.log("process.env.MONGO_ATLAS_PW", process.env.MONGO_ATLAS_PW)

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