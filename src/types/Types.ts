export interface TicketData {
    _id: string; // Add this if your API returns _id
    ticketId: string;
    title: string;
    location: string;
    officeNumber: string;
    mobileNumber: string;
    personalName: string;
    personalPosition: string;
    text: string;
    status: string;
    agent: string;
    generatedTitle: string;
    createdAt: string;
    openedAt: string;
}
