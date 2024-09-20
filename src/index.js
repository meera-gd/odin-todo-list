import "./style.css";
import { Display } from "./display";
import { load } from "./storage";
import { App, Project, Todo } from "./todo";

function convertState(state) {
  return new App(
    state.projects.map((p) => {
      return new Project(
        p.name,
        p.todos.map((t) => {
          return new Todo(
            t.title,
            t.description,
            t.dueDate,
            t.priority,
            t.completed
          );
        })
      );
    }),
    state.currentProject
  );
}

const app = convertState(load());
new Display(app);
