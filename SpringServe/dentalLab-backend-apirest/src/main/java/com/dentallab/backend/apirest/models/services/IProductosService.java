package com.dentallab.backend.apirest.models.services;

import java.util.List;

import com.dentallab.backend.apirest.models.entity.Productos;


public interface IProductosService {
	public List<Productos> findAll();
	
	public Productos findById(Integer id);
	
	public Productos save(Productos agrProducto);
	
	public void deleteById(Integer id);
}
