
//const base = window.location.origin;
const base = "https://19a7dc72trial-trial.integrationsuitetrial-apim.us10.hana.ondemand.com/19a7dc72trial/test-custom";
const constantes = {
    input_persona_dni: "persona_dni",
    input_persona_ape: "persona_ape",
    input_persona_nom: "persona_nom",
    input_empresa_nom: "empresa_nom",
    grid_personas: "tablePersonas",
    classPersonaItem: "grid-personas-items",
    grid_empresas: "tableEmpresas",
    classEmpresaItem: "grid-empresas-items"
}

var busquedaPersonaDni = document.getElementById(constantes.input_persona_dni);
var busquedaPersonaApe = document.getElementById(constantes.input_persona_ape);
var tablaPersonas = document.getElementById(constantes.grid_personas);
var tablaEmpresas = document.getElementById(constantes.grid_empresas);
var busquedaEmpresaNom = document.getElementById(constantes.input_empresa_nom);

async function cargarTabla(origen){
    let datos;
    switch(origen){
        case "cargarPersona":
            limpiarTabla(tablaPersonas, constantes.classPersonaItem);
            datos = await obtenerPersonas();
            if(busquedaPersonaDni.value != ""){
                datos = filtrarDNI(datos);
            }
            llenarTabla(tablaPersonas, constantes.classPersonaItem, datos, origen);
            break;
        case "cargarEmpresa":
            limpiarTabla(tablaEmpresas, constantes.classEmpresaItem);
            datos = await obtenerEmpresas(true);
            llenarTabla(tablaEmpresas, constantes.classEmpresaItem, datos, origen);
            break;
    }
}


function obtenerPersonas(){
    return new Promise(function (resolve, reject) {
        let data;
        let url = base + "/testing-cap/Persona?$expand=empresa";
        if(busquedaPersonaApe.value != ""){
            url = url + "&$search=" + busquedaPersonaApe.value;
        }
        const xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = xhr.response.value;
                return resolve(data);
            } else {
                console.log(`Error: ${xhr.status}`);
                return resolve("");
            }
        };
    });
}

function obtenerEmpresas(flag){
    return new Promise(function (resolve, reject) {
        let data;
        let url = base + "/testing-cap/Empresa";
        if(busquedaEmpresaNom.value != "" && flag == true){
            url = url + "&$search=" + busquedaEmpresaNom.value;
        }
        const xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = xhr.response.value;
                return resolve(data);
            } else {
                console.log(`Error: ${xhr.status}`);
                return resolve("");
            }
        };
    });
}

function filtrarDNI(oldDatos){
    let newDatos = [];
    let i;
    for(i = 0; i < oldDatos.length; i++){
        if(oldDatos[i].dni == Number(busquedaPersonaDni.value)){
            newDatos.push(oldDatos[i]);
        }
    }
    return newDatos;
}

