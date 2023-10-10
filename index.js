var express=require("express");
var cors=require("cors");
var path=require("path");
var rutas=require("./rutas/usuariosRutas")
var rutasPro=require("./rutas/productosRutas")
var rutasUsuariosApis=require("./rutas/usuariosRutasApis")
var rutasProductosApis=require("./rutas/productosRutasApis")
require("dotenv").config();

var app=express();
app.set("view engine","ejs")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:process.env.SESSION_SECRETO,
    resave:true,
    saveUnitialized:true
}));

app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutas);
app.use("/productos",rutasPro);// get /productos
app.use("/",rutasUsuariosApis);// get /apis
app.use("/",rutasProductosApis);// get /apis

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});