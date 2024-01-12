package com.dentallab.backend.apirest.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.dentallab.backend.apirest.models.entity.Usuarios;

public interface IUsuarioDao extends CrudRepository<Usuarios, Integer> {
	
	//Intento de consulta por ID y clave:
	Usuarios findByEmailAndClave(String email, String clave);
	
	//Intento de consulta token:
	Usuarios findByToken(String token);
	
	//Intento de consulta Tipo:
	List<Usuarios> findAllByTipo(String tipo);
}