function llenarTabla(tabla, nombreClassItems, datos, origen){
    let i;
    if(datos.length == 0){
        alert("No hay registros.");
        return;
    }
    switch(origen){
        case "cargarPersona":
            for(i = 0; i < datos.length; i++){
                let divNombre   = document.createElement("div");
                let divApellido = document.createElement("div");
                let divDni      = document.createElement("div");
                let divEmpresa  = document.createElement("div");
                let divAcciones = document.createElement("div");

                divNombre.id = "nombre_" + datos[i].ID;
                divApellido.id = "apellido_" + datos[i].ID;
                divDni.id = "dni_" + datos[i].ID;
                divEmpresa.id = "empresa_" + datos[i].ID;

                if(datos[i].empresa != null){
                    divEmpresa.value = datos[i].empresa.ID;
                }else{
                    divEmpresa.value = 0;
                }
                

                divNombre.classList.add(nombreClassItems);
                divApellido.classList.add(nombreClassItems);
                divDni.classList.add(nombreClassItems);
                divEmpresa.classList.add(nombreClassItems);
                divAcciones.classList.add(nombreClassItems);

                let valorDni        = document.createTextNode(datos[i].dni);
                let valorApellido   = document.createTextNode(datos[i].apellido);
                let valorNombre     = document.createTextNode(datos[i].nombre);
                let valorEmpresa;
                if(datos[i].empresa != null){
                    valorEmpresa    = document.createTextNode(datos[i].empresa.nombre);
                }else{
                    valorEmpresa    = document.createTextNode("(EMPRESA ELIMINADA)");
                }
                
                let buttonBorrar = document.createElement("button");
                buttonBorrar.classList.add("borrar-button");
                buttonBorrar.setAttribute("onclick", ("eliminarDato('Persona'," + datos[i].ID + ");"));
                let textButtonBorrar = document.createTextNode("Borrar");
                buttonBorrar.appendChild(textButtonBorrar);

                let buttonModif = document.createElement("button");
                buttonModif.classList.add("modif-button");
                buttonModif.setAttribute("onclick",("modificarValor(this,'Persona'," + datos[i].ID + ");" ));
                let textButtonModif = document.createTextNode("Modificar");
                buttonModif.appendChild(textButtonModif);

                divDni.appendChild(valorDni);
                divApellido.appendChild(valorApellido);
                divNombre.appendChild(valorNombre);
                divEmpresa.appendChild(valorEmpresa);
                divAcciones.appendChild(buttonModif);
                divAcciones.appendChild(buttonBorrar);

                tabla.appendChild(divDni);
                tabla.appendChild(divApellido);
                tabla.appendChild(divNombre);
                tabla.appendChild(divEmpresa);
                tabla.appendChild(divAcciones);
            }
            break;
        case "cargarEmpresa":
            for(i = 0; i < datos.length; i++){
                let divEmpresa  = document.createElement("div");
                let divAcciones = document.createElement("div");

                divEmpresa.id = "e_empresa_" + datos[i].ID;
                divEmpresa.value = datos[i].ID;

                divEmpresa.classList.add(nombreClassItems);
                divAcciones.classList.add(nombreClassItems);

                let valorEmpresa = document.createTextNode(datos[i].nombre);

                let buttonBorrar = document.createElement("button");
                buttonBorrar.classList.add("borrar-button");
                buttonBorrar.setAttribute("onclick", ("eliminarDato('Empresa'," + datos[i].ID + ");"));
                let textButtonBorrar = document.createTextNode("Borrar");
                buttonBorrar.appendChild(textButtonBorrar);

                let buttonModif = document.createElement("button");
                buttonModif.classList.add("modif-button");
                buttonModif.setAttribute("onclick",("modificarValor(this,'Empresa'," + datos[i].ID + ");" ));
                let textButtonModif = document.createTextNode("Modificar");
                buttonModif.appendChild(textButtonModif);

                divEmpresa.appendChild(valorEmpresa);
                divAcciones.appendChild(buttonModif);
                divAcciones.appendChild(buttonBorrar);

                tabla.appendChild(divEmpresa);
                tabla.appendChild(divAcciones);
            }
            break;
    }
}

function limpiarTabla(tabla, nombreClassItems){
    let listaItems = document.getElementsByClassName(nombreClassItems);
    let i;
    if(listaItems.length > 0){
        for(i = 0; i < listaItems.length; i++){
            listaItems[i].remove();
            i = i - 1;
        }
    }
}

