const express = require('express')
const mongoose =require('mongoose')
const port =4000;
const app =express();
const bodyparser=require('body-parser')

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/sample',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log('----db connected-----')
}).catch((err)=>{
console.log(err)
})

const productSchema = new mongoose.Schema({
    name:String,
    discription: String,
    price:Number
})

const Product =new mongoose.model('Product',productSchema)



app.get('/api/v1/products',async(req,res)=>{
   const products =await Product.find()
   res.status(200).json({
      success:true,
      products   
      
   })
})

app.post('/api/v1/product/new',async (req,res)=>{

   const product = await Product.create(req.body)

   res.status(200).json({
      success:true,
      product   
      
   })
})


app.put('/api/v1/product/:id',async (req,res)=>{
   // let product=await Product.findById(req.params.id);

  const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
   useFindAndModify:false,
   runValidators:true
   })

   res.status(200).json({
      success:true,
      product
   })

})

app.delete('/api/v1/product/:id',async (req,res)=>{

   const product =await Product.findById(req.params.id)

   if(!product){
      return res.status(500).json({
         success:false,
         message:'product not found'
      })
   }

   product.remove()

   res.status(200).json({
      success:true,
      message:'product removed successfully'
   })


})


app.listen(port,()=>{
    console.log(`server is working on port ${port} `)
})