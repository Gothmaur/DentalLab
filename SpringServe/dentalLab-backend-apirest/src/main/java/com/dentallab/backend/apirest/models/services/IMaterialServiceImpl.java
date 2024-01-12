package com.dentallab.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dentallab.backend.apirest.models.dao.IMaterialDao;
import com.dentallab.backend.apirest.models.entity.Materiales;

@Service
public class IMaterialServiceImpl implements IMaterialService {

	@Autowired
	private IMaterialDao materialDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Materiales> findAll() {
		// TODO Auto-generated method stub
		return (List<Materiales>)materialDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Materiales findById(Integer id) {
		// TODO Auto-generated method stub
		return materialDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Materiales save(Materiales agrMaterial) {
		// TODO Auto-generated method stub
		return materialDao.save(agrMaterial);
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		materialDao.deleteById(id);
	}

}
