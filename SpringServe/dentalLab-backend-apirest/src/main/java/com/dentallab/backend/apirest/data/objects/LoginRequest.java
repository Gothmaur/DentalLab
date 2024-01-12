package com.dentallab.backend.apirest.data.objects;

public class LoginRequest {
    private String email;
    private String clave;
    
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getClave() {
		return clave;
	}
	public void setClave(String clave) {
		this.clave = clave;
	}

    // Getters y setters
}