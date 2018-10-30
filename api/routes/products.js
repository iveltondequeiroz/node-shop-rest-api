const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')	


router.get('/', (req, res, next) => {
	Product.find()
		.exec()
		.then(docs => {
			console.log('docs:', docs)
			res.status(200).json(docs)	
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
})

router.post('/', (req, res, next) => {
	// create new product
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price	
	})

	product.save().then( result => {
		console.log('result:', result)
		res.status(201).json({
			message: 'POST requests /products',
			createdProduct: result
		})
	}).catch( err => {
		console.log('err', err)
		res.status(500).json({ 
			error: err
		})
	})
})

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId
	Product.findById(id)
		.exec()
		.then(doc => {
			console.log('doc from db', doc)
			if(doc){
				res.status(200).json(doc)	
			} else {
				res.status(404).json({
					message:'No valid entry found for id:'+id
				})
			}
			
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ error: err})
		})
})

router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId
	const updateOps = {}
	for(const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}
	Product.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result =>{
			console.log('patch result', result)
			res.status(200).json({
				message: result
			})
		})
		.catch(err => {
			console.log('patch err', err)
			res.status(500).json({
				error: err
			})
		})
})

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId
	Product.remove({_id:id})
		.exec()
		.then(result => {
			res.status(200).json({
				message: result
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
})



module.exports = router;