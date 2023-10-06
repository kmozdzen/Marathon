package com.kmozdzen.marathon.service.answerService;

import com.kmozdzen.marathon.entity.Answer;

import java.util.List;

public interface AnswerService {
    List<Answer> getAnswers();

    Answer addAnswer(Answer answer);
}
