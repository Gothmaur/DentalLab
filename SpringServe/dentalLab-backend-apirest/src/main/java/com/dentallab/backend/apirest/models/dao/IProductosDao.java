package com.dentallab.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.dentallab.backend.apirest.models.entity.Productos;

public interface IProductosDao extends CrudRepository<Productos, Integer>{

}
