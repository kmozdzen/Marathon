package com.kmozdzen.marathon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "run")
public class Run {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_run")
    private int idRun;

    @Column(name = "name")
    private String name;

    @Column(name = "distance")
    private float distance;

    @Column(name = "time")
    private LocalTime time;

    @Column(name = "pace")
    private LocalTime pace;

    @Column(name = "run_time")
    private LocalTime runTime;

    @Column(name = "walk_time")
    private LocalTime walkTime;

    @Column(name = "additional_info")
    private String additionalInfo;

    @Column(name = "my_info")
    private String myInfo;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "run_check")
    private boolean runCheck;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idYourPlan")
    private YourPlan yourPlan;
}
