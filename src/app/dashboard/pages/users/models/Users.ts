export interface User{
    id: number;
    nombre:string;
    apellido1:string;
    apellido2:string;
    telefono:string;
    direccion:string;
    email:string;
    clave:string;
    token:string;
    tipo:string;
}

export interface UserCreation{
    nombre:string;
    apellido1:string;
    apellido2:string;
    telefono:string;
    direccion:string;
    email:string;
    clave:string;
    tipo:string;
}

export interface UserUpdating{
    nombre?:string;
    apellido1?:string;
    apellido2?:string;
    telefono?:string;
    direccion?:string;
    email?:string;
    clave?:string;
    tipo?:string;
}
