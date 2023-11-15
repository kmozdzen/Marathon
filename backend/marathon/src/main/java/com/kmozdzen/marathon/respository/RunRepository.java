package com.kmozdzen.marathon.respository;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.entity.YourPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RunRepository extends JpaRepository<Run, Integer> {
    @Query("SELECT r FROM Run r " +
            "WHERE r.yourPlan.idYourPlan = (SELECT yp.idYourPlan FROM YourPlan yp " +
            "WHERE yp.user.id =(SELECT u.id FROM User u " +
            "WHERE u.email = :email)) " +
            "AND r.date BETWEEN :firstDay AND :lastDay")
    List<Run> findByUserEmailAndDateBetween(
            @Param("email") String email,
            @Param("firstDay") LocalDate firstDay,
            @Param("lastDay") LocalDate lastDay
    );

    @Query("SELECT r FROM Run r " +
            "WHERE r.yourPlan.idYourPlan = (SELECT yp.idYourPlan FROM YourPlan yp " +
            "WHERE yp.user.id =(SELECT u.id FROM User u " +
            "WHERE u.email = :email)) " +
            "ORDER BY r.date ASC LIMIT 1")
    Run findEarliestDateByIdYourPlan(@Param("email") String email);

    @Query("SELECT r FROM Run r " +
            "WHERE r.yourPlan.idYourPlan = (SELECT yp.idYourPlan FROM YourPlan yp " +
            "WHERE yp.user.id =(SELECT u.id FROM User u " +
            "WHERE u.email = :email)) " +
            "ORDER BY r.date DESC LIMIT 1")
    Run findLastDateByIdYourPlan(@Param("email") String email);
}
