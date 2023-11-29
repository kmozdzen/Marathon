package com.kmozdzen.marathon.service.runService;

import com.kmozdzen.marathon.entity.Run;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface RunService {
    List<Run> getRuns();

    List<Run> getCurrentDaysRuns(String email);

    List<Run> getRunsByDate(String email, LocalDate date);

    Run getFirstDate(String email);

    Run getLastDate(String email);

    Run check(int idRun, Boolean check);

    float getDistanceRun(String email);

    float getDistanceToRun(String email);

    long getWalkTime(String email);

    long getWalkRunTime(String email);

    long getTotalWalkRunTime(int id);

    long getTotalWalkTime(int id);
}
