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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dentallab.backend.apirest.models.entity.Productos;
import com.dentallab.backend.apirest.models.services.IProductosService;


@CrossOrigin(origins = {"http://localhost:4200"}, methods = {RequestMethod.GET, RequestMethod.PUT,RequestMethod.POST,RequestMethod.DELETE} )
@RestController
@RequestMapping("/api")
public class ProductoRestController {

	@Autowired
	private IProductosService productService;
	
	@GetMapping("/products")
	public List<Productos> index(){
		return productService.findAll();
	}
	
	@GetMapping("/products/{id}")
	public Productos show(@PathVariable Integer id) {
		return productService.findById(id);
	}
	
	@PostMapping("/products")
	@ResponseStatus(HttpStatus.CREATED)
	public Productos create(@RequestBody Productos usuario) {
		return productService.save(usuario);
	}
	
	@PutMapping("/products/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Productos update(@RequestBody Productos productToUpdate, @PathVariable Integer id) {
		Productos productActual = productService.findById(id);
		
		productActual.setNombre(productToUpdate.getNombre());
		productActual.setDescripcion(productToUpdate.getDescripcion());
		productActual.setTipo(productToUpdate.getTipo());
		productActual.setPrecio(productToUpdate.getPrecio());
		productActual.setCotizar(productToUpdate.getCotizar());
		return productService.save(productActual);
	}
	
	@DeleteMapping("/products/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		productService.deleteById(id);
	}
	
}
