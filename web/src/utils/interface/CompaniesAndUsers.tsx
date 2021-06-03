export interface User {
	"_id": number
	"company": string
	"email": string
	"first_name": string
	"last_name": string
	"phone": string
}

export interface CompanyWithItsUsers {
	company: string
	users: Array<string>
}
