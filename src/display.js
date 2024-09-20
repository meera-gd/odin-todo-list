import { save } from "./storage";
import { Project, Todo } from "./todo";

class Display {
  constructor(app) {
    this.app = app;
    this.updatingProject = null;
    this.updatingTodo = null;

    const addProjectBtn = document.querySelector("#add-project-btn");
    const projectForm = document.querySelector("#project-form");
    addProjectBtn.addEventListener("click", () => {
      this.updatingProject = null;
      const nameField = document.querySelector("#name");
      nameField.value = "";
      projectForm.style.display = "block";
    });
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameField = document.querySelector("#name");
      if (this.updatingProject) {
        this.updatingProject.name = nameField.value;
      } else {
        this.app.addProject(new Project(nameField.value, []));
      }
      projectForm.style.display = "none";
      nameField.value = "";
      this.update();
    });

    const addTodoBtn = document.querySelector("#add-todo-btn");
    const todoForm = document.querySelector("#todo-form");
    addTodoBtn.addEventListener("click", () => {
      this.updatingTodo = null;
      const titleField = document.querySelector("#title");
      const descField = document.querySelector("#description");
      const dateField = document.querySelector("#dueDate");
      const priorityField = document.querySelector("#low");
      titleField.value = "";
      descField.value = "";
      dateField.value = null;
      priorityField.checked = true;
      todoForm.style.display = "block";
    });
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleField = document.querySelector("#title");
      const descField = document.querySelector("#description");
      const dateField = document.querySelector("#dueDate");
      const priorityField = document.querySelector(
        'input[name="priority"]:checked'
      );
      if (this.updatingTodo) {
        this.updatingTodo.title = titleField.value;
        this.updatingTodo.description = descField.value;
        this.updatingTodo.dueDate = dateField.value;
        this.updatingTodo.priority = priorityField.id;
      } else {
        this.app.projects[this.app.currentProject].addTodo(
          new Todo(
            titleField.value,
            descField.value,
            dateField.value,
            priorityField.id,
            false
          )
        );
      }
      todoForm.style.display = "none";
      titleField.value = "";
      descField.value = "";
      dateField.value = null;
      const lowPriorityField = document.querySelector("#low");
      lowPriorityField.checked = true;
      this.update();
    });

    this.update();
  }

  update() {
    save(this.app);

    const projectList = document.querySelector("#projects");
    projectList.textContent = "";
    for (const project of this.app.projects) {
      const li = document.createElement("li");
      li.textContent = project.name;
      if (project !== this.app.projects[this.app.currentProject]) {
        const button = document.createElement("button");
        button.textContent = "View";
        button.addEventListener("click", () => {
          this.app.currentProject = this.app.projects.indexOf(project);
          this.update();
        });
        li.appendChild(button);
      }
      if (project !== this.app.projects[0]) {
        const renameBtn = document.createElement("button");
        renameBtn.textContent = "Rename";
        renameBtn.addEventListener("click", () => {
          const projectForm = document.querySelector("#project-form");
          this.updatingProject = project;
          const nameField = document.querySelector("#name");
          nameField.value = project.name;
          projectForm.style.display = "block";
        });
        li.appendChild(renameBtn);
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          this.app.removeProject(project);
          this.update();
        });
        li.appendChild(delBtn);
      }
      projectList.appendChild(li);
    }

    const projectHeader = document.querySelector("#project-header");
    projectHeader.textContent = this.app.projects[this.app.currentProject].name;

    const todoList = document.querySelector("#todos");
    todoList.textContent = "";
    for (const todo of this.app.projects[this.app.currentProject].todos) {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("click", () => {
        todo.completed = !todo.completed;
        this.update();
      });
      li.appendChild(checkbox);
      const span = document.createElement("span");
      span.textContent = todo.title;
      if (todo.dueDate) {
        span.textContent += ` - ${todo.dueDate}`;
      }
      span.classList.add(todo.priority);
      if (todo.completed) {
        span.classList.add("completed");
      }
      li.appendChild(span);
      const p = document.createElement("p");
      p.style.display = "none";
      p.textContent = todo.description;
      li.appendChild(p);
      const button = document.createElement("button");
      button.textContent = "Expand";
      button.addEventListener("click", () => {
        p.style.display = p.style.display == "none" ? "block" : "none";
        button.textContent = p.style.display == "block" ? "Collapse" : "Expand";
      });
      li.appendChild(button);
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        this.updatingTodo = todo;
        const titleField = document.querySelector("#title");
        const descField = document.querySelector("#description");
        const dateField = document.querySelector("#dueDate");
        const priorityField = document.querySelector(`#${todo.priority}`);
        titleField.value = todo.title;
        descField.value = todo.description;
        dateField.value = todo.dueDate;
        priorityField.checked = true;
        const todoForm = document.querySelector("#todo-form");
        todoForm.style.display = "block";
      });
      li.appendChild(editBtn);
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        this.app.projects[this.app.currentProject].removeTodo(todo);
        this.update();
      });
      li.appendChild(delBtn);
      todoList.appendChild(li);
    }
  }
}

export { Display };
