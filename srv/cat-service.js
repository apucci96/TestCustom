const cds = require('@sap/cds')
module.exports = (srv) => {
//module.exports = function (){
    const {Persona} = cds.entities ('TestingCAP');
    const {Empresa}= cds.entities ('TestingCAP');

    srv.on('listarPersona', async req => {
        try{
            let filas = await SELECT.from(Persona);
            return {responseArray : filas};
        }catch(e) {
            return { responseArray : [{
                "error"   : 1,
                "message" : "Internal error: " + e.message
            }] }; 
        }
    });

    srv.on('listarEmpresa', async req => {
        try{
            let filas = await SELECT.from(Empresa);
            return {responseArray : filas};
        }catch(e) {
            return { responseArray : [{
                "error"   : 1,
                "message" : "Internal error: " + e.message
            }] }; 
        }
    });

    srv.on('nextID_Persona', async req => {
        try{
            let filas = await SELECT.from(Persona);
            let i = 0;
            let idValue = 0;
            while(filas[i] != null){
                if(idValue <= filas[i].ID){
                    idValue = filas[i].ID;
                }
                i = i + 1;
            }
            idValue = idValue + 1;
            return { value : idValue };
        }catch(e) {
            return { value : "Error: " + e.message }; 
        }
    });

    srv.on('nextID_Empresa', async req => {
        try{
            let filas = await SELECT.from(Empresa);
            let i = 0;
            let idValue = 0;
            while(filas[i] != null){
                if(idValue <= filas[i].ID){
                    idValue = filas[i].ID;
                }
                i = i + 1;
            }
            idValue = idValue + 1;
            return { value : idValue };
        }catch(e) {
            return { value : "Error: " + e.message }; 
        }
    });

    srv.on('agregarEmpresa', async (req) => {
        try{
            let values = req.data;
            let newID = values["id"];
            let newNombre = values["nombre"];
            let returnValue = newID + "-" + newNombre;
            let filas = await INSERT.into(Empresa).entries({ ID: newID, nombre : newNombre });
            return { value : returnValue }; 
        }catch(e){
            return { value : "Error: " + e.message }; 
        }
    });
}