export interface Report {
    notify: boolean,
    category: string,
    description: string,
    clientId: string,
    email: string,
    date: Date,
    location: {
        "lat": number,
        "lng": number
    }
}
