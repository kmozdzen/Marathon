package com.kmozdzen.marathon.response;

import com.kmozdzen.marathon.entity.Answer;
import lombok.Data;

import java.util.List;

@Data
public class AnswersResponse {
    private List<String> answers;
}
