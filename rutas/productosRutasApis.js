var rutaPro=require("express").Router();
var subirArchivo=require("../middlewares/subirArchivo");
var { mostrarProductos, nuevoProducto, modificarProducto, borrarProducto, buscarPorIDP } = require("../bd/productosBD");

//productos
rutaPro.get("/api/mostrarProductos",async(req,res)=>{
    var productos =await mostrarProductos();
    //console.log(productos);
    //res.end();
    //MUESTRA LOS USUARIOS
    if(productos.length > 0)
        res.status(200).json(productos);
    else{
        res.status(400).json("No hay Productos para mostrar");
    }
});

rutaPro.post("/api/nuevoProducto",subirArchivo(),async (req,res)=>{
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto registrado");
    }
    else{
        res.status(400).json("Datos incorrectos del producto");
    }
});

rutaPro.get("/api/buscarProductoPorId/:id",async(req,res)=>{
    var prod= await buscarPorIDP(req.params.id);
    //res.render("Productos/modificarP",{prod});
    if(prod==""){
        res.status(400).json("No se encontro ese Producto");
    }
    else{
        res.status(200).json(prod);
    }
});

rutaPro.post("/api/editarProducto",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error = await modificarProducto(req.body);
    //res.redirect("/mostrarP");
    if(error==0){
        res.status(200).json("Producto Modificado");
    }
    else{
        res.status(400).json("No se modifico el Producto");
    }
});

rutaPro.get("/api/borrarProducto/:id" ,async(req,res)=>{
    var error=await borrarProducto(req.params.id);
    //res.redirect("/productos/productos");
    if(error==0){
        res.status(200).json("Producto Borrado");
    }
    else{
        res.status(400).json("Error al Borrar el Producto o ya esta eliminado");
    }

});
module.exports=rutaPro;