package com.kmozdzen.marathon.service.userService;

import com.kmozdzen.marathon.entity.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();

    User getUser(int id);

    User addUser(User user);

    User updateUser(User user);

    void deleteUser(int id);

    List<String> getUserAnswers(String email);

}
