// --------------------
// InkConnect Dashboard main.js
// JS1 & JS2 Course Rubric – Fully Commented
// --------------------

document.addEventListener("DOMContentLoaded", () => {

    // --------------------
    // JS1: Variables / Constants / Arrays of Objects
    // --------------------
    const artists = [ // JS1: const, array of objects
        { name: "AJ", specialty: "Tattoo" },
        { name: "Taylor", specialty: "Digital Art" },
        { name: "Jordan", specialty: "Illustration" }
    ];

    const projects = [ // JS1: const, array of objects
        { title: "Dragon Tattoo", artist: "AJ", description: "Full sleeve dragon tattoo design" },
        { title: "Abstract Portrait", artist: "Taylor", description: "Digital portrait with abstract elements" },
        { title: "Graffiti Mural", artist: "Jordan", description: "Street art mural project" }
    ];

    // --------------------
    // JS1: DOM Elements (getElementById)
    // --------------------
    const loadArtistsBtn = document.getElementById("fetchArtistsBtn"); // JS1: DOM selection
    const loadPortfolioBtn = document.getElementById("fetchPortfolioBtn"); // JS1: DOM selection
    const uploadProjectBtn = document.getElementById("uploadBtn"); // JS1: DOM selection
    const artistsContainer = document.getElementById("artistList"); // JS1: DOM selection
    const portfolioContainer = document.getElementById("portfolioList"); // JS1: DOM selection

    // --------------------
    // JS2: Reusable Functions
    // --------------------
    function renderArtists(list) { // JS2: function with arguments
        artistsContainer.innerHTML = ""; // JS1: DOM manipulation

        list.forEach(artist => { // JS1: loop
            const li = document.createElement("li"); // JS2: advanced DOM
            li.textContent = `${artist.name} — ${artist.specialty}`; // JS1: template literal
            li.style.transition = "background-color 0.3s"; // JS2: CSS via JS

            // JS2: Event handling – hover effect
            li.onmouseover = () => li.style.backgroundColor = "#f0f0f0";
            li.onmouseout = () => li.style.backgroundColor = "";

            artistsContainer.appendChild(li); // JS2: append child
        });
    }

    function renderProjects(list) { // JS2: reusable function
        portfolioContainer.innerHTML = ""; // JS1: DOM manipulation

        list.forEach(project => { // JS1: loop
            const li = document.createElement("li"); // JS2: advanced DOM
            li.textContent = `${project.title} by ${project.artist} — ${project.description}`; // JS1: template literal
            li.style.opacity = 0; // JS2: CSS via JS
            li.style.transition = "opacity 0.5s"; // JS2: CSS animation
            portfolioContainer.appendChild(li); // JS2: append child

            setTimeout(() => li.style.opacity = 1, 50); // JS2: setTimeout
        });
    }

    function addProject(title, artist, description) { // JS2: reusable function w/ args
        projects.push({ title, artist, description }); // JS1: array manipulation
    }

    // --------------------
    // JS1 & JS2: Event Listeners
    // --------------------
    loadArtistsBtn.onclick = () => renderArtists(artists); // JS1: event, JS2: function call
    loadPortfolioBtn.onclick = () => renderProjects(projects); // JS1: event, JS2: function call

    uploadProjectBtn.onclick = () => { // JS1: event, JS2: conditional logic
        const title = prompt("Enter project title:"); // JS1: prompt
        const artist = prompt("Enter artist name:"); // JS1: prompt
        const description = prompt("Enter project description:"); // JS1: prompt

        if (title && artist && description) { // JS1: conditional
            addProject(title, artist, description); // JS2: reusable function
            alert("Project uploaded successfully!"); // JS1: alert
            renderProjects(projects); // JS2: refresh DOM
        } else {
            alert("All fields are required."); // JS1: alert
        }
    };

    // --------------------
    // JS2: Timed / Animated Features
    // --------------------
    setInterval(() => { // JS2: timed action
        const items = artistsContainer.querySelectorAll("li"); // JS2: DOM query
        if (items.length === 0) return; // JS1: conditional

        // JS2: clear previous highlights
        items.forEach(li => li.style.border = "");

        // JS2: highlight random artist
        const randomIndex = Math.floor(Math.random() * items.length); // JS1: Math + variable
        items[randomIndex].style.border = "2px solid #ff5722"; // JS2: CSS via JS
    }, 5000);

});
