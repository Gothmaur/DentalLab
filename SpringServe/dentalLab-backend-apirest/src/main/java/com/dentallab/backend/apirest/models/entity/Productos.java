package com.dentallab.backend.apirest.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tbl_productos")
public class Productos implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="tbl_productos_id")
	private int id;
	
	@Column(name="tbl_productos_nombre", nullable=false)
	private String nombre;
	
	@Column(name="tbl_productos_descripción", nullable=false)
	private String descripcion;

	@ManyToOne
    @JoinColumn(name = "tbl_productos_tipo", nullable = false)
	private TipoProducto tipo;

	@Column(name="tbl_productos_precio", nullable=false)
	private String precio;

	@Column(name="tbl_productos_cotizar", nullable=false)
	private Boolean cotizar;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public TipoProducto getTipo() {
		return tipo;
	}

	public void setTipo(TipoProducto tipo) {
		this.tipo = tipo;
	}

	public String getPrecio() {
		return precio;
	}

	public void setPrecio(String precio) {
		this.precio = precio;
	}

	public Boolean getCotizar() {
		return cotizar;
	}

	public void setCotizar(Boolean cotizar) {
		this.cotizar = cotizar;
	}
  
	
	
}
