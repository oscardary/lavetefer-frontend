export interface IMascota {
    propietario: number;
    nombre: string;
    especie: string;
    raza: string;
    sexo: string;
    color: string;
    complemento: string;
    fecha_nacimiento: string;
    edad: number;
    procedencia: string;
}

export interface IMascotaExt extends IMascota {
  id: number;
  fk_propietario: {
    cli_nombre: string;
    cli_apellido: string;
  };
}