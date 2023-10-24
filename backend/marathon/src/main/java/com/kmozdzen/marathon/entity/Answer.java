package com.kmozdzen.marathon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_answer")
    private int idAnswer;

    @Column(name = "content")
    private String content;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idQuestion")
    private Question question;

    @JsonIgnore
    @ManyToMany()
    @JoinTable(
            name = "answer_user",
            joinColumns = @JoinColumn(name = "id_answer"),
            inverseJoinColumns = @JoinColumn(name = "id_user")

    )
    private List<User> user;
}
