export interface Request{
    Type: string,
    Location: {
        "lat": number,
        "lng": number
    },
    Date: Date,
    parcelId: number,
    clientId: string,
    Number: number,
    userName: string,
    nationalID: number
}