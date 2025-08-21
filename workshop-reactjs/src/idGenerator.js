export function generateId(tasks) {
  const existingIds = tasks.map((task) => task.id);
  if (existingIds.length === 0) {
    return 1; // Start with 1 if no tasks exist
  }else {
    return Math.max(...existingIds) + 1; // Increment the highest existing ID
  }
}
