package com.kmozdzen.marathon.respository;

import com.kmozdzen.marathon.entity.Run;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RunRepository extends JpaRepository<Run, Integer> {
    List<Run> findAllByDateBetweenOrderByDate(LocalDate firstDay, LocalDate lastDay);
}
