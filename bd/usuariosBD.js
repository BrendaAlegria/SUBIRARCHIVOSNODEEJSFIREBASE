var conexion=require("./conexion").conexion;
var Usuario=require("../modelos/Usuario");

async function mostrarUsuarios(){ 
    var users=[]; //es una arreglo lo que esta dentro se muestra
    try{
        var usuarios=await conexion.get();//pide todos los usuarios
        //console.log(usuarios);
        usuarios.forEach(usuario=>{
        var user=new Usuario(usuario.id,usuario.data());
        //console.log(user);
        if(user.bandera==0){
            users.push(user.obtenerDatos);
        }
    });
    }
    catch(err){
        console.log("Error al recuperar usuario de la BD :"+err);
        users=null;
    }
    return users;
}

async function buscarPorID(id){
    var user;
    try{ 
        var usuario=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuario.id,usuario.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto;
        }
    }
    catch(err){
        console.log("Error al recuperar al usuario :"+err)
    }
    return user;
}

async function nuevoUsuario(datos){
    var user=new Usuario(null,datos);
    var error=1;
    //pregunta si pasa la prueba 
    if(user.bandera==0){
        try{
                                //manda un objeto
            //manda informacion por ello ya no se declara como variable
            await conexion.doc().set(user.obtenerDatos);
            console.log("Usuario insertado a la BD");
            error=0;
        }
        catch(err){
            console.log("Error al capturar el nuevo usuario"+err);
        }
    }
    return error;
}

async function modificarUsuario(datos){
    var error=1;
    var respuestaBuscar=await buscarPorID(datos.id);
    if(respuestaBuscar!=undefined){
        var user=new Usuario(datos.id,datos);
        if(user.bandera==0){
            try{
                await conexion.doc(user.id).set(user.obtenerDatos);
                console.log("Usuario actualizado");
                error=0;
            }
            catch(err){
                console.log("Error al modificar al usuario :"+err);
            }
        }   
    }
    
    return error;
}
async function borrarUsuario(id){
    var error=1;
    var user=await buscarPorID(id);
    if(user !=undefined){
        try{
            //el doc es para pasarle el id 
            await conexion.doc(id).delete();
            console.log("Registro Borrado");
            error=0;
        }
        catch(err){
            console.log("Error al borrar al usuario :"+err);
        }
    }
    return error;
    
}       

module.exports={
    mostrarUsuarios,
    buscarPorID,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario
}