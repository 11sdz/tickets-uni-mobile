export function getLocationText(location:string){
    if(!location){
        return "לא צויין מיקום"; // Default message in Hebrew meaning "No location specified"
    }else if(location.length > 40){
        return location.slice(0, 30) + "..."; // Truncate to 40 characters and add ellipsis if it's too long
        // This ensures that if the location is too long, it will be truncated to 40 characters and will end with an ellipsis for readability.
    }
    return location
}