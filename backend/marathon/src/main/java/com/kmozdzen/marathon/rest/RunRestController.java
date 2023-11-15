package com.kmozdzen.marathon.rest;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.service.runService.RunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
}
