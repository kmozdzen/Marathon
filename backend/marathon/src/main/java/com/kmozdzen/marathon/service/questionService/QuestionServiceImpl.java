package com.kmozdzen.marathon.service.questionService;

import com.kmozdzen.marathon.entity.Question;
import com.kmozdzen.marathon.respository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService{
    private QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }
}
