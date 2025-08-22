export function searchTasks(tasks, searchTerm) {
  if (!searchTerm) return tasks;
  return tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function sortTasks(tasks, sortBy) {
  if (sortBy === 'titleA-Z') {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }else if (sortBy === 'titleZ-A') {
    return [...tasks].sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortBy === 'dueDateAscending') {
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortBy === 'dueDateDescending') {
    return [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  } else if (sortBy === 'taskDone') {
    return [...tasks].sort((a, b) => a.taskDone - b.taskDone);
  } else if (sortBy === 'taskNotDone') {
    return [...tasks].sort((a, b) => b.taskDone - a.taskDone);
  } else if (sortBy === 'createdAt') {
    return [...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortBy === 'reset') {
    return tasks;  }
  return tasks;
}

export function filterTasks(tasks, filterBy) {
  if (filterBy === 'all') return tasks;
  if (filterBy === 'done') return tasks.filter(task => task.taskDone);
  if (filterBy === 'notDone') return tasks.filter(task => !task.taskDone);
  return tasks;
}