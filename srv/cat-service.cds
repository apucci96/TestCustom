using test1 as tst from '../db/data-model';


service TestingCAP{
    entity Persona @(restrict : 
    [ 
        { 
            grant : [ 'READ' ], 
            to : [ 'TestViewer' ] 
        }, 
        { 
            grant : [ '*' ], 
            to : [ 'TestManager' ] 
        } 
    ]) as projection on tst.Persona;

    entity Empresa @(restrict : 
    [ 
        { 
            grant : [ 'READ' ], 
            to : [ 'TestViewer' ] 
        }, 
        { 
            grant : [ '*' ], 
            to : [ 'TestManager' ] 
        } 
    ]) as projection on tst.Empresa;

    entity Factura @(restrict : 
    [ 
        { 
            grant : [ 'READ' ], 
            to : [ 'TestViewer' ] 
        }, 
        { 
            grant : [ '*' ], 
            to : [ 'TestManager' ] 
        } 
    ]) as projection on tst.Factura;
    
    entity Documento @(restrict : 
    [ 
        { 
            grant : [ 'READ' ], 
            to : [ 'TestViewer' ] 
        }, 
        { 
            grant : [ '*' ], 
            to : [ 'TestManager' ] 
        } 
    ]) as projection on tst.Documento;

    define type DataString {
        value : String;
    }

    define type DataInteger {
        value : Integer;
    }

    define type DataList {
        ID      : Integer;
        dni     : Integer;
        apellido: String;
        nombre  : String;
        empresa : Integer;
        error   : Integer;
        message : String;
        max     : Integer;
    }

    define type DataListArray {
        responseArray : array of DataList;
    }

    @Core.Description : 'listar todos en Persona'
    function listarPersona() returns DataListArray;

    @Core.Description : 'listar todos en Empresa'
    function listarEmpresa() returns DataListArray;

    @Core.Description : 'Devuelve el ID de Persona proximo disponible'
    function nextID_Persona() returns DataString;

    @Core.Description : 'Devuelve el ID de Empresa proximo disponible'
    function nextID_Empresa() returns DataString;

    @Core.Description : 'agregar elemento en Empresa'
    action agregarEmpresa(id : Integer, nombre : String ) returns DataString;

}