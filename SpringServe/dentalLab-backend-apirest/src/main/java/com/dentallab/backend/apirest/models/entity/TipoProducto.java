package com.dentallab.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="tbl_tipoProducto")
public class TipoProducto implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="tbl_tipoProducto_id")
	private int id;
	
	@Column(name="tbl_tipoProducto_nombre", nullable=false)
	private String nombre;
	
	@Column(name="tbl_tipoProducto_Descripción", nullable=false)
	private String desc;
	
	@OneToMany(mappedBy = "tipo")
    private List<Productos> productos;
	
	



	public void setProductos(List<Productos> productos) {
		this.productos = productos;
	}



	public static long getSerialversionuid() {
		return serialVersionUID;
	}



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



	public String getDesc() {
		return desc;
	}



	public void setDesc(String desc) {
		this.desc = desc;
	}


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
