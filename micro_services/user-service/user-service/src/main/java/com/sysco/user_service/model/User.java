package com.sysco.user_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // avoid reserved keyword 'user'
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    @Column(unique = true, nullable = false)
    private String email;

    private String role;
}
