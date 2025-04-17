export interface TicketData {
    _id: string; // Add this if your API returns _id
    ticketId: string;
    title: string;
    location: string;
    officeNumber: string;
    mobileNumber: string;
    personalName: string;
    position: string;
    text: string;
    status: string;
    agent: string;
    generatedTitle: string;
    createdAt: string;
    date: string;
    comments: Comment[];
}

export interface Comment {
    _id: string;
    authorId: string;
    authorName: string;
    timestamp: string;
    content: string;
}

export interface StatusData {
    _id: string;
    userId: string;
    status: string;
    lastUpdated: string;
    __v: number;
    firstName: string;
    lastName: string;
}

export interface UserLocation {
    _id: string; // MongoDB document ID
    userId: string; // User's ID (ObjectId string)
    type: 'Point'; // GeoJSON type
    coordinates: [number, number]; // [longitude, latitude]
    updatedAt?: string; // Optional: if using timestamps in your schema
    createdAt?: string;
  }