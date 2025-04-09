
export function getLocationText(location:string,length?:number):string{
    const len = length || 40; // Default length is 40 if not provided
    if(!location){
        return "לא צויין מיקום"; // Default message in Hebrew meaning "No location specified"
    }else if(location.length > len){
        return location.slice(0, len) + "..."; // Truncate to specified length and add ellipsis if it's too long
        // This ensures that if the location is too long, it will be truncated to the specified length and will end with an ellipsis for readability.
    }
    return location
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
        default:
            return status; // Return the original status if it doesn't match any known ones
    }
}