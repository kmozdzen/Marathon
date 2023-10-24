package com.kmozdzen.marathon.respository;

import com.kmozdzen.marathon.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
