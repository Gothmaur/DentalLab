package com.dentallab.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dentallab.backend.apirest.data.objects.LoginRequest;
import com.dentallab.backend.apirest.models.entity.Usuarios;
import com.dentallab.backend.apirest.models.services.IUsuarioService;

@CrossOrigin(origins = {"http://localhost:4200"}, methods = {RequestMethod.GET, RequestMethod.PUT,RequestMethod.POST,RequestMethod.DELETE} )
@RestController
@RequestMapping("/api")
public class UsuarioRestControl {

	@Autowired
	private IUsuarioService usuarioService;
	
	@GetMapping("/users")
	public List<Usuarios> index(){
		return usuarioService.findAll();
	}
	
	@GetMapping("/users/{id}")
	public Usuarios show(@PathVariable Integer id) {
		return usuarioService.findById(id);
	}
	
	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public Usuarios create(@RequestBody Usuarios usuario) {
		return usuarioService.save(usuario);
	}
	
	@PutMapping("/users/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Usuarios update(@RequestBody Usuarios usrToUpdate, @PathVariable Integer id) {
		Usuarios usrActual = usuarioService.findById(id);
		
		usrActual.setNombre(usrToUpdate.getNombre());
		usrActual.setApellido1(usrToUpdate.getApellido1());
		if(usrToUpdate.getApellido2()!=null) usrActual.setApellido2(usrToUpdate.getApellido2());
		usrActual.setEmail(usrToUpdate.getEmail());
		usrActual.setClave(usrToUpdate.getClave());
		usrActual.setDireccion(usrToUpdate.getDireccion());
		usrActual.setTelefono(usrToUpdate.getTelefono());
		usrActual.setTipo(usrToUpdate.getTipo());
		usrActual.setToken(usrToUpdate.getToken());
		
		return usuarioService.save(usrActual);
	}
	
	@DeleteMapping("/users/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		usuarioService.delete(id);
	}
	//Intento de consulta por email y clave
	@PostMapping("/login")
    public  Usuarios findByEmailAndClave(@RequestBody LoginRequest login) {
        Usuarios usr = usuarioService.findByEmailAndClave(login.getEmail(), login.getClave());
		if (usr != null) {
	        // El usuario se autenticó correctamente
	        
	        // Devuelve el token en el cuerpo de la respuesta
	        return usr;
	    } else {
	        // El usuario no se autenticó correctamente
	        return null;
	    }
    }
	//Intento de consulta por token
	@GetMapping("/authenticated")
	public Usuarios findByToken(@RequestParam String token) {
	    return usuarioService.findByToken(token);
	}
	
	
}
