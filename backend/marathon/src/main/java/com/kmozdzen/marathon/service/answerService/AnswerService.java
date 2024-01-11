package com.kmozdzen.marathon.service.answerService;

import com.kmozdzen.marathon.entity.Answer;
import com.kmozdzen.marathon.entity.User;
import com.kmozdzen.marathon.response.AnswersResponse;

import java.util.List;

public interface AnswerService {
    List<Answer> getAnswers();

    Answer addAnswer(Answer answer);

    List<Answer> answersToUser(String email, AnswersResponse answers);

    void clearUserAnswers(User user);
}
