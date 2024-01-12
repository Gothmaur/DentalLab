package com.dentallab.backend.apirest.models.services;

import java.util.List;

import com.dentallab.backend.apirest.models.entity.Usuarios;

public interface IUsuarioService {

	public List<Usuarios> findAll();
	
	public Usuarios findById(Integer id);
	
	public Usuarios save(Usuarios agrUsuario);
	
	public void delete(Integer id);
	
	//Intento de consulta por email y clave:
	public Usuarios findByEmailAndClave(String email, String clave);
	//Intento de consulta por token
	public Usuarios findByToken(String token);
	//Intento de consulta por token
	public List<Usuarios> findAllByTipo(String tipo);

}
