package com.dentallab.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.dentallab.backend.apirest.models.entity.Materiales;

public interface IMaterialDao extends CrudRepository<Materiales, Integer>{
	
}
