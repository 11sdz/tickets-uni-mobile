export function getLocationText(location:string){
    if(!location){
        return "לא צויין מיקום"; // Default message in Hebrew meaning "No location specified"
    }else if(location.length > 40){
        return location.slice(0, 30) + "..."; // Truncate to 40 characters and add ellipsis if it's too long
        // This ensures that if the location is too long, it will be truncated to 40 characters and will end with an ellipsis for readability.
    }
    return location
}

export function getFormattedDate(date: string): string {
    const parsedDate = new Date(date); // Parse the date string into a Date object
    const formattedDate = parsedDate.toLocaleString("he-IL", {
       // weekday: "long", // e.g., "יום שישי"
        year: "numeric",
        month: "numeric", // e.g., "מרץ"
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format (set to true for AM/PM)
      });
    
    
    return formattedDate; // Return the formatted date string
}