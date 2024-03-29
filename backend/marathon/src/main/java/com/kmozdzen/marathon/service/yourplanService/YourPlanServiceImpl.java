package com.kmozdzen.marathon.service.yourplanService;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.entity.User;
import com.kmozdzen.marathon.entity.YourPlan;
import com.kmozdzen.marathon.middleware.Galloway;
import com.kmozdzen.marathon.response.AnswersResponse;
import com.kmozdzen.marathon.respository.RunRepository;
import com.kmozdzen.marathon.respository.UserRepository;
import com.kmozdzen.marathon.respository.YourPlanRepository;
import com.kmozdzen.marathon.service.answerService.AnswerService;
import com.kmozdzen.marathon.service.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

@Service
public class YourPlanServiceImpl implements YourPlanService{
    private YourPlanRepository yourPlanRepository;
    private UserRepository userRepository;
    private RunRepository runRepository;
    private AnswerService answerService;

    @Autowired
    public YourPlanServiceImpl(YourPlanRepository yourPlanRepository, UserRepository userRepository, RunRepository runRepository, AnswerService answerService) {
        this.yourPlanRepository = yourPlanRepository;
        this.userRepository = userRepository;
        this.runRepository = runRepository;
        this.answerService = answerService;
    }

    @Override
    public Boolean isPlan(String email) {
        return yourPlanRepository.findByUserEmail(email) != null ? true : false;
    }

    @Override
    public YourPlan create(String email, AnswersResponse answersResponse, LocalDate date, LocalTime mmTime) {
        System.out.println(answersResponse);

        Galloway galloway = new Galloway();

        galloway.create(answersResponse, date, mmTime);

        if(yourPlanRepository.findByUserEmail(email) == null){
            User user = userRepository.findByEmail(email);

            YourPlan yourPlan = new YourPlan();
            yourPlan.setRaceDate(date);
            yourPlan.setName(answersResponse.getRaceName());
            yourPlan.setMmTime(mmTime);
            yourPlan.setUser(user);

            yourPlanRepository.save(yourPlan);

            for (Map.Entry<LocalDate, Map<String,Object>> runDate : galloway.getRace().entrySet()){
                //if(run.getKey().getDayOfWeek() == DayOfWeek.SUNDAY)
                Run run = new Run();
                run.setDate(runDate.getKey());

                if(runDate.getValue().get("distance") != null){
                    float distance = (Float) runDate.getValue().get("distance");
                    if(distance != 0)
                        run.setDistance(distance);
                }

                if(runDate.getValue().get("pace") != null){
                    LocalTime pace = (LocalTime) runDate.getValue().get("pace");
                    run.setPace(pace);
                }

                if(runDate.getValue().get("runTime") != null){
                    LocalTime runTime = (LocalTime) runDate.getValue().get("runTime");
                    run.setRunTime(runTime);
                }

                if(runDate.getValue().get("walkTime") != null){
                    LocalTime walkTime = (LocalTime) runDate.getValue().get("walkTime");
                    run.setWalkTime(walkTime);
                }

                if(runDate.getValue().get("name") != null){
                    String name = (String) runDate.getValue().get("name");
                    run.setName(name);
                }

                if(runDate.getValue().get("time") != null){
                    LocalTime time = (LocalTime) runDate.getValue().get("time");
                    run.setTime(time);
                }

                if(runDate.getValue().get("additionalInfo") != null){
                    String additionalInfo = (String) runDate.getValue().get("additionalInfo");
                    if(additionalInfo != "")
                        run.setAdditionalInfo(additionalInfo);
                }

                run.setRunCheck(false);
                run.setYourPlan(yourPlan);
                runRepository.save(run);
            }
        }

        return null;
    }

    @Override
    public void remove(int id) {
        User user = userRepository.findById(id).orElse(null);

        if(user != null){
            YourPlan yourPlan = yourPlanRepository.findById(user.getYourPlan().getIdYourPlan()).orElse(null);
            if (yourPlan != null) {
                answerService.clearUserAnswers(user);
                yourPlanRepository.delete(yourPlan);
            }
        }
    }

}
