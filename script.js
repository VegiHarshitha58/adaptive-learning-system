const API = "http://localhost:5000";

async function loadTopics() {
    const res = await fetch(API + "/topics");
    const data = await res.json();

    const list = document.getElementById("topicList");
    list.innerHTML = "";

    data.forEach((t, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${t.name} (${t.difficulty}, ${t.understanding})
            <button style="background:red;" onclick="deleteTopic(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function addTopic() {
    const name = document.getElementById("topicInput").value;
    const difficulty = document.getElementById("difficulty").value;
    const understanding = document.getElementById("understanding").value;

    await fetch(API + "/topics", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, difficulty, understanding })
    });

    loadTopics();
}

async function deleteTopic(index) {
    await fetch(API + "/topics/" + index, {
        method: "DELETE"
    });

    loadTopics();
}

async function clearAll() {
    await fetch(API + "/topics", {
        method: "DELETE"
    });

    loadTopics();
}
async function generatePlan() {
    const res = await fetch(API + "/plan");
    const data = await res.json();

    const plan = document.getElementById("plan");
    plan.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");

        let level = "";
        let color = "";

        if (item.score >= 6) {
            level = "HIGH";
            color = "red";
        } else if (item.score >= 3) {
            level = "MEDIUM";
            color = "orange";
        } else {
            level = "LOW";
            color = "green";
        }

        li.innerHTML = `
            ${item.name} - Score: ${item.score}
            <span style="color:${color}; font-weight:bold;">(${level})</span>
        `;

        plan.appendChild(li);
    });
}

loadTopics();