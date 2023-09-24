package com.example.techmasterpi.repos;


<<<<<<<< HEAD:Phase-Spring/src/main/java/com/example/techmasterpi/repos/RatingRepository.java
import com.example.techmasterpi.domain.Rating;

========
import com.example.techmasterpi.domain.Role;
<<<<<<< Updated upstream
>>>>>>>> Relocation-Management:Phase-Spring/src/main/java/com/example/techmasterpi/repos/RoleRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
<<<<<<<< HEAD:Phase-Spring/src/main/java/com/example/techmasterpi/repos/RatingRepository.java
public interface RatingRepository extends JpaRepository<Rating, Long> {
}
========
public interface RoleRepository extends JpaRepository<Role, Integer> {
=======
import com.example.techmasterpi.model.roletype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByRoletype(roletype roletype);
    Role findAllByRoletypeIn(List<roletype> roleTypes);
>>>>>>> Stashed changes
}
>>>>>>>> Relocation-Management:Phase-Spring/src/main/java/com/example/techmasterpi/repos/RoleRepository.java
