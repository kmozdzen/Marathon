package com.kmozdzen.marathon.message;

import com.kmozdzen.marathon.entity.Role;

import java.util.List;

public class LoginMessage {
    String message;
    Boolean status;
    String token;
    String email;
    String name;
    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    List<Role> roles;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LoginMessage(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }

    public LoginMessage(String message, Boolean status, String token, String email, String name, List<Role> roles) {
        this.message = message;
        this.status = status;
        this.token = token;
        this.email = email;
        this.name = name;
        this.roles = roles;
    }
}
