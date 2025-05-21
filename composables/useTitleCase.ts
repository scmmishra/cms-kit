export const useTitleCase = (str: string) => {
  // Handle both snake_case and camelCase
  return str
    // Replace underscores with spaces for snake_case
    .replace(/_/g, ' ')
    // Insert space before capital letters for camelCase
    .replace(/([A-Z])/g, ' $1')
    // Capitalize first letter of each word
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim()
}
