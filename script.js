const tasks = document.querySelectorAll(".task");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


function updateProgress() {

    const total = tasks.length;

    const completed =
        document.querySelectorAll(
            ".task.completed"
        ).length;

    const percentage =
        Math.round(
            (completed / total) * 100
        );

    progressFill.style.width =
        percentage + "%";

    progressText.textContent =
        percentage + "%";
}


tasks.forEach(task => {

    const button =
        task.querySelector(".check");

    button.addEventListener("click", () => {

        task.classList.toggle("completed");

        if (task.classList.contains("completed")) {

            button.textContent = "✓";

        } else {

            button.textContent = "○";

        }

        updateProgress();

    });

});


/* Small interaction for the + button */

const addTask =
    document.getElementById("addTask");


addTask.addEventListener("click", () => {

    const taskName =
        prompt("Enter a new task:");

    if (!taskName || !taskName.trim()) {
        return;
    }

    const taskContainer =
        document.querySelector(".tasks");

    const newTask =
        document.createElement("div");

    newTask.className = "task";

    newTask.innerHTML = `
        <button class="check">○</button>
        <span>${taskName.trim()}</span>
    `;

    taskContainer.appendChild(newTask);


    const button =
        newTask.querySelector(".check");


    button.addEventListener("click", () => {

        newTask.classList.toggle(
            "completed"
        );

        button.textContent =
            newTask.classList.contains("completed")
                ? "✓"
                : "○";

        updateProgress();

    });

});