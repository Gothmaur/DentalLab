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

import com.dentallab.backend.apirest.models.entity.Materiales;
import com.dentallab.backend.apirest.models.services.IMaterialService;

@CrossOrigin(origins = {"http://localhost:4200"}, methods = {RequestMethod.GET, RequestMethod.PUT,RequestMethod.POST,RequestMethod.DELETE} )
@RestController
@RequestMapping("/api")
public class MaterialRestControl {
	
	@Autowired
	private IMaterialService materialService;
	
	@GetMapping("/inventarios")
	public List<Materiales> index(){
		return materialService.findAll();
	}
	
	@GetMapping("/inventarios/{id}")
	public Materiales show(@PathVariable Integer id) {
		return materialService.findById(id);
	}
	
	@PostMapping("/inventarios")
	@ResponseStatus(HttpStatus.CREATED)
	public Materiales create(@RequestBody Materiales usuario) {
		return materialService.save(usuario);
	}
	
	@PutMapping("/inventarios/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Materiales update(@RequestBody Materiales materialToUpdate, @PathVariable Integer id) {
		Materiales materialActual = materialService.findById(id);
		
		materialActual.setMaterial(materialToUpdate.getMaterial());
		materialActual.setFechaIngreso(materialToUpdate.getFechaIngreso());
		materialActual.setFechaCaducidad(materialToUpdate.getFechaCaducidad());
		materialActual.setProveedor(materialToUpdate.getProveedor());
		materialActual.setDescripcion(materialToUpdate.getDescripcion());
		materialActual.setUnidadMedida(materialToUpdate.getUnidadMedida());
		materialActual.setCantidadDisponible(materialToUpdate.getCantidadDisponible());
		materialActual.setPrecio(materialToUpdate.getPrecio());
		
		return materialService.save(materialActual);
	}
	
	@DeleteMapping("/inventarios/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		materialService.delete(id);
	}
}
