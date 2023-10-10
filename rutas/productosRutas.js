var rutaPro=require("express").Router();
var subirArchivo=require("../middlewares/subirArchivo");
var { mostrarProductos, nuevoProducto, modificarProducto, borrarProducto, buscarPorIDP } = require("../bd/productosBD");

//productos
rutaPro.get("/productos",async(req,res)=>{
    var productos =await mostrarProductos();
    //console.log(productos);
    //res.end();
    //MUESTRA LOS USUARIOS
    res.render("Productos/mostrarP",{productos});
});

rutaPro.get("/nuevoproducto",async (req,res)=>{
    res.render("Productos/nuevoP");
});

rutaPro.post("/nuevoproducto",subirArchivo(),async (req,res)=>{
    //console.log(req.file);
    req.body.foto=req.file.originalname;
    //console.log(req.body);
    //res.end();
    var error = await nuevoProducto(req.body);
    res.redirect("/productos/productos");
});

rutaPro.get("/editarP/:id",async(req,res)=>{
    var prod= await buscarPorIDP(req.params.id);
    res.render("Productos/modificarP",{prod});
});

rutaPro.post("/editarP",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error = await modificarProducto(req.body);
    res.redirect("/productos/productos");
});

rutaPro.get("/borrarP/:id" ,async(req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/productos/productos");

});
module.exports=rutaPro;