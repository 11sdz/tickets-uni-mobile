export function getLocationText(location:string){
    if(!location){
        return "לא צויין מיקום"; // Default message in Hebrew meaning "No location specified"
    }else if(location.length > 40){
        return location.slice(0, 30) + "..."; // Truncate to 40 characters and add ellipsis if it's too long
        // This ensures that if the location is too long, it will be truncated to 40 characters and will end with an ellipsis for readability.
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
