package com.dentallab.backend.apirest.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_usuarios")
public class Usuarios implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="tbl_usuarios_id")
	private int id;
	
	@Column(name="tbl_usuarios_nombre", nullable=false)
	private String nombre;
	@Column(name="tbl_usuarios_primerApellido", nullable=false)
	private String apellido1;
	@Column(name="tbl_usuarios_segundoApellido")
	private String apellido2;
	@Column(name="tbl_usuarios_telefono", nullable=false)
	private String telefono;
	@Column(name="tbl_usuarios_direccion", nullable=false)
	private String direccion;
	@Column(name="tbl_usuarios_email", nullable=false, unique = true)
	private String email;
	@Column(name="tbl_usuarios_pass", nullable=false)
	private String clave;
	@Column(name="tbl_usuarios_token", nullable=false, unique = true)
	private String token;
	@Column(name="tbl_usuarios_tipo", nullable=false)
	private String tipo;
	
	//Getters & Setters
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
	public String getApellido1() {
		return apellido1;
	}
	public void setApellido1(String apellido1) {
		this.apellido1 = apellido1;
	}
	public String getApellido2() {
		return apellido2;
	}
	public void setApellido2(String apellido2) {
		this.apellido2 = apellido2;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getClave() {
		return clave;
	}
	public void setClave(String clave) {
		this.clave = clave;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
