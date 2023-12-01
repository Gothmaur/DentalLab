export interface Products{
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    precio: number;
    profesor: string;
}

export interface ProductCreation{
    nombre: string;
    descripcion: string;
    tipo: string;
    precio: number;
    profesor: string;
}

export interface ProductUpdating{
    nombre?: string;
    descripcion?: string;
    tipo?: string;
    precio?: number;
    profesor?: string;
}
