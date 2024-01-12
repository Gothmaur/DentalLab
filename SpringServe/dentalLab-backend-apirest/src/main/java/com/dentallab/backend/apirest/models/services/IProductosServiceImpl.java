package com.dentallab.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dentallab.backend.apirest.models.dao.IProductosDao;
import com.dentallab.backend.apirest.models.entity.Productos;

@Service
public class IProductosServiceImpl implements IProductosService {

	@Autowired
	private IProductosDao productDao;
	
	@Override
	public List<Productos> findAll() {
		// TODO Auto-generated method stub
		return (List<Productos>)productDao.findAll();
	}

	@Override
	public Productos findById(Integer id) {
		// TODO Auto-generated method stub
		return productDao.findById(id).orElse(null);
	}

	@Override
	public Productos save(Productos agrProducto) {
		// TODO Auto-generated method stub
		return productDao.save(agrProducto);
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		productDao.deleteById(id);
	}

}
