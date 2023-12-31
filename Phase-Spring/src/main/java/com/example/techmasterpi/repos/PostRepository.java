package com.example.techmasterpi.repos;

import com.example.techmasterpi.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("SELECT p FROM Post p  ORDER BY p.postdate ASC  ")
    public List<Post> findByOrderByPostdateAsc();
    @Query("SELECT p FROM Post p  ORDER BY p.postdate DESC  ")
    public List<Post> findByOrderByPostdateDesc();
}
