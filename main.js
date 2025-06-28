const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = ""
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.tagName === "LI" && !e.target.querySelector("input") ) {
        e.target.classList.toggle("checked");
        saveData();
    } 
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

inputBox.addEventListener("keypress", function(event) {
    if( event.key === "Enter") {
        addTask();
    }
})

listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        const li = e.target;
        const currentText = li.firstChild.textContent.trim();
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "edit-box";

        li.innerHTML = "";
        li.appendChild(input);
        input.focus();

        input.addEventListener("blur", finishEdit);
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") finishEdit();
        });

        function finishEdit() {
            const newText = input.value.trim();
            if (newText !== "") {
                li.innerHTML = newText;

                const span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
                saveData();
            } else {
                li.remove(); 
                saveData();
            }
        }
    }
});

function sortTasks() {
    let tasks = Array.from(listContainer.children);

    tasks.sort((a, b) => {
        const textA = a.firstChild.textContent.trim().toLowerCase();
        const textB = b.firstChild.textContent.trim().toLowerCase();
        return textA.localeCompare(textB);
    });

    listContainer.innerHTML = "";

    tasks.forEach(task => listContainer.appendChild(task));

    saveData();
}

