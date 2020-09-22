package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Print("Hello, it's there anybody in.")

	helloHandler := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode("Hello from Go app.")
	}

	readyHandler := func(w http.ResponseWriter, r *http.Request) {
		n, err := fmt.Fprintf(w, "Ready!")
		if err != nil {
			log.Print("readyHandler, err: ", err)
		} else {
			log.Print("readyHandler, response bytes: ", n)
		}
	}

	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/ready", readyHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}