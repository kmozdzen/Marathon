package com.kmozdzen.marathon.middleware;

import com.kmozdzen.marathon.response.AnswersResponse;

import java.sql.Time;
import java.text.DecimalFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collector;

public class Galloway {
    private Map<LocalDate, Map<String,Object>> race;
    private List<LocalDate> dates;

    public Galloway() {
        this.race = new TreeMap<>();
        this.dates = new ArrayList<>();
    }

    public Map<LocalDate, Map<String, Object>> getRace() {
        return race;
    }

    //function to multiply time
    private LocalTime countMarathonPace(LocalTime time, float times){ //time: time for 1.6 km
        long seconds = (long) ((time.toSecondOfDay() * times) / 1.6F);
        return LocalTime.ofSecondOfDay(seconds);
    }

    //all dates from now to marathon race
    private void datesForTraining(LocalDate date){
        LocalDate currentDate = LocalDate.now(); //current date
        while (!currentDate.isAfter(date)) {
            dates.add(currentDate);
            currentDate = currentDate.plusDays(1);
        }
    }

    //count number of weeks to marathon
    private int numberWeeksToMarathonRace(){
        int weeks = 0; //number of weeks
        for (LocalDate d : dates) {
            if (d.getDayOfWeek() == DayOfWeek.SUNDAY) {
                weeks++;
            }
        }
        return weeks;
    }


    private List<LocalTime> walkRunStrategy(LocalTime time){
        LocalTime runTimeInRunWalk = LocalTime.of(0,0,0);
        LocalTime walkTimeInRunWalk= LocalTime.of(0,0,0);

        if(
                time.
                        compareTo(LocalTime.of(0, 12, 30)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 11, 52)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,0,5);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 11, 52)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 11, 15)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,0,10);
            walkTimeInRunWalk = LocalTime.of(0,0,45);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 11, 15)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 10, 37)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,0,15);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 10, 37)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 10, 0)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,0,20);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 10, 0)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 9, 22)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,0,30);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 9, 22)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 8, 45)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,0,30);
            walkTimeInRunWalk = LocalTime.of(0,0,45);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 8, 45)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 8, 7)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,0,30);
            walkTimeInRunWalk = LocalTime.of(0,0,30);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 8, 7)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 7, 30)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,1,0);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 7, 30)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 6, 15)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,2,0);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 6, 15)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 5, 37)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,3,0);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 5, 37)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 5, 0)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,4,0);
            walkTimeInRunWalk = LocalTime.of(0,1,0);
        } else if(
                time.
                        compareTo(LocalTime.of(0, 5, 0)) <= 0
                        &&
                        time.compareTo(LocalTime.of(0, 4, 22)) > 0)
        {
            runTimeInRunWalk = LocalTime.of(0,4,0);
            walkTimeInRunWalk = LocalTime.of(0,0,30);
        }
        return Arrays.asList(runTimeInRunWalk, walkTimeInRunWalk);
    }

    public void create(AnswersResponse answersResponse, LocalDate date, LocalTime mmTime){ //magic mile time
        DecimalFormat decimalFormat = new DecimalFormat("#.0");
        float longRun = 5; //long run distance
        float deloadLongRun = 5; //deload long run distance
        float distancehop = 0; //how much the distance of a long run increases
        int weeksCounter = 0;
        float endDistance = 42;

        datesForTraining(date);
        int weeks = numberWeeksToMarathonRace(); //number of weeks to marathon

        int walkTime = 0;
        int runWalkTime = 0;
        float lastRunBeforeMarathon = 0.0F;
        float raceConverter = 0.0F;

        switch (answersResponse.getAnswers().get(0)){
            case "początkujący":
                System.out.println("beg");
                walkTime = 30;
                runWalkTime = 30;
                lastRunBeforeMarathon = 19.0F;
                break;
            case "średniozaawansowany":
                System.out.println("int");
                walkTime = 45;
                runWalkTime = 45;
                lastRunBeforeMarathon = 25.5F;
                break;
            case "zaawansowany":
                System.out.println("adv");
                walkTime = 60;
                runWalkTime = 60;
                lastRunBeforeMarathon = 32.0F;
                break;
            default:
                System.out.println("brak");
        }

        // TODO: 09.11.2023 pace
        switch (answersResponse.getAnswers().get(1)){
            case "maraton":
                System.out.println("marathon");
                raceConverter = 1.3f;
                break;
            case "pół maraton":
                System.out.println("half marathon");
                raceConverter = 1.2f;
                endDistance = 21;
                break;
            case "bieg na 10 mil":
                System.out.println("1 mile run");
                raceConverter = 1.175f;
                endDistance = 16;
                break;
            default:
                System.out.println("brak 2");
        }

        distancehop = (endDistance - longRun) / (((weeks - 6) / 2) - 1); //hop for training marathon runs 6 weeks before marathon

        LocalTime marathonPace = countMarathonPace(mmTime, raceConverter); //pace for marathon runs
        LocalTime trainingPace = marathonPace.plusMinutes(1).plusSeconds(15); //pace for training runs

        List<LocalTime> timesInRunWalk = walkRunStrategy(trainingPace);
        LocalTime runTimeInRunWalk = timesInRunWalk.get(0);
        LocalTime walkTimeInRunWalk = timesInRunWalk.get(1);

        for (LocalDate d : dates) {
           if(d.getDayOfWeek() == DayOfWeek.MONDAY || d.getDayOfWeek() == DayOfWeek.WEDNESDAY || d.getDayOfWeek() == DayOfWeek.FRIDAY){
               int finalWalkTime = walkTime;
               race.put(d, new HashMap<>() {
                   {
                       put("name", "Marsz");
                       put("time", finalWalkTime);
                   }
               });
           } else if (d.getDayOfWeek() == DayOfWeek.TUESDAY || d.getDayOfWeek() == DayOfWeek.THURSDAY) {
               int finalRunWalkTime = runWalkTime;
               race.put(d, new HashMap<>() {
                   {
                       put("name", "Bieg/Marsz");
                       put("time", finalRunWalkTime);
                       put("runTime", runTimeInRunWalk);
                       put("walkTime", walkTimeInRunWalk);
                   }
               });
           } else if(d.getDayOfWeek() == DayOfWeek.SUNDAY){
                LocalTime pace = trainingPace;
                float finalLongRun = 0;
                String name = "Długi bieg";
                if(weeksCounter >= (weeks - 1)){
                    finalLongRun = lastRunBeforeMarathon;
                } else if (weeksCounter >= (weeks - 2)) {
                    finalLongRun = 10.0F;
                } else if (weeksCounter >= (weeks - 3)) {
                    finalLongRun = 6.5F;
                } else if ((weeksCounter >= (weeks - 4))) {
                    name = "Maraton";
                    finalLongRun = 42.0F;
                    pace = marathonPace;
                } else if ((weeksCounter >= (weeks - 6))) {
                    finalLongRun = 10.0F;
                }
                else {
                    if(longRun > endDistance){
                        finalLongRun = endDistance;
                    }else {
                        if (weeksCounter % 2 != 0) {
                            if(weeksCounter > 0)
                                deloadLongRun = 6.5F;
                            else if(weeksCounter > 2)
                                deloadLongRun = 10F;
                            finalLongRun = deloadLongRun;
                        } else {
                            finalLongRun = longRun;
                        }
                    }
                }
               String finalName = name;
               float finalFinalLongRun = finalLongRun;
               LocalTime finalPace = pace;
               race.put(d, new HashMap<>() {
                    {
                        put("name", finalName);
                        put("distance", finalFinalLongRun); // reducing to 1 decimal place
                        put("pace", finalPace);
                    }
                });
                if(weeksCounter % 2 != 0)
                    longRun += distancehop;

                weeksCounter++;
            } else if (d.getDayOfWeek() == DayOfWeek.SATURDAY) {
                race.put(d, new HashMap<>() {
                    {
                        put("name", "Dzień wolny");
                    }
                });
            }
        }

//        for (Map.Entry<LocalDate, Map<String,Object>> run : race.entrySet()){
//            //if(run.getKey().getDayOfWeek() == DayOfWeek.SUNDAY)
//                System.out.println(run.getKey() + "-> " + run.getValue());
//        }

    }
}
