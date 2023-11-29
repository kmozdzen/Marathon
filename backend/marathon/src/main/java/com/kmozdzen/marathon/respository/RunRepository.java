package com.kmozdzen.marathon.respository;

import com.kmozdzen.marathon.entity.Run;
import com.kmozdzen.marathon.entity.YourPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

public interface RunRepository extends JpaRepository<Run, Integer> {
    @Query("SELECT r FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.email = :email " +
            "AND r.date BETWEEN :firstDay AND :lastDay")
    List<Run> findByUserEmailAndDateBetween(
            @Param("email") String email,
            @Param("firstDay") LocalDate firstDay,
            @Param("lastDay") LocalDate lastDay
    );

    @Query("SELECT r FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.email = :email " +
            "ORDER BY r.date ASC LIMIT 1")
    Run findEarliestDateByIdYourPlan(@Param("email") String email);

    @Query("SELECT r FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.email = :email " +
            "ORDER BY r.date DESC LIMIT 1")
    Run findLastDateByIdYourPlan(@Param("email") String email);

    @Query("SELECT SUM(r.distance) FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.email = :email " +
            "AND r.runCheck = true")
    float findDistanceByEmailAndRunCheck(@Param("email") String email);

    @Query("SELECT SUM(r.distance) FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.email = :email")
    float findDistanceByEmail(@Param("email") String email);

    @Query("SELECT SUM(r.time) FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.email = :email " +
            "AND r.runCheck = true " +
            "AND r.name = 'Marsz' ")
    long findRunTimeByEmail(@Param("email") String email);

    @Query("SELECT SUM(r.time) FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.email = :email " +
            "AND r.runCheck = true " +
            "AND r.name = 'Bieg/Marsz' ")
    long findWalkRunTimeByEmail(@Param("email") String email);

    @Query("SELECT SUM(r.time) FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.id = :id " +
            "AND r.name = 'Bieg/Marsz' ")
    long findTotalWalkRunTimeById(@Param("id") int id);

    @Query("SELECT SUM(r.time) FROM Run r " +
            "JOIN r.yourPlan yp " +
            "JOIN yp.user u " +
            "WHERE u.id = :id " +
            "AND r.name = 'Marsz' ")
    long findTotalWalkTimeById(@Param("id") int id);

}
