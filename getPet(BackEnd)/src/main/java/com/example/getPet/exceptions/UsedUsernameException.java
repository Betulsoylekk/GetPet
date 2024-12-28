package com.example.getPet.exceptions;

public class UsedUsernameException extends Exception{
    public UsedUsernameException() {
    }
    public UsedUsernameException(String message) {
        super(message);
    }
}
