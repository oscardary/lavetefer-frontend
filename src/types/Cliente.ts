export interface interfaceCliente {
  doc_tipo: string;
  doc_numero: string;
  cli_nombre: string;
  cli_apellido: string;
  num_contacto1: string;
  num_contacto2: string;
  id_ciudad: string;
  direccion1: string;
  direccion2: string;
  observaciones: string;
};

export interface interfaceClienteId extends interfaceCliente {
  id: number;
};