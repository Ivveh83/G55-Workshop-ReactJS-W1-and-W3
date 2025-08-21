export function searchTasks(tasks, searchTerm) {
  if (!searchTerm) return tasks;
  return tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}