async function crearRegistro(origen){
    let buttonOrigen = document.getElementById(origen);
    switch(origen){
        case "crearPersona":
            let formulario = document.getElementById("formCrearPersona");
            let campoID     = document.getElementById("crearPersona_id");
            let campoDni    = document.getElementById("crearPersona_dni");
            let campoApe    = document.getElementById("crearPersona_ape");
            let campoNom    = document.getElementById("crearPersona_nom");
            let campoEmp    = document.getElementById("crearPersona_emp");
            let i;
            if(formulario.style.display == "none"){
                formulario.style.display = "";
                let personaID       = await obtenerNextIDPersona();
                let listaEmpresas   = await obtenerEmpresas(false);
                campoID.value = personaID;
                for(i = 0; i < listaEmpresas.length; i++){
                    let newOption = document.createElement("option");
                    let newText = document.createTextNode(listaEmpresas[i].nombre);
                    newOption.appendChild(newText);
                    newOption.setAttribute("value",listaEmpresas[i].ID);

                    campoEmp.appendChild(newOption);
                }
                buttonOrigen.innerHTML = "Cancelar registro";
            }else{
                formulario.style.display = "none";
                campoID.value = "";
                campoDni.value = "";
                campoApe.value = "";
                campoNom.value = "";
                for(i = 1; i < campoEmp.length; i++){
                    campoEmp.remove(i);
                    i = i - 1;
                }
                buttonOrigen.innerHTML = "Registrar Persona";
            }
            break;
        case "crearEmpresa":
            let emp_formulario  = document.getElementById("formCrearEmpresa");
            let emp_campoID     = document.getElementById("crearEmpresa_id");
            let emp_campoNom    = document.getElementById("crearEmpresa_nom");
            
            if(emp_formulario.style.display == "none"){
                emp_formulario.style.display = "";
                let empresaID = await obtenerNextIDEmpresa();
                emp_campoID.value = empresaID;
                buttonOrigen.innerHTML = "Cancelar registro";
            }else{
                emp_formulario.style.display = "none";
                emp_campoID.value = "";
                emp_campoNom.value = "";
                buttonOrigen.innerHTML = "Registrar Empresa";
            }
            break;
    }
}

function obtenerNextIDPersona(){
    return new Promise(function (resolve, reject) {
        let data;
        let url = base + "/testing-cap/Persona";
        let maxID = 0;
        let i;
        const xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = xhr.response.value;
                for(i = 0; i < data.length;i++){
                    if(data[i].ID > maxID){
                        maxID = data[i].ID 
                    }
                }
                maxID = maxID + 1;
                return resolve(maxID);
            } else {
                console.log(`Error: ${xhr.status}`);
                return resolve("");
            }
        };
    });
}

function obtenerNextIDEmpresa(){
    return new Promise(function (resolve, reject) {
        let data;
        let url = base + "/testing-cap/Empresa";
        let maxID = 0;
        let i;
        const xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = xhr.response.value;
                for(i = 0; i < data.length;i++){
                    if(data[i].ID > maxID){
                        maxID = data[i].ID 
                    }
                }
                maxID = maxID + 1;
                return resolve(maxID);
            } else {
                console.log(`Error: ${xhr.status}`);
                return resolve("");
            }
        };
    });
}

async function crearNuevaPersona(){
    let campoID     = document.getElementById("crearPersona_id");
    let campoDni    = document.getElementById("crearPersona_dni");
    let campoApe    = document.getElementById("crearPersona_ape");
    let campoNom    = document.getElementById("crearPersona_nom");
    let campoEmp    = document.getElementById("crearPersona_emp");
    let statusCall;
    if(campoID.value != "" && campoDni.value != "" && campoApe.value != "" && campoNom.value != "" && campoEmp.value != ""){
        call_crearPersona(campoID.value, campoDni.value, campoApe.value, campoNom.value, campoEmp.value)
        statusCall = await crearRegistro("crearPersona");
        setTimeout(cargarTabla("cargarPersona"),1000);
    }else{
        alert("Revisar los datos");
    }
}

async function crearNuevaEmpresa(){
    let campoID     = document.getElementById("crearEmpresa_id");
    let campoNom    = document.getElementById("crearEmpresa_nom");
    let statusCall;
    if(campoID.value != "" && campoNom.value != ""){
        call_crearEmpresa(campoID.value, campoNom.value);
        statusCall = await crearRegistro("crearEmpresa");
        setTimeout(cargarTabla("cargarEmpresa"),1000);
    }else{
        alert("Revisar los datos");
    }
}

function call_crearPersona(newID, newDni, newApellido ,newNombre, newEmpresaID){
    return new Promise(function (resolve, reject) {
        let url = base + "/testing-cap/Persona";
        let callbody = '{"ID":' + newID + ', "dni": ' + newDni + ', "apellido": "' + newApellido + '", "nombre": "' + newNombre + '", "empresa_ID": ' + newEmpresaID +'}';
        fetch(url,{
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
            redirect: 'follow',
            body: callbody
        })
        .then(response => response.text())
        .then(result => { 
            console.log(result);
            if(result.includes("error") == true){
                alert(result);
            }else{
                alert("La persona " + newApellido + ", " + newNombre + " se ha registrado exitosamente.");
            }
            resolve("OK");
        })
        .catch(error => {
            alert(error);
            resolve("ERROR");
        });
    });
}

function call_crearEmpresa(newID, newNombre){
    return new Promise(function (resolve, reject) {
        let url = base + "/testing-cap/Empresa";
        let callbody = '{"ID":' + newID + ', "nombre": "' + newNombre + '"}';
        fetch(url,{
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
            redirect: 'follow',
            body: callbody
        })
        .then(response => response.text())
        .then(result => { 
            console.log(result);
            if(result.includes("error") == true){
                alert(result);
            }else{
                alert("La empresa " + newNombre + " se ha registrado exitosamente.");
            }
            resolve("OK");
        })
        .catch(error => {
            alert(error);
            resolve("ERROR");
        });
    });
}

async function eliminarDato(origenSwitch, datoID){
    let respuesta;
    switch(origenSwitch){
        case "Persona":
            if(window.confirm("Este dato se eliminara de la tabla de Base de Datos. \n¿Estas seguro?") == true){
                respuesta = await eliminarPersona(datoID);
                console.log(respuesta);
                if(respuesta == "OK"){
                    alert("El registro fue eliminado correctamente!");
                }else{
                    alert("Hubo un error. Contactese con el Administrador.");
                }
                cargarTabla("cargarPersona");
            }
            break;
        case "Empresa":
            if(window.confirm("Este dato se eliminara de la tabla de Base de Datos y todas las personas asociadas a este dato perdera referencia. \n¿Estas seguro?") == true){
                respuesta = await eliminarEmpresa(datoID);
                console.log(respuesta);
                if(respuesta == "OK"){
                    alert("El registro fue eliminado correctamente!");
                }else{
                    alert("Hubo un error. Contactese con el Administrador.");
                }
                cargarTabla("cargarEmpresa");
            }
            break;
    }
}

