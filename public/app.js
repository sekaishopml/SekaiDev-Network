const nodeList = document.getElementById("node-list");
const countEl = document.getElementById("count");
const statusEl = document.getElementById("status");
const statusText = document.getElementById("status-text");
const form = document.getElementById("add-form");
const formError = document.getElementById("form-error");

function initials(name) {
  return name.trim().slice(0, 2).toUpperCase();
}

function renderNodes(nodes) {
  nodeList.innerHTML = "";
  countEl.textContent = String(nodes.length);
  for (const node of nodes) {
    const li = document.createElement("li");
    li.className = "node";
    li.innerHTML = `
      <div class="avatar">${initials(node.name)}</div>
      <div class="meta">
        <div class="name">${node.name}</div>
        <div class="role">${node.role}</div>
      </div>
      <div class="presence ${node.online ? "online" : ""}">
        ${node.online ? "online" : "offline"}
      </div>`;
    nodeList.appendChild(li);
  }
}

async function loadHealth() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    if (data.status === "ok") {
      statusEl.classList.add("ok");
      statusText.textContent = "API online";
    }
  } catch {
    statusText.textContent = "API unreachable";
  }
}

async function loadNodes() {
  const res = await fetch("/api/nodes");
  const data = await res.json();
  renderNodes(data.nodes);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.textContent = "";
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const res = await fetch("/api/nodes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    formError.textContent = data.error || "Could not add node";
    return;
  }
  form.reset();
  await loadNodes();
});

loadHealth();
loadNodes();
