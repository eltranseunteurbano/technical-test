package main

import (
	"fmt"
	"net/http"
)

func GetNurse(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	// nurseId := vars["id"]

	// for _, nurse := range nurses {
	// 	if nurse.Id == nurseId {
	// 		w.Header().Set("Content-Type", "application/json")
	// 		w.WriteHeader(http.StatusOK)
	// 		json.NewEncoder(w).Encode(nurse)
	// 		return
	// 	}
	// }
	fmt.Fprintf(w, "Nurse not found")
}