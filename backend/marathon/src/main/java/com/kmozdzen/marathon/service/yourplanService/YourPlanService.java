package com.kmozdzen.marathon.service.yourplanService;

import com.kmozdzen.marathon.entity.YourPlan;
import com.kmozdzen.marathon.response.AnswersResponse;

import java.time.LocalDate;
import java.time.LocalTime;

public interface YourPlanService {
    Boolean isPlan(String email);

    YourPlan create(String email, AnswersResponse answersResponse, LocalDate date, LocalTime mmTime);

    void remove(int id);
}
