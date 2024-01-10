export interface Pedidos {
    id: number;
    dr_solicitante: string;
    paciente_tratamiento: string;
    fecha_recepcion: Date;
    fecha_entrega: Date;
    tipo_protesis: string;
    tipo_prueba: string;
    color_incisal_oclusal: string;
    color_medio: string;
    color_Cervical: string;
    modelo: boolean;
    impresion: boolean;
    antagonista: boolean;
    mordida: boolean;
    colorimetro: boolean;
    cucharillas: boolean;
    precio_total: number;
    abono: number;
    observaciones: string;
  }
  

export interface PedidoCreation{
    dr_solicitante: string;
    paciente_tratamiento: string;
    fecha_recepcion: Date;
    fecha_entrega: Date;
    tipo_protesis: string;
    tipo_prueba: string;
    color_incisal_oclusal: string;
    color_medio: string;
    color_Cervical: string;
    modelo: boolean;
    impresion: boolean;
    antagonista: boolean;
    mordida: boolean;
    colorimetro: boolean;
    cucharillas: boolean;
    precio_total: number;
    abono: number;
    observaciones: string;
}

export interface PedidoUpdating{
    
    dr_solicitante?: string;
    paciente_tratamiento?: string;
    fecha_recepcion?: Date;
    fecha_entrega?: string;
    tipo_protesis?: string;
    tipo_prueba?: string;
    color_incisal_oclusal?: string;
    color_medio?: string;
    color_Cervical?: string;
    modelo?: boolean;
    impresion?: boolean;
    antagonista?: boolean;
    mordida?: boolean;
    colorimetro?: boolean;
    cucharillas?: boolean;
    precio_total?: number;
    abono?: number;
    observaciones?: string;
}
