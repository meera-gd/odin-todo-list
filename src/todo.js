class Todo {
  constructor(title, description, dueDate, priority, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todo) {
    const idx = this.todos.indexOf(todo);
    if (idx < 0) {
      return;
    }
    this.todos.splice(idx, 1);
  }
}

class App {
  constructor() {
    this.projects = [new Project("Inbox")];
    this.currentProject = this.projects[0];
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(project) {
    const idx = this.projects.indexOf(project);
    if (idx < 0) {
      return;
    }
    this.projects.splice(idx, 1);
    if (this.currentProject === project) {
      this.currentProject = this.projects[0];
    }
  }
}

export { App, Project, Todo };
