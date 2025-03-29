export function formatTimeElapsed(start: Date): string {
    // Function to format elapsed time since start date
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - start.getTime()) / 1000); // Elapsed time in seconds

    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    // You can adjust the format as needed
}