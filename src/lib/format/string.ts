/**
 * Get initials from a name string
 * @param name - Full name (e.g., "张三" or "John Doe")
 * @returns Initials (e.g., "张三" -> "张三", "John Doe" -> "JD")
 */
export const getInitials = (name?: string) => {
  if (!name) return "A"; // Anonymous
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
