package com.dentallab.backend.apirest.models.services;

import java.util.List;

import com.dentallab.backend.apirest.models.entity.Materiales;

public interface IMaterialService {
	public List<Materiales> findAll();
	
	public Materiales findById(Integer id);
	
	public Materiales save(Materiales agrMaterial);
	
	public void delete(Integer id);
}
