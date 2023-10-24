package com.kmozdzen.marathon.respository;

import com.kmozdzen.marathon.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    Answer findByContent(String content);
}
