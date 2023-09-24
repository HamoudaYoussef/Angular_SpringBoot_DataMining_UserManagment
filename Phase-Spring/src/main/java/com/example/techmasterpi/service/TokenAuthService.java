package com.example.techmasterpi.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class TokenAuthService implements ITokenAuthService{
    private static final String SECRET_KEY = "6251655468576D5A7134743777217A25432A462D4A614E635266556A586E3272357538782F413F4428472B4B6250655367566B59703373367639792442264529482B4B6250655368566D597133743677397A24432646294A404E635166546A576E5A7234753778214125442A472D4B6150645367556B58703273357638792F423F4428472B4B6150645367566B5970337336763979244226452948404D6351655468576D5A7134743777217A25432A462D4A614E645267556A586E327235753878214125442A472D4A614E645267556B58703273357638792F423F4528482B4D6250655368566D597133743677397A24432646294A404E635266546A576E5A7234743777217A25432A462D4A404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970337336763979244226452948404D635166546857";
    @Override
    public String extractUserEmail(String jwt) {
        return extractClaim(jwt , Claims::getSubject);    }


    public String extractUserId(String jwt) {
        return extractClaim(jwt , Claims::getId);
    }

    @Override
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis() + 1000 * 60 * 60)))
                .signWith(getSignInKey(), SignatureAlgorithm.HS512)
                .compact();   }

    @Override
    public Boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }
    @Override
    public Date extractExpiration(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);    }

    @Override
    public Boolean isTokenValid(String jwt, UserDetails userDetails) {
        final String userEmail = extractUserEmail(jwt);
        return (userEmail.equals(userDetails.getUsername())) && !isTokenExpired(jwt);    }

    public void invalidateToken(String jwt) {
        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwt).getBody().put("exp", new Date(0));
    }

    public void getToken(String jwt) {
        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwt).getBody();
    }
    @Override
    public Claims extractAllClaims(String jwt) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();    }

    @Override
    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims (jwt);
        return claimsResolver.apply(claims);
    }

    @Override
    public Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);    }

    @Override
    public String generateTokenWithoutExtraClaims(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);    }

    public Map<String, Object> getClaimsFromToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
        }
        if (token == null) {
            throw new UsernameNotFoundException("JWT token not found in request headers");
        }
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        return new HashMap<>(claims);
    }

    public String updateTokenClaims(HttpServletRequest request, Map<String, Object> claims, HttpServletResponse response) {
        String token = extractTokenFromRequest(request);
        Jws<Claims> jws = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
        Claims existingClaims = jws.getBody();
        existingClaims.putAll(claims);
        String newToken = Jwts.builder().setClaims(existingClaims).signWith(getSignInKey()).compact();
        // Ajouter le nouveau token dans le header de la réponse HTTP
        response.addHeader("Authorization", "Bearer " + newToken);
        return newToken;
    }
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

   /* public String generateTokenRegister(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis() + 1000 * 60 * 60)))
                .signWith(getSignInKey(), SignatureAlgorithm.HS512)
                .compact();   }*/







}
