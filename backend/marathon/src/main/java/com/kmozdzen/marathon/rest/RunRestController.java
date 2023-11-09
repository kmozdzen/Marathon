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

    @GetMapping("/current-days")
    public List<Run> getCurrentDaysRuns(){
        return runService.getCurrentDaysRuns();
    }

    @GetMapping("/{date}")
    public List<Run> getRunsByDate(@PathVariable("date")String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); //String yyyy-MM-dd to LocalDate
        LocalDate formattedDate = LocalDate.parse(date, formatter);
        return runService.getRunsByDate(formattedDate);
    }
}
