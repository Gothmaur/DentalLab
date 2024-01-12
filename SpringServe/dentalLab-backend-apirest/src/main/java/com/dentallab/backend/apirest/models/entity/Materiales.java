package com.dentallab.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tbl_materiales")
public class Materiales implements Serializable {


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tbl_materiales_id")
    private int id;

    @Column(name = "tbl_materiales_material", nullable = false)
    private String material;

    @Column(name = "tbl_materiales_fecha_ingreso", nullable = false)
    @JsonProperty("fecha_ingreso")
    private Date fecha_ingreso;

    @Column(name = "tbl_materiales_fecha_caducidad", nullable = false)
    @JsonProperty("fecha_caducidad")
    private Date fecha_caducidad;

    @Column(name = "tbl_materiales_proveedor", nullable = false)
    private String proveedor;

    @Column(name = "tbl_materiales_descripcion", nullable = false)
    private String descripcion;

    @Column(name = "tbl_materiales_unidad_medida", nullable = false)
    @JsonProperty("unidad_medida")
    private String unidad_medida;

    @Column(name = "tbl_materiales_precio", nullable = false)
    private int precio;

    @Column(name = "tbl_materiales_cantidad_disponible", nullable = false)
    @JsonProperty("cantidad_disponible")
    private Integer cantidad_disponible;

    // Getters y Setters

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public Date getFechaIngreso() {
		return fecha_ingreso;
	}

	public void setFechaIngreso(Date fechaIngreso) {
		this.fecha_ingreso = fechaIngreso;
	}

	public Date getFechaCaducidad() {
		return fecha_caducidad;
	}

	public void setFechaCaducidad(Date fechaCaducidad) {
		this.fecha_caducidad = fechaCaducidad;
	}

	public String getProveedor() {
		return proveedor;
	}

	public void setProveedor(String proveedor) {
		this.proveedor = proveedor;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getUnidadMedida() {
		return unidad_medida;
	}

	public void setUnidadMedida(String unidadMedida) {
		this.unidad_medida = unidadMedida;
	}

	public Integer getPrecio() {
		return precio;
	}

	public void setPrecio(Integer precio) {
		this.precio = precio;
	}

	public Integer getCantidadDisponible() {
		return cantidad_disponible;
	}

	public void setCantidadDisponible(Integer cantidadDisponible) {
		this.cantidad_disponible = cantidadDisponible;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