async function modificarValor(nodo, origenSwitch, datoID){
    let valores;
    switch(origenSwitch){
        case "Persona":
            let campoDNI = document.getElementById("dni_" + datoID);
            let campoApe = document.getElementById("apellido_" + datoID);
            let campoNom = document.getElementById("nombre_" + datoID);
            let campoEmp = document.getElementById("empresa_" + datoID);
            nodo.setAttribute("onclick","modificarPersona(" + datoID + ");");
            nodo.innerHTML = "Modificar Registro";
            valores = {
                id:         datoID,
                dni:        Number(campoDNI.innerHTML),
                nombre:     campoNom.innerHTML,
                apellido:   campoApe.innerHTML,
                emp_id:     campoEmp.innerHTML,
                emp_nombre: campoEmp.value
            }

            console.log(valores);
            campoDNI.innerHTML = "";
            let inputDNI = document.createElement("input");
            inputDNI.value = valores.dni;
            inputDNI.id = "modifDNI";
            campoDNI.appendChild(inputDNI);

            campoApe.innerHTML = "";
            let inputApellido = document.createElement("input");
            inputApellido.value = valores.apellido;
            inputApellido.id = "modifApe";
            campoApe.appendChild(inputApellido);

            campoNom.innerHTML = "";
            let inputNombre = document.createElement("input");
            inputNombre.value = valores.nombre;
            inputNombre.id = "modifNom";
            campoNom.appendChild(inputNombre);

            let listaEmpresas   = await obtenerEmpresas(false);
            campoEmp.innerHTML = "";
            let inputEmpresa = document.createElement("select");
            inputEmpresa.id = "modifEmp";
            for(i = 0; i < listaEmpresas.length; i++){
                let newOption = document.createElement("option");
                let newText = document.createTextNode(listaEmpresas[i].nombre);
                newOption.appendChild(newText);
                newOption.setAttribute("value",listaEmpresas[i].ID);
                if(listaEmpresas[i].ID == valores.emp_id){
                    newOption.selected = true;
                }
                inputEmpresa.appendChild(newOption);
            }
            campoEmp.appendChild(inputEmpresa);
            break;
        case "Empresa":
            let eCampoNom = document.getElementById("e_empresa_" + datoID);
            nodo.setAttribute("onclick","modificarEmpresa(" + datoID + ");");
            nodo.innerHTML = "Modificar Registro";
            valores = {
                id:         datoID,
                nombre:     eCampoNom.innerHTML
            }
            console.log(valores);
            eCampoNom.innerHTML = "";
            let inputENombre = document.createElement("input");
            inputENombre.value = valores.nombre;
            inputENombre.id = "modifENom";
            eCampoNom.appendChild(inputENombre);
            break;
    }
}

function eliminarPersona(datoID){
    return new Promise(function (resolve, reject) {
        let data;
        let url = base + "/testing-cap/Persona(" + datoID + ")";
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE",url);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 204) {
                return resolve("OK");
            } else {
                console.log(`Error: ${xhr.status}`);
                return resolve("ERROR");
            }
        };
    });
}

function modificarEmpresa(datoID){
    return new Promise(function (resolve, reject) {
        let url = base + "/testing-cap/Empresa/" + datoID.toString();
        let modifEmp = document.getElementById("modifENom");
        let callbody = '{"ID":' + datoID + ', "nombre": "' + modifEmp.value + '"}';
        fetch(url,{
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
            redirect: 'follow',
            body: callbody
        })
        .then(response => response.text())
        .then(result => { 
            console.log(result);
            if(result.includes("error" == true)){
                alert(result);
            }else{
                alert("El registro se ha modificado!");
            }
            cargarTabla("cargarEmpresa");
            resolve("OK");
        })
        .catch(error => {
            alert(error);
            cargarTabla("cargarEmpresa");
            resolve("ERROR");
        });
    });
}

function modificarPersona(datoID){
    return new Promise(function (resolve, reject) {
        let url = base + "/testing-cap/Persona/" + datoID.toString();
        let modifDNI = document.getElementById("modifDNI");
        let modifApe = document.getElementById("modifApe");
        let modifNom = document.getElementById("modifNom");
        let modifEmp = document.getElementById("modifEmp");
        let callbody = '{"ID":' + datoID + ', "dni": ' + Number(modifDNI.value) + ', "apellido": "' + modifApe.value + '", "nombre": "' + modifNom.value + '", "empresa_ID": ' + modifEmp.value +'}';
        fetch(url,{
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
            redirect: 'follow',
            body: callbody
        })
        .then(response => response.text())
        .then(result => { 
            console.log(result);
            if(result.includes("error" == true)){
                alert(result);
            }else{
                alert("El registro se ha modificado!");
            }
            cargarTabla("cargarPersona");
            resolve("OK");
        })
        .catch(error => {
            alert(error);
            cargarTabla("cargarPersona");
            resolve("ERROR");
        });
    });
}

function eliminarEmpresa (datoID){
    return new Promise(function (resolve, reject) {
        let data;
        let url = base + "/testing-cap/Empresa(" + datoID + ")";
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE",url);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 204) {
                return resolve("OK");
            } else {
                console.log(`Error: ${xhr.status}`);
                return resolve("ERROR");
            }
        };
    });
}