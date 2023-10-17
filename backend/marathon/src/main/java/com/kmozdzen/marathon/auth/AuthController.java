package com.kmozdzen.marathon.auth;



import com.kmozdzen.marathon.entity.User;
import com.kmozdzen.marathon.message.LoginMessage;
import com.kmozdzen.marathon.message.RegisterMessage;
import com.kmozdzen.marathon.respository.UserRepository;
import com.kmozdzen.marathon.token.Token;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService service;
    private final UserRepository userRepository;

    @Autowired
    public AuthController(AuthService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public RegisterMessage register(
            @RequestBody RegisterRequest request
    ) {
        try {
            ResponseEntity.ok(service.register(request));
            return new RegisterMessage("Success", true);
        }catch (Exception exception){
            return new RegisterMessage("Failed", false);
        }
    }
    @PostMapping("/authenticate")
    public LoginMessage authenticate(@RequestBody AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        try
        {
            if(user != null){
                String token;
                if(!(token = service.authenticate(request).getAccessToken()).isEmpty())
                    return new LoginMessage("Login success", true, token, user.getEmail(), user.getName(), user.getRoles());
                else
                    return new LoginMessage("Login failed", false);
            }else
            {
                return new LoginMessage("Email not exits", false);
            }
        }catch (Exception ex){
            return new LoginMessage("Wrong email/password", false);
        }
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }

    @PostMapping("/logout")
    public String logout(@RequestBody TokenRequest request) {
        if(request.getToken() == null){
            return "Failed";
        }
        service.deleteByToken(request.getToken());
        return "Success";
    }

    @PostMapping("/isToken/{token}")
    public LoginMessage isToken(@PathVariable("token") String token) {
        Optional<Token> theToken = service.getByToken(token);
        try {
            String t = theToken.get().token;
        }catch (Exception exception){
            return new LoginMessage("not valid", false);
        }
        if (theToken.get().expired) {
            return new LoginMessage("not valid", false);
        }
        return new LoginMessage("valid", true);
    }
}
