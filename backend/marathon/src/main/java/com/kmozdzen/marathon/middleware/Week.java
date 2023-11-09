package com.kmozdzen.marathon.middleware;

import java.time.LocalDate;

public class Week {
    public int getMinusDays(LocalDate date){
        switch (date.getDayOfWeek()){
            case MONDAY:
                return 0;
            case TUESDAY:
                return 1;
            case WEDNESDAY:
                return 2;
            case THURSDAY:
                return 3;
            case FRIDAY:
                return 4;
            case SATURDAY:
                return 5;
            case SUNDAY:
                return 6;

        }
        return 0;
    }

    public int getPlusDays(LocalDate date){
        switch (date.getDayOfWeek()){
            case MONDAY:
                return 6;
            case TUESDAY:
                return 5;
            case WEDNESDAY:
                return 4;
            case THURSDAY:
                return 3;
            case FRIDAY:
                return 2;
            case SATURDAY:
                return 1;
            case SUNDAY:
                return 0;

        }
        return 0;
    }
}
