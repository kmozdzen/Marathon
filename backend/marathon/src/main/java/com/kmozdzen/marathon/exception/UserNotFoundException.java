package com.kmozdzen.marathon.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(int id){
        super("User id:" + id + " does not exist");
    }
}
