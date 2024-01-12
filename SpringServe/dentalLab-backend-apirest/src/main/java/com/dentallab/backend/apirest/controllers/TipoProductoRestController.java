package com.dentallab.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dentallab.backend.apirest.models.entity.TipoProducto;
import com.dentallab.backend.apirest.models.services.ITipoProductoService;

@CrossOrigin(origins = {"http://localhost:4200"}, methods = {RequestMethod.GET} )
@RestController
@RequestMapping("/api")
public class TipoProductoRestController {

	
	@Autowired
	private ITipoProductoService tpService;
	
	@GetMapping("/tp")
	public List<TipoProducto> index(){
		return tpService.findAll();
	}
	
	@GetMapping("/tp/{id}")
	public TipoProducto show(@PathVariable Integer id) {
		return tpService.findById(id);
	}
}
