export function searchTasks(tasks, searchTerm) {
  if (!searchTerm) return tasks;
  return tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function sortTasks(tasks, filteredTasks, sortBy) {
  if (sortBy === 'titleA-Z') {
    return [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
  }else if (sortBy === 'titleZ-A') {
    return [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortBy === 'dueDateAscending') {
    return [...filteredTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortBy === 'dueDateDescending') {
    return [...filteredTasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  } else if (sortBy === 'taskDone') {
    return [...filteredTasks].sort((a, b) => a.taskDone - b.taskDone);
  } else if (sortBy === 'taskNotDone') {
    return [...filteredTasks].sort((a, b) => b.taskDone - a.taskDone);
  } else if (sortBy === 'createdAt') {
    return [...filteredTasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortBy === 'reset') {
    return tasks;  }
  return tasks;
}

export function filterTasks(tasks, filteredTasks, filterBy, fromDate, toDate) {
  if (filterBy === 'all') return tasks;
  if (filterBy === 'done') return filteredTasks.filter(task => task.taskDone);
  if (filterBy === 'notDone') return filteredTasks.filter(task => !task.taskDone);
  if (filterBy === 'betweenDueDates') {
    return filteredTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= new Date(fromDate) && dueDate <= new Date(toDate);
    });
  }
  return tasks;
}