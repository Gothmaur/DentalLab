export interface Inventarios{
    id: number,
    material: string,
    fecha_ingreso: Date,
    fecha_caducidad: Date,
    proveedor: string,
    descripcion: string,
    unidad_medida: string,
    precio: number,
    cantidad_disponible: string
}

export interface InventarioCreation{
    material: string,
    fecha_ingreso: Date,
    fecha_caducidad: Date,
    proveedor: string,
    descripcion: string,
    unidad_medida: string,
    precio: number,
    cantidad_disponible: string
}

export interface InventarioUpdating{
    material?: string,
    fecha_ingreso?: Date,
    fecha_caducidad?: Date,
    proveedor?: string,
    descripcion?: string,
    unidad_medida?: string,
    precio?: number,
    cantidad_disponible?: string
}
