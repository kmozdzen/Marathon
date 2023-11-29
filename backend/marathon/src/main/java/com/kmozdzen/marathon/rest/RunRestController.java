package com.kmozdzen.marathon.rest;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.response.CheckResponse;
import com.kmozdzen.marathon.service.runService.RunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/run")
public class RunRestController {
    private RunService runService;

    @Autowired
    public RunRestController(RunService runService) {
        this.runService = runService;
    }

    @GetMapping("/")
    public List<Run> getRuns(){
        return runService.getRuns();
    }

    @GetMapping("/current-days/{email}")
    public List<Run> getCurrentDaysRuns(@PathVariable("email") String email){
        return runService.getCurrentDaysRuns(email);
    }

    @GetMapping("/{email}/{date}")
    public List<Run> getRunsByDate(@PathVariable("email")String email, @PathVariable("date")String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); //String yyyy-MM-dd to LocalDate
        LocalDate formattedDate = LocalDate.parse(date, formatter);
        return runService.getRunsByDate(email, formattedDate);
    }

    @GetMapping("/get-first-date/{email}")
    public Run getFirstDate(@PathVariable("email")String email){
        return runService.getFirstDate(email);
    }

    @GetMapping("/get-last-date/{email}")
    public Run getLastDate(@PathVariable("email")String email){
        return runService.getLastDate(email);
    }

    @PutMapping("/check/{idRun}")
    public Run check(@PathVariable("idRun")int idRun, @RequestBody CheckResponse checkResponse){
        //System.out.println(checkResponse);
        return runService.check(idRun, checkResponse.isRunCheck());
    }

    @GetMapping("/get-distance-run/{email}")
    public float getDistanceRun(@PathVariable("email")String email){
        return runService.getDistanceRun(email);
    }

    @GetMapping("/get-distance-to-run/{email}")
    public float getDistanceToRun(@PathVariable("email")String email){
        return runService.getDistanceToRun(email);
    }

    @GetMapping("/get-walk-time/{email}")
    public long getWalkTime(@PathVariable("email")String email){
        return runService.getWalkTime(email);
    }

    @GetMapping("/get-run-walk-time/{email}")
    public long getWalkRunTime(@PathVariable("email")String email){
        return runService.getWalkRunTime(email);
    }

    @GetMapping("/get-total-run-walk-time/{id}")
    public long getTotalWalkRunTime(@PathVariable("id")int id){
        return runService.getTotalWalkRunTime(id);
    }

    @GetMapping("/get-total-walk-time/{id}")
    public long getTotalWalkTime(@PathVariable("id")int id){
        return runService.getTotalWalkTime(id);
    }
}
