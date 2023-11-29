package com.kmozdzen.marathon.service.userService;

import com.kmozdzen.marathon.entity.Answer;
import com.kmozdzen.marathon.entity.User;
import com.kmozdzen.marathon.exception.UserNotFoundException;
import com.kmozdzen.marathon.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(int id) {
        User user;
        try{
            user = userRepository.findById(id).orElseThrow();
        }catch (Exception exception){
           return new User();
        }

        return user;
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }
    @Transactional
    @Override
    public User updateUser(User user) {
        User foundUser = getUser(user.getId());

        foundUser.setName(user.getName());
        foundUser.setEmail(user.getEmail());
        foundUser.setPassword(user.getPassword());

        addUser(foundUser);

        return foundUser;
    }

    @Override
    public void deleteUser(int id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            userRepository.delete(user);
        }
    }

    @Override
    public List<String> getUserAnswers(String email) {
        User user;
        List<String> answers = new ArrayList<>();
        int answersCount = 5;

        user = userRepository.findByEmail(email);

        if(user != null){
            answers.add(user.getYourPlan().getName());
            for (Answer answer: user.getAnswers()) {
                answers.add(answer.getContent());
            }
            answers.add(user.getYourPlan().getRaceDate().toString());
            answers.add(user.getYourPlan().getMmTime().toString());
        }


        if(answers.size() == answersCount)
            return answers;

        return null;
    }

}
