package com.kmozdzen.marathon.response;

import com.kmozdzen.marathon.entity.Answer;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class AnswersResponse {
    private List<String> answers;
    private String raceName;
    private String raceDate;
    private String mmTime;
}
