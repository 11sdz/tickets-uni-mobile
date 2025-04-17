import { Colors } from "../styles";

export function getLocationText(location: string, length?: number): string {
    const len = length || 40; // Default length is 40 if not provided
    if (!location) {
        return "לא צויין מיקום"; // Default message in Hebrew meaning "No location specified"
    } else if (location.length > len) {
        return location.slice(0, len) + "..."; // Truncate to specified length and add ellipsis if it's too long
        // This ensures that if the location is too long, it will be truncated to the specified length and will end with an ellipsis for readability.
    }
    return location;
}

export function getFormattedCreatedDate(date: string): string {
    const parsedDate = new Date(date); // Parse the date string into a Date object
    const formattedDate = parsedDate.toLocaleString("he-IL", {
        // weekday: "long", // e.g., "יום שישי"
        year: "numeric",
        month: "numeric", // e.g., "מרץ"
        day: "numeric",
        hour12: false, // 24-hour format (set to true for AM/PM)
    });

    return formattedDate; // Return the formatted date string
}

export function getFormattedDate(dateStr: string): string {
    console.log("Raw Date String:", dateStr); // Debugging log

    // Trim any extra spaces from the date string
    dateStr = dateStr.trim();

    // Ensure the format is correct (DD/MM/YYYY HH:mm:ss)
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;
    const match = dateStr.match(dateRegex);

    if (!match) {
        console.error("Invalid date format:", dateStr);
        return "Invalid Date";
    }

    // Extract parts
    const [, day, month, year, hour, minute, second] = match.map(Number);

    // Create a valid Date object (JS months are 0-based)
    const parsedDate = new Date(year, month - 1, day, hour, minute, second);

    console.log("Parsed Date Object:", parsedDate); // Debugging log

    // Format it in Hebrew locale
    return parsedDate.toLocaleString("he-IL", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour12: false, // 24-hour format
    });
}

export function getFormattedStatus(status: string): string {
    switch (status) {
        case "open":
            return "פתוח";
        case "completed":
            return "טופל";
        case "uncompleted":
            return "לא טופל";
        case "inprogress":
            return "בטיפול";
        default:
            return status; // Return the original status if it doesn't match any known ones
    }
}

export function getTicketStatusColor(status: string): string {
    switch (status) {
        case "open":
            return Colors.colors.blue;
        case "completed":
            return Colors.colors.green;
        case "uncompleted":
            return Colors.colors.red;
        case "inprogress":
            return Colors.colors.orange; // Assuming you have a yellow color defined for in-progress
        default:
            return Colors.colors.blue;
    }
}

// Sort tickets by status using a custom order
const statusOrder = {
    inprogress: 1,
    open: 2,
    completed: 3,
    uncompleted: 4,
};

export function sortTicketData(ticketData: any[], sortBy: string) {
    switch (sortBy) {
        case "statusThenDate":
            return [...ticketData].sort((a, b) => {
                // Sort by status first using custom order
                const statusComparison = statusOrder[a.status] - statusOrder[b.status];
                if (statusComparison !== 0) return statusComparison;

                // If statuses are the same, then sort by date
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        case "createdDate":
            return [...ticketData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case "status":
            return [...ticketData].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        default:
            return ticketData;
    }
}
