namespace test1;
using { managed } from '@sap/cds/common';

entity Persona {
    key ID      : Integer;
    apellido    : localized String;
    nombre      : localized String;
    dni         : Integer;
    empresa     : Association to Empresa;
}

entity Empresa{
    key ID  : Integer;
    nombre  : localized String;
}

entity Factura : managed {
    key ID      : Integer;
    emisor      : Association to Persona;
    subtotal    : Decimal;
    documento   : Association to Documento;
}

entity Documento : managed {
    key ID              : UUID;
    @Core.MediaType: mediatype
    content             : LargeBinary;
    @Core.IsMediaType: true
    mediatype           : String;
}