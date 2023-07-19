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
}