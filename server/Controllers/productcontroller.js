const { query } = require('express')
const Products = require('../models/productmodels')

//Filter,Sorting,Pagition
class APIFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString
    }
    filtering(){
            const querObj = {...this.queryString}
            const excludedFields = ['page','sort','limit']
        excludedFields.forEach(el=>delete(querObj[el]))

        let queryStr = JSON.stringify(querObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)
        this.query.find(JSON.parse(queryStr))
        
        return this
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            
            this.query = this.query.sort(sortBy)

            console.log(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this
    }
    pagition(){
        const page = this.queryString.page *1 || 1

        const limit = this.queryString.limit * 1 ||9

        const skip = (page-1) * limit

        this.query = this.query.skip(skip).limit(limit);

        return this
    }   
}

const productcontrol  = {
    getproduct:async(req,res)=>{
        try{
            const features = new APIFeatures(Products.find(),req.query).filtering().sorting().pagition()
            const products = await features.query

            res.json({status:'success',
            result: products.length,
        products:products})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createproduct:async(req,res)=>{
        try{
            const {product_id,title,price,description,content,images,category} = req.body
            if(!images) return res.status(500).json({msg:"No Image uploded" })
            
            const product = await Products.findOne({product_id})
            if(product)
            return res.status(500).json({msg:"The product already exists" })         
            
            const new_product = new Products({
                product_id,title:title.toLowerCase(),price,description,content,images,category
            })
            await new_product.save()
            res.json({msg:"Create a Product"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    deleteproduct:async(req,res)=>{
        try{
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted Product"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    updateproduct:async(req,res)=>{
        try{
            const {title,price,description,content,images,category} = req.body
            if(!images) return res.status(500).json({msg:"No image Upload"})
            await Products.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),price,description,content,images,category,
        })
            res.json({msg:"Updated Product"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    }
}

module.exports = productcontrol