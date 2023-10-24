package com.kmozdzen.marathon.respository;

import com.kmozdzen.marathon.entity.User;
import com.kmozdzen.marathon.entity.YourPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface YourPlanRepository extends JpaRepository<YourPlan, Integer> {
    YourPlan findByUserEmail(String email);
}
