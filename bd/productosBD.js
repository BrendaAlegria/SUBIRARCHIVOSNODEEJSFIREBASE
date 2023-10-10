var conexion=require("./conexion").conexionProd;
var Producto=require("../modelos/Producto");
 
async function mostrarProductos(){ 
    var produc=[]; //es una arreglo lo que esta dentro se muestra
    try{
        var productos=await conexion.get();//pide todos los productos
        //console.log(productos);
        productos.forEach(producto=>{
        var prod=new Producto(producto.id,producto.data());
        //console.log(prod);
        if(prod.bandera==0){
            produc.push(prod.obtenerDatos);
        }
    });
    }
    catch(err){
        console.log("Error al recuperar Producto de la BD :"+err);
        produc=null;
    }
    //a esta 
    return produc;
}

async function buscarPorIDP(id){
    var prod;
    try{
        var producto=await conexion.doc(id).get();
        var productoObjeto=new Producto(producto.id,producto.data());
        if(productoObjeto.bandera==0){
            prod=productoObjeto;
        }
    }
    catch(err){
        console.log("Error al recuperar al usuario :"+err)
    }
    return prod;

}
//
async function nuevoProducto(datos){
    var prod=new Producto(null,datos);
    var error=1;
    //pregunta si pasa la prueba 
    if(prod.bandera==0){
        try{
                                //manda un objeto
            //manda informacion por ello ya no se declara como variable
            await conexion.doc().set(prod.obtenerDatos);
            console.log("Producto insertado a la BD");
            error=0;
        }
        catch(err){
            console.log("Error al capturar el nuevo Producto"+err);
        }
    }
    return error;
}
 
async function modificarProducto(datos){
    var error=1;
    var respuestaBuscarP=await buscarPorIDP(datos.id);
    if(respuestaBuscarP!=undefined){
        var prod=new Producto(datos.id,datos);
        if(prod.bandera==0){
            try{
                await conexion.doc(prod.id).set(prod.obtenerDatos);
                console.log("Registro actualizado");
                error=0;
            }
            catch(err){
                console.log("Error al modificar al Productooo:"+err);
            }
        }

    } 
    return error;
}

async function borrarProducto(id){
    var error=1;
    var prod=await buscarPorIDP(id);
    if(prod !=undefined){
        try{
            //el doc es para pasarle el id 
            await conexion.doc(id).delete();
            console.log("Registro del Producto Borrado");
            error=0;
        }
        catch(err){
            console.log("Error al borrar al Producto :"+err);
        }
    }
    return error;
    
}

module.exports={
    mostrarProductos,
    buscarPorIDP,
    nuevoProducto,
    modificarProducto,
    borrarProducto
}