package com.dentallab.backend.apirest.models.services;

import java.util.List;

import com.dentallab.backend.apirest.models.entity.TipoProducto;

public interface ITipoProductoService {
	
	public List<TipoProducto> findAll();
	
	public TipoProducto findById(Integer id);

}
