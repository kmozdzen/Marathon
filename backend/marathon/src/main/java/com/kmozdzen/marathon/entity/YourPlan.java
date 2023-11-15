package com.kmozdzen.marathon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "yourPlan")
public class YourPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_your_plan")
    private int idYourPlan;

    @Column(name = "name")
    private String name;

    @Column(name = "race_date")
    private LocalDate raceDate;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "yourPlan", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Run> runs;
}
