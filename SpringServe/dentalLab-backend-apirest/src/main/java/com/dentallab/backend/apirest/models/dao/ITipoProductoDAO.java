package com.dentallab.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.dentallab.backend.apirest.models.entity.TipoProducto;

public interface ITipoProductoDAO extends CrudRepository<TipoProducto, Integer> {

}
