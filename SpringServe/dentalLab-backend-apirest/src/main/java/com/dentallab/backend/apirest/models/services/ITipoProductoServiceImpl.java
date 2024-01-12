package com.dentallab.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dentallab.backend.apirest.models.dao.ITipoProductoDAO;
import com.dentallab.backend.apirest.models.entity.TipoProducto;

@Service
public class ITipoProductoServiceImpl implements ITipoProductoService {

	@Autowired
	private ITipoProductoDAO tpDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<TipoProducto> findAll() {
		// TODO Auto-generated method stub
		return (List<TipoProducto>)tpDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public TipoProducto findById(Integer id) {
		// TODO Auto-generated method stub
		return tpDao.findById(id).orElse(null);
	}

}
