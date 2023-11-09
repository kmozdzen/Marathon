package com.kmozdzen.marathon.service.runService;

import com.kmozdzen.marathon.entity.Run;

import java.time.LocalDate;
import java.util.List;

public interface RunService {
    List<Run> getRuns();

    List<Run> getCurrentDaysRuns();

    List<Run> getRunsByDate(LocalDate date);
}
