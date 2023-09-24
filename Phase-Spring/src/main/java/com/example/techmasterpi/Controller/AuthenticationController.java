package com.example.techmasterpi.Controller;


import com.example.techmasterpi.domain.User;
import com.example.techmasterpi.security.*;
import com.example.techmasterpi.service.*;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;


@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {


    private static final String SECRET_KEY = "6251655468576D5A7134743777217A25432A462D4A614E635266556A586E3272357538782F413F4428472B4B6250655367566B59703373367639792442264529482B4B6250655368566D597133743677397A24432646294A404E635166546A576E5A7234753778214125442A472D4B6150645367556B58703273357638792F423F4428472B4B6150645367566B5970337336763979244226452948404D6351655468576D5A7134743777217A25432A462D4A614E645267556A586E327235753878214125442A472D4A614E645267556B58703273357638792F423F4528482B4D6250655368566D597133743677397A24432646294A404E635266546A576E5A7234743777217A25432A462D4A404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970337336763979244226452948404D635166546857";
    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ITokenAuthService tokenAuthService;
    @Autowired
    private LogoutHandler logoutHandler;



    @Autowired
    IUserService userService;
   @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<Void> logout(HttpServletRequest request, @RequestBody String jwt) {
        authenticationService.logout(request);
        tokenAuthService.invalidateToken(jwt);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sendMail")
    public AuthenticationResponse forgetPassword(@RequestBody AuthenticationRequest email) throws MessagingException{
     return  authenticationService.forgetPassword(email);
    }

    @PutMapping("/forgotPass")
    @Transactional
    public void updatePassword(@NonNull HttpServletRequest request, @RequestParam("password") String password)throws MessagingException
    {
        authenticationService.ForgotPassword(request,password);
    }

    @PutMapping("/enabled")
    public void changerEnabled(@NonNull HttpServletRequest request) {
        User user = userService.getUserByToken(request);
        authenticationService.changerEnabled(user);
    }

    @PostMapping("/resend-verification-code")
    public ResponseEntity<AuthenticationResponse> resendVerificationCode(HttpServletRequest request, HttpServletResponse response) throws MessagingException {
            return ResponseEntity.ok(authenticationService.resendVerificationCode(request, response));

    }




}
