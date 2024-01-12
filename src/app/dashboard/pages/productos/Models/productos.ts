export interface Products{
    id: number;
    nombre: string;
    descripcion: string;
    tipo: TipoProducto;
    precio: number;
    cotizar: boolean;
}

export interface ProductCreation{
    nombre: string;
    descripcion: string;
    tipo: TipoProducto;
    precio: number;
    cotizar: boolean;
}

export interface ProductUpdating{
    [x: string]: any;
    nombre?: string;
    descripcion?: string;
    tipo?: TipoProducto;
    precio?: number;
    cotizar?: boolean;
}

export interface TipoProducto{
    id: number;
    nombre: string;
    desc:string;
}