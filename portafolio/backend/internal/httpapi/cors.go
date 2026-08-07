package httpapi

import "net/http"

var allowedOrigins = map[string]bool{
	"https://portafolio.sekaidevec.com": true,
	"http://portafolio.sekaidevec.com":  true,
	"http://localhost:3000":             true,
	"http://127.0.0.1:3000":             true,
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
		origin := request.Header.Get("Origin")
		if allowedOrigins[origin] {
			response.Header().Set("Access-Control-Allow-Origin", origin)
			response.Header().Set("Vary", "Origin")
			response.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			response.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		}

		if request.Method == http.MethodOptions {
			response.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(response, request)
	})
}
