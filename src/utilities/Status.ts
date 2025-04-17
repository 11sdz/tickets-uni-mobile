export function getStatusColor(status: string): string {
    // Function to return color based on status
    switch (status) {
        case "online":
            return "#4CAF50"; // Green for online
        case "offline":
            return "#F44336"; // Red for offline
        default:
            return "#9E9E9E"; // Grey for unknown status
    }
    // You can also use Colors.colors.success or other constants if you have them defined
}

export function getUserStatus(
    statusData: Array<{ userId: string; status: string }>,
    userId: string | undefined
): any {
    // Function to get user status based on userId
    const userStatus = statusData.find((data) => data.userId === userId);
    if (userStatus) {
        return userStatus;
    } else {
        return "unknown"; // Default to unknown if no match found
    }
    // This can be used to determine the color of the status indicator
}

