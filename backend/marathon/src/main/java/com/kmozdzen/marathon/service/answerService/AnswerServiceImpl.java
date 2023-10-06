package com.kmozdzen.marathon.service.answerService;

import com.kmozdzen.marathon.entity.Answer;
import com.kmozdzen.marathon.respository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService{
    private AnswerRepository answerRepository;

    @Autowired
    public AnswerServiceImpl(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    @Override
    public List<Answer> getAnswers() {
        return answerRepository.findAll();
    }

    @Override
    public Answer addAnswer(Answer answer) {
        return answerRepository.save(answer);
    }
}
