package com.kmozdzen.marathon.rest;

import com.kmozdzen.marathon.entity.Answer;
import com.kmozdzen.marathon.response.AnswersResponse;
import com.kmozdzen.marathon.service.answerService.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/answer")
public class AnswerRestController {
    private AnswerService answerService;

    @Autowired
    public AnswerRestController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/")
    public List<Answer> getAnswers(){
        return answerService.getAnswers();
    }

    @PostMapping("/")
    public Answer addAnswer(@RequestBody Answer answer){
        return answerService.addAnswer(answer);
    }

    @PostMapping("/answers-to-user/{email}")
    public List<Answer> answersToUser(@PathVariable("email") String email, @RequestBody AnswersResponse answers){
        return answerService.answersToUser(email, answers);
    }
}
