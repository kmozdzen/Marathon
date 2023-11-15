package com.kmozdzen.marathon.service.runService;

import com.kmozdzen.marathon.entity.Run;

import java.time.LocalDate;
import java.util.List;

public interface RunService {
    List<Run> getRuns();

    List<Run> getCurrentDaysRuns(String email);

    List<Run> getRunsByDate(String email, LocalDate date);

    Run getFirstDate(String email);

    Run getLastDate(String email);
}
