package com.kmozdzen.marathon.rest;

import com.kmozdzen.marathon.entity.YourPlan;
import com.kmozdzen.marathon.response.AnswersResponse;
import com.kmozdzen.marathon.service.yourplanService.YourPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/yourplan")
public class YourPlanRestController {
    private YourPlanService yourPlanService;


    @Autowired
    public YourPlanRestController(YourPlanService yourPlanService) {
        this.yourPlanService = yourPlanService;
    }

    @GetMapping("/isPlan/{email}")
    private Boolean isPlan(@PathVariable("email") String email){
        return yourPlanService.isPlan(email);

    }

    @PostMapping("/create/{email}")
    private YourPlan create(@PathVariable("email") String email, @RequestBody AnswersResponse answersResponse){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); //String yyyy-MM-dd to LocalDate
        LocalDate formattedDate = LocalDate.parse(answersResponse.getRaceDate(), formatter);

        String mmss = answersResponse.getMmTime();

        int minutes = Integer.parseInt(mmss.substring(0, 2));
        int seconds = Integer.parseInt(mmss.substring(3, 5));

        LocalTime mmTime = LocalTime.of(0, minutes, seconds);

        return yourPlanService.create(email ,answersResponse, formattedDate, mmTime);
    }

    @DeleteMapping("/remove/{id}")
    public void removePlan(@PathVariable("id") int id){
        yourPlanService.remove(id);
    }
}
