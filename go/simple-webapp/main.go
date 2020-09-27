package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"rsc.io/quote"
)

func logRequest(req *http.Request){
	dump, err := httputil.DumpRequest(req, false)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("%q", dump)
}

func helloHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logRequest(r) // logging the request
		w.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(w).Encode("Hello from Go app.")
		if err != nil {
			log.Print("helloHandler, err: ", err)
		}
	})
}

func readyHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logRequest(r) // logging the request
		_, err := fmt.Fprintf(w, "Ready!")
		if err != nil {
			log.Print("readyHandler, err: ", err)
		}
	})
}


func main() {
	log.Print(quote.Hello())
	http.Handle("/", helloHandler())
	http.Handle("/ready", readyHandler())
	log.Fatal(http.ListenAndServe(":8080", nil))
}