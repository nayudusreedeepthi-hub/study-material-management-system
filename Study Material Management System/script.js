// Default study materials

let materials = JSON.parse(localStorage.getItem("studyMaterials")) || [

    {
        id: 1,
        title: "HTML Basics",
        subject: "Web Technology",
        type: "Notes",
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        description: "Introduction to HTML tags, elements, forms and webpage structure."
    },

    {
        id: 2,
        title: "CSS Complete Guide",
        subject: "Web Technology",
        type: "PDF",
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        description: "Learn CSS selectors, layouts, colors, animations and responsive design."
    },

    {
        id: 3,
        title: "JavaScript Fundamentals",
        subject: "Web Technology",
        type: "Video",
        link: "https://javascript.info/",
        description: "Learn JavaScript variables, functions, arrays, objects and DOM."
    },

    {
        id: 4,
        title: "Cloud Computing Notes",
        subject: "Cloud Computing",
        type: "Notes",
        link: "https://aws.amazon.com/what-is-cloud-computing/",
        description: "Introduction to cloud computing, service models and deployment models."
    },

    {
        id: 5,
        title: "DBMS Fundamentals",
        subject: "DBMS",
        type: "PDF",
        link: "https://www.geeksforgeeks.org/dbms/",
        description: "Database concepts, keys, SQL, normalization and transactions."
    }

];


// Get HTML elements

const materialContainer =
    document.getElementById("materialContainer");

const materialForm =
    document.getElementById("materialForm");

const searchInput =
    document.getElementById("searchInput");

const subjectFilter =
    document.getElementById("subjectFilter");


// Display materials

function displayMaterials() {

    materialContainer.innerHTML = "";

    const searchText =
        searchInput.value.toLowerCase();

    const selectedSubject =
        subjectFilter.value;


    const filteredMaterials = materials.filter(material => {

        const matchesSearch =
            material.title.toLowerCase().includes(searchText) ||
            material.description.toLowerCase().includes(searchText);

        const matchesSubject =
            selectedSubject === "all" ||
            material.subject === selectedSubject;

        return matchesSearch && matchesSubject;

    });


    if (filteredMaterials.length === 0) {

        materialContainer.innerHTML = `
            <p style="text-align:center; grid-column:1/-1;">
                No study materials found.
            </p>
        `;

        updateStatistics();

        return;
    }


    filteredMaterials.forEach(material => {

        const card = document.createElement("div");

        card.className = "material-card";


        card.innerHTML = `

            <h3>📚 ${material.title}</h3>

            <span class="subject">
                ${material.subject}
            </span>

            <div class="type">
                Type: ${material.type}
            </div>

            <p>
                ${material.description}
            </p>

            <div class="card-buttons">

                <a
                    href="${material.link}"
                    target="_blank"
                    class="view-btn"
                >
                    🔗 View
                </a>

                <button
                    class="delete-btn"
                    onclick="deleteMaterial(${material.id})"
                >
                    🗑 Delete
                </button>

            </div>

        `;

        materialContainer.appendChild(card);

    });


    updateStatistics();
}


// Add material

materialForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const newMaterial = {

        id: Date.now(),

        title:
            document.getElementById("title").value,

        subject:
            document.getElementById("subject").value,

        type:
            document.getElementById("type").value,

        link:
            document.getElementById("link").value,

        description:
            document.getElementById("description").value

    };


    materials.push(newMaterial);


    localStorage.setItem(
        "studyMaterials",
        JSON.stringify(materials)
    );


    materialForm.reset();

    displayMaterials();


    alert("Study material added successfully! 📚");


    document
        .getElementById("materials")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// Delete material

function deleteMaterial(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this material?");


    if (!confirmDelete) {
        return;
    }


    materials =
        materials.filter(material => material.id !== id);


    localStorage.setItem(
        "studyMaterials",
        JSON.stringify(materials)
    );


    displayMaterials();

}


// Statistics

function updateStatistics() {

    document.getElementById("totalMaterials").textContent =
        materials.length;


    document.getElementById("pdfCount").textContent =
        materials.filter(material =>
            material.type === "PDF"
        ).length;


    document.getElementById("videoCount").textContent =
        materials.filter(material =>
            material.type === "Video"
        ).length;


    document.getElementById("noteCount").textContent =
        materials.filter(material =>
            material.type === "Notes"
        ).length;

}


// Search

searchInput.addEventListener(
    "input",
    displayMaterials
);


// Filter

subjectFilter.addEventListener(
    "change",
    displayMaterials
);


// Initial display

displayMaterials();