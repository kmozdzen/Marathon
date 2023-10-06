package com.kmozdzen.marathon.rest;

import com.kmozdzen.marathon.entity.Question;
import com.kmozdzen.marathon.service.questionService.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/question")
public class QuestionRestController {
    private QuestionService questionService;

    @Autowired
    public QuestionRestController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/")
    public List<Question> getQuestions(){
        return questionService.getQuestions();
    }
}
