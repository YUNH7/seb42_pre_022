package com.teambj.stackoverflow.auth.filter;

import com.teambj.stackoverflow.auth.CustomUserDetailsService;
import com.teambj.stackoverflow.auth.JwtTokenizer;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomUserDetailsService customUserDetailsService) {
        this.jwtTokenizer = jwtTokenizer;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //verify JWT
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.verifySignature(jws, base64EncodedSecretKey);

        //set Authentication on SecurityContext
        setAuthenticationContext(claims);

        filterChain.doFilter(request, response);
    }

    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authentication = request.getHeader("Authorization");

        return authentication == null || !authentication.startsWith("Bearer ");
    }



    private void setAuthenticationContext(Map<String, Object> claims) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername((String) claims.get("username"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
