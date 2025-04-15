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
