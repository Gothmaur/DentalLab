export interface Products{
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    precio: number;
    cotizar: boolean;
}

export interface ProductCreation{
    nombre: string;
    descripcion: string;
    tipo: string;
    precio: number;
    cotizar: boolean;
}

export interface ProductUpdating{
    nombre?: string;
    descripcion?: string;
    tipo?: string;
    precio?: number;
    cotizar?: boolean;
}
