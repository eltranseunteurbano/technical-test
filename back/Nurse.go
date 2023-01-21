package main

type Nurse struct {
	Id            string `json:"id"`
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	UserName      string `json:"userName"`
	Qualification string `json:"qualification"`
}

func NewNurse(id, firstName, lastName, userName, qualification string) *Nurse {
	return &Nurse{
		Id:            id,
		FirstName:     firstName,
		LastName:      lastName,
		UserName:      userName,
		Qualification: qualification,
	}
}