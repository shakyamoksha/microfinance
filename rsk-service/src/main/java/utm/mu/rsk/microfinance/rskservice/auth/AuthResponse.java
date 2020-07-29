package utm.mu.rsk.microfinance.rskservice.auth;

public class AuthResponse {

    private final String jwt;
    private final Object data;

    public AuthResponse(String jwt, Object data) {
        this.jwt = jwt;
        this.data = data;
    }

    public String getJwt() {
        return jwt;
    }

    public Object getData() {
        return data;
    }
}
