package com.kmozdzen.marathon.service.runService;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.entity.YourPlan;
import com.kmozdzen.marathon.middleware.Week;
import com.kmozdzen.marathon.respository.RunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RunServiceImpl implements RunService{
    private RunRepository runRepository;

    @Autowired
    public RunServiceImpl(RunRepository runRepository) {
        this.runRepository = runRepository;
    }

    @Override
    public List<Run> getRuns() {
        return runRepository.findAll();
    }

    @Override
    public List<Run> getCurrentDaysRuns(String email) {
        Week week = new Week();
        LocalDate currentDay = LocalDate.now(); // current day
        LocalDate firstDay = currentDay.minusDays(week.getMinusDays(currentDay)); //days back
        LocalDate lastDay = currentDay.plusDays(week.getPlusDays(currentDay)); //days forward

        return runRepository.findByUserEmailAndDateBetween(email, firstDay, lastDay);
    }

    @Override
    public List<Run> getRunsByDate(String email, LocalDate date) {
        Week week = new Week();
        LocalDate currentDay = date; // current day
        LocalDate firstDay = currentDay.minusDays(week.getMinusDays(currentDay)); //days back
        LocalDate lastDay = currentDay.plusDays(week.getPlusDays(currentDay)); //days forward

        return runRepository.findByUserEmailAndDateBetween(email, firstDay, lastDay);
    }

    @Override
    public Run getFirstDate(String email) {
        return runRepository.findEarliestDateByIdYourPlan(email);
    }

    @Override
    public Run getLastDate(String email) {
        return runRepository.findLastDateByIdYourPlan(email);
    }
}
