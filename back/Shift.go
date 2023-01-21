package main

type Shift struct {
	Id            string `json:"id"`
	StartDate     string `json:"startDate"`
	EndDate       string `json:"endDate"`
	NurseId       string `json:"nurseId"`
	Qualification string `json:"qualification"`
}

func NewShift(id, startDate, endDate, nurseId, qualification string) *Shift {
	return &Shift{
		Id:            id,
		StartDate:     startDate,
		EndDate:       endDate,
		NurseId:       nurseId,
		Qualification: qualification,
	}
}