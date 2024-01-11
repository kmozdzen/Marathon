package com.kmozdzen.marathon.service.answerService;

import com.kmozdzen.marathon.entity.Answer;
import com.kmozdzen.marathon.entity.User;
import com.kmozdzen.marathon.response.AnswersResponse;
import com.kmozdzen.marathon.respository.AnswerRepository;
import com.kmozdzen.marathon.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService{
    private AnswerRepository answerRepository;
    private UserRepository userRepository;

    @Autowired
    public AnswerServiceImpl(AnswerRepository answerRepository, UserRepository userRepository) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Answer> getAnswers() {
        return answerRepository.findAll();
    }

    @Override
    public Answer addAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    @Override
    @Transactional
    public List<Answer> answersToUser(String email, AnswersResponse answers) {
        User user = userRepository.findByEmail(email);
        List<Answer> userAnswers = new ArrayList<>();

        for (String answer: answers.getAnswers()) {
            Answer singleAnswer = answerRepository.findByContent(answer);
            userAnswers.add(singleAnswer);
            List<User> users = singleAnswer.getUser();
            users.add(user);
            singleAnswer.setUser(users);
        }

        user.setAnswers(userAnswers);
        return userAnswers;
    }

    @Override
    @Transactional
    public void clearUserAnswers(User user) {
        for (Answer answer: user.getAnswers()) {
            answer.getUser().remove(user);
            answerRepository.save(answer);
        }
        user.getAnswers().clear();

        userRepository.save(user);
    }
}
