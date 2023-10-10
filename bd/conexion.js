var admin=require("firebase-admin");
var keys=require("../keys.json");
admin.initializeApp({
    credential:admin.credential.cert(keys)
});
var micuenta=admin.firestore();
var conexion=micuenta.collection("miejemploBd");
var conexionProd=micuenta.collection("productos");

module.exports={
    conexion,
    conexionProd
};