package com.example.techmasterpi.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

public interface ITokenAuthService {
    String extractUserEmail(String jwt);
    Map<String, Object> getClaimsFromToken(HttpServletRequest request);
    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);
    Boolean isTokenExpired(String jwt);
    Date extractExpiration(String jwt);
    String updateTokenClaims(HttpServletRequest request, Map<String, Object> claims, HttpServletResponse response);
    Boolean isTokenValid(String jwt, UserDetails userDetails);
    Claims extractAllClaims(String jwt);
    <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver);
    Key getSignInKey();
    String  extractUserId(String jwt) ;
    String generateTokenWithoutExtraClaims(UserDetails userDetails);
    void invalidateToken(String jwt);
    void getToken(String jwt);
}
