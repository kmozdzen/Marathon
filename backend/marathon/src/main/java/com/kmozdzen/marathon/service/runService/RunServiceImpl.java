package com.kmozdzen.marathon.service.runService;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.middleware.Week;
import com.kmozdzen.marathon.respository.RunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
        return runRepository.findDistanceByEmail(email);
    }

    @Override
    public long getWalkTime(String email) {
        long totalRunTime;

        try{
            totalRunTime= runRepository.findRunTimeByEmail(email);
            return totalRunTime;
        }catch (Exception ex){
            return 0;
        }
    }

    @Override
    public long getWalkRunTime(String email) {
        long totalRunTime;

        try{
            totalRunTime= runRepository.findWalkRunTimeByEmail(email);
            return totalRunTime;
        }catch (Exception ex){
            return 0;
        }
    }

    @Override
    public long getTotalWalkRunTime(int id) {
        long totalRunTime;

        try{
            totalRunTime= runRepository.findTotalWalkRunTimeById(id);
            return totalRunTime;
        }catch (Exception ex){
            return 0;
        }

    }

    @Override
    public long getTotalWalkTime(int id) {
        long totalRunTime;

        try{
            totalRunTime= runRepository.findTotalWalkTimeById(id);
            return totalRunTime;
        }catch (Exception ex){
            return 0;
        }
    }

}
