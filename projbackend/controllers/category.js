const Category=require("../models/category");
// const formidable = require("formidable");


const express = require("express");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());



exports.getCategoryById=(req,res,next,id)=>{
   Category.findById(id).exec((err,cate)=>{
       if(err){
           return res.status(400).json({
               error:"Category not found in DB"
           })
       }
       req.category=cate;  
       next();
   })
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,category)=>{
         if (err) {
           return res.status(400).json({
             error: "not able to save the category"
           });
         }
         res.json({category});
    })
}

exports.getCategory=(req,res)=>{
  return res.json(req.category);
}


exports.getAllCategory=(req,res)=>{
  Category.find().exec((err,categories)=>{
    if (err) {
      return res.status(400).json({
        error: "no categories found" 
      });
    }
    res.json(categories);
  });
};

exports.updateCategory=(req,res)=>{
   console.log(`request=${req}`);
   console.log(`req.body=${req.body}`);
   console.log(`req.body.name=${req.body.name}`);
   console.log(`req.category=${req.category}`);
  const category=req.category;
  category.name=req.body.name; 
 
  category.save((err,updatedCategory)=>{
     if(err) {
          console.log(`backend side error=${err}`);
       return res.status(400).json({
       error: "failed to update category"
       });
     }
     console.log(updatedCategory);
     res.json(updatedCategory);
  });
}; 


// exports.updateCategory=(req,res)=>{
  
//  let form = new formidable.IncomingForm();
//  form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with cat",
//       });
//     }
    
//     //TODO restrictions on fields
//     let category = req.category;
//     category = _.extend(category, fields);

//     // handle file here
//     // if (file.photo) {
//     //   if (file.photo.size > 3000000) {
//     //     return res.status(400).json({
//     //       error: "file size too large",
//     //     });
//     //   }
//     //   product.photo.data = fs.readFileSync(file.photo.path);
//     //   product.photo.contentType = file.photo.type;
//     // }

//     //save to the db
//    category.save((err,category) => {
//      if (err) {
//        console.log(`backend side error=${err}`);
//        return res.status(400).json({
//          error: "failed to update category",
//        });
//      }
//      res.json(updatedCategory);
//    });
//   });
// }; 

exports.removeCategory=(req,res)=>{
  const category=req.category;
  category.remove((err,category)=>{
    if (err) {
      return res.status(400).json({
        error: "failed to delete category"
      });
    }
    res.json({
      message: `Successfully deleted ${category}`
    });

  })
   
}