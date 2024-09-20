function load() {
  return (
    JSON.parse(localStorage.getItem("app")) ?? {
      projects: [{ name: "Inbox", todos: [] }],
      currentProject: 0,
    }
  );
}

function save(app) {
  localStorage.setItem("app", JSON.stringify(app));
}

export { load, save };
