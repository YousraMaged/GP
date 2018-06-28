export interface Report {
    notify: boolean,
    Category: string,
    Description: string,
    clientId: string,
    email: string,
    Date: Date,
    Location: {
        "lat": number,
        "lng": number
    },
    Number: number,
    clientName: string,
    status: string
}
