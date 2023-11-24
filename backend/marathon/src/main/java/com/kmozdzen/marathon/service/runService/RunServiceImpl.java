package com.kmozdzen.marathon.service.runService;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.middleware.Week;
import com.kmozdzen.marathon.respository.RunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

    @Override
    public Run check(int idRun, Boolean check) {
        Run run = runRepository.findById(idRun).orElseThrow(null);

        if(run != null){
            run.setRunCheck(check);
            return runRepository.save(run);
        }

        return null;
    }

    @Override
    public float getDistanceRun(String email) {
        float distanceRun;
        try{
            distanceRun = runRepository.findDistanceByEmailAndRunCheck(email);
        }catch (Exception ex){
            distanceRun = 0;
        }
        return distanceRun;
    }

    @Override
    public float getDistanceToRun(String email) {
        return runRepository.findTotalDistanceByEmail(email);
    }

    @Override
    public LocalTime getWalkTime(String email) {
        int totalRunTime;

        try{
            totalRunTime= runRepository.findTotalRunTimeByEmail(email);
        }catch (Exception ex){
            return LocalTime.of(0,0,0);
        }

        int hours = totalRunTime / 6000;
        int minutes = (totalRunTime % 6000) / 100;

        LocalTime time = LocalTime.of(hours, minutes, 0);

        return time;
    }

    @Override
    public LocalTime getWalkRunTime(String email) {
        int totalRunTime;

        try{
            totalRunTime= runRepository.findTotalWalkRunTimeByEmail(email);
        }catch (Exception ex){
            return LocalTime.of(0,0,0);
        }

        int hours = totalRunTime / 6000;
        int minutes = (totalRunTime % 6000) / 100;

        LocalTime time = LocalTime.of(hours, minutes, 0);

        return time;
    }

}
