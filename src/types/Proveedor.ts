export interface interfaceProveedores {
    doc_tipo: string;
    doc_numero: string;
    prov_nombre: string;
    banco_nombre: string;
    banco_tipo: string;
    banco_numero: string;
    contacto_nombre: string;
    contacto_numero: string;
};

export interface interfaceProveedoresId extends interfaceProveedores {
    id: number;
};