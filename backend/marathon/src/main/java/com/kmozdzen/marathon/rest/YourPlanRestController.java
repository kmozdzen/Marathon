package com.kmozdzen.marathon.rest;

import com.kmozdzen.marathon.entity.YourPlan;
import com.kmozdzen.marathon.response.AnswersResponse;
import com.kmozdzen.marathon.service.yourplanService.YourPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return yourPlanService.create(email ,answersResponse);
    }
}
