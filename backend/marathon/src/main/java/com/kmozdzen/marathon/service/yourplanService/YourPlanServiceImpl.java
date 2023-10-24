package com.kmozdzen.marathon.service.yourplanService;

import com.kmozdzen.marathon.entity.YourPlan;
import com.kmozdzen.marathon.middleware.Galloway;
import com.kmozdzen.marathon.response.AnswersResponse;
import com.kmozdzen.marathon.respository.YourPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YourPlanServiceImpl implements YourPlanService{
    private YourPlanRepository yourPlanRepository;

    @Autowired
    public YourPlanServiceImpl(YourPlanRepository yourPlanRepository) {
        this.yourPlanRepository = yourPlanRepository;
    }

    @Override
    public Boolean isPlan(String email) {
        return yourPlanRepository.findByUserEmail(email) != null ? true : false;
    }

    @Override
    public YourPlan create(String email, AnswersResponse answersResponse) {
        Galloway galloway = new Galloway();
        galloway.create();

        YourPlan yourPlan = new YourPlan();
        return yourPlanRepository.save(yourPlan);
    }
}
