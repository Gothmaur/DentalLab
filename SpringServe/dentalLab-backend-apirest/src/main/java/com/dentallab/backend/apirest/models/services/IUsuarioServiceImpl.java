package com.dentallab.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dentallab.backend.apirest.models.dao.IUsuarioDao;
import com.dentallab.backend.apirest.models.entity.Usuarios;

@Service
public class IUsuarioServiceImpl implements IUsuarioService{

	@Autowired
	private IUsuarioDao usuarioDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Usuarios> findAll() {
		return (List<Usuarios>)usuarioDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Usuarios findById(Integer id) {
		return usuarioDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Usuarios save(Usuarios agrUsuario) {
		return usuarioDao.save(agrUsuario);
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		usuarioDao.deleteById(id);
	}

	//Intento de consulta por email y clave
	@Override
    @Transactional(readOnly = true)
    public Usuarios findByEmailAndClave(String email, String clave) {
        return usuarioDao.findByEmailAndClave(email, clave);
    }
	
	//Intento de consulta por email y clave
	@Override
	@Transactional(readOnly = true)
	public Usuarios findByToken(String token) {
	    return usuarioDao.findByToken(token);
	}
		

	


}
