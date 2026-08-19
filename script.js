const tasksContainer = document.querySelector(".tasks");

const progressFill = document.getElementById("progressFill");

const progressText = document.getElementById("progressText");

const taskCount = document.getElementById("taskCount");

const progressMessage = document.getElementById("progressMessage");

const addTask = document.getElementById("addTask");


/* =========================
   UPDATE PROGRESS
========================= */

function updateProgress() {

    const tasks = document.querySelectorAll(".task");

    const completed = document.querySelectorAll(
        ".task.completed"
    ).length;

    const total = tasks.length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);


    progressFill.style.width = percentage + "%";

    progressText.textContent = percentage + "%";


    taskCount.textContent =
        `${completed} of ${total} completed`;


    if (total === 0) {

        progressMessage.textContent =
            "Add your first task";

    } else if (percentage === 100) {

        progressMessage.textContent =
            "All done! 🎉";

    } else if (percentage >= 50) {

        progressMessage.textContent =
            "Keep going!";

    } else {

        progressMessage.textContent =
            "Let's get started!";

    }
}


/* =========================
   SETUP TASK
========================= */

function setupTask(task) {

    const check = task.querySelector(".check");

    const deleteButton =
        task.querySelector(".delete-task");


    /* COMPLETE TASK */

    check.addEventListener("click", () => {

        task.classList.toggle("completed");

        if (task.classList.contains("completed")) {

            check.textContent = "✓";

        } else {

            check.textContent = "○";

        }

        updateProgress();

    });


    /* DELETE TASK */

    deleteButton.addEventListener("click", () => {

        task.style.opacity = "0";

        task.style.transform =
            "translateX(20px)";

        setTimeout(() => {

            task.remove();

            updateProgress();

        }, 200);

    });

}


/* =========================
   EXISTING TASKS
========================= */

document
    .querySelectorAll(".task")
    .forEach(setupTask);


/* =========================
   ADD NEW TASK
========================= */

addTask.addEventListener("click", () => {

    const taskName =
        prompt("Enter a new task:");

    if (!taskName || !taskName.trim()) {

        return;

    }


    const newTask =
        document.createElement("div");

    newTask.className = "task";


    newTask.innerHTML = `

        <button
            class="check"
            aria-label="Complete task">
            ○
        </button>

        <span>
            ${taskName.trim()}
        </span>

        <button
            class="delete-task"
            aria-label="Delete task">
            ×
        </button>

    `;


    tasksContainer.appendChild(newTask);


    setupTask(newTask);


    updateProgress();

});


/* =========================
   INITIAL PROGRESS
========================= */

updateProgress();