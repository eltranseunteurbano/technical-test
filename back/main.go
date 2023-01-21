package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var nurses = []Nurse {
	{
		Id: "0",
		FirstName: "Mitchell",
		LastName: "Bagnall",
		UserName: "username",
		Qualification: "CNA",
	},{
		Id: "1",
		FirstName: "Nichols",
		LastName: "Fellini",
		UserName: "username",
		Qualification: "RN",
	},{
		Id: "2",
		FirstName: "Fredd",
		LastName: "Trimp",
		UserName: "username",
		Qualification: "LPN",
	},{
		Id: "3",
		FirstName: "Jaime",
		LastName: "Burbano",
		UserName: "username",
		Qualification: "CNA",
	},
}

var shifts = []Shift {
	{
		Id: "0",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "3",
		Qualification: "LPN",
	}, {
		Id: "1",
		StartDate: "Wed, 18 Jan 2023 8:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 12:44:16 GMT",
		NurseId: "0",
		Qualification: "RN",
	}, {
		Id: "2",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "0",
		Qualification: "CNA",
	}, {
		Id: "3",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "0",
		Qualification: "LPN",
	}, {
		Id: "4",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "0",
		Qualification: "LPN",
	}, {
		Id: "5",
		StartDate: "Wed, 18 Jan 2023 6:44:16 GMT",
		EndDate: "Wed, 18 Jan 2023 7:44:16 GMT",
		NurseId: "1",
		Qualification: "LPN",
	},	{
		Id: "6",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "2",
		Qualification: "LPN",
	}, {
		Id: "7",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "0",
		Qualification: "RN",
	}, {
		Id: "8",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "2",
		Qualification: "CNA",
	},	{
		Id: "9",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "0",
		Qualification: "LPN",
	},	{
		Id: "10",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		Qualification: "LPN",
		NurseId: "0",
	},	{
		Id: "11",
		StartDate: "Wed, 18 Jan 2023 23:44:16 GMT",
		EndDate: "Wed, 25 Jan 2023 23:44:16 GMT",
		NurseId: "2",
		Qualification: "LPN",
	},
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func getNurses(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(nurses)
}

func getNurse(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	vars := mux.Vars(r)
	nurseId := vars["id"]

	for _, nurse := range nurses {
		if nurse.Id == nurseId {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(nurse)
			return
		}
	}
	w.WriteHeader(http.StatusNoContent)
	fmt.Fprintf(w, "Nurse not found")
}

func getShifts(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(shifts)
}

func updateShift(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	vars := mux.Vars(r)
	shiftId := vars["id"]
	var nurseId string

	reqBody, reqBodyError := io.ReadAll(r.Body)

	if reqBodyError != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Something get wrong")
	}

	json.Unmarshal(reqBody, &nurseId)

	for _, shift := range shifts {
		if shift.Id == shiftId {
			shift.NurseId = nurseId
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			fmt.Fprintf(w, "Shift updated successfull")
			return
		}
	}
	w.WriteHeader(http.StatusNoContent)
	fmt.Fprintf(w, "Shift not found")
}

func main() {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/nurses", getNurses).Methods("GET")
	router.HandleFunc("/nurse/{id}", getNurse).Methods("GET")

	router.HandleFunc("/shifts", getShifts).Methods("GET")
	router.HandleFunc("/shift/{id}", updateShift).Methods("PATCH")

	log.Fatal(http.ListenAndServe(":3000", router))
}