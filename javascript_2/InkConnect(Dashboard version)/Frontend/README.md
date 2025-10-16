Perfect — here’s the **fully corrected, ready-to-copy README.md** for your InkConnect Dashboard project:

````markdown
# InkConnect Dashboard

## Overview
The InkConnect Dashboard is an interactive web interface that allows users to view artists, explore portfolios, and upload new projects. This project demonstrates mastery of JavaScript fundamentals (JS1) and advanced concepts (JS2), including DOM manipulation, event handling, timed actions, and dynamic content updates.

---

## Features

- **Load Artists**: Displays a list of artists with their specialties.  
- **Load Portfolio**: Displays a list of projects with details.  
- **Upload New Project**: Users can enter new project data via prompts; portfolio updates dynamically.  
- **Hover Effects**: Artist list items highlight on mouseover.  
- **Fade-in Animation**: Portfolio projects fade in when loaded.  
- **Random Artist Highlight**: Every 5 seconds, a random artist is highlighted.

---

## Technologies Used

- HTML5  
- CSS3 (inline via JS for transitions)  
- JavaScript ES6+ (JS1 & JS2 rubric compliance)

---

## Rubric Compliance

### JS1
- Variables and constants (`const`, descriptive names)  
- Arrays of objects for artists and projects  
- Loops (`forEach`)  
- Conditional statements (`if`, `else`)  
- Functions with parameters (`addProject`, `renderArtists`, `renderProjects`)  
- DOM selection and manipulation (`getElementById`, `createElement`, `appendChild`, `innerHTML`)  
- Event handling (`onclick`, `onmouseover`, `onmouseout`)  
- Prompts, alerts, and console logs  
- Template literals and arithmetic operators

### JS2
- Reusable functions with arguments  
- Timed actions (`setTimeout`, `setInterval`)  
- Dynamic CSS and animation effects  
- Conditional logic based on events  
- Advanced DOM manipulation (creating and appending elements, querySelectorAll)

---

## How to Run

1. Open Terminal and navigate to the `Frontend` folder:

```bash
cd ~/Desktop/DAE/InkConnect/Frontend
````

2. Start a local server:

```bash
python3 -m http.server 8000
```

3. Open a browser and visit:

```
http://localhost:8000/index.html
```

4. Test buttons and interactions:

* **Load Artists**
* **Load Portfolio**
* **Upload New Project**

---

## Notes

* Make sure `main.js` is in the same folder as `index.html`.
* The dashboard updates dynamically without page reloads.
* Timed highlights continue every 5 seconds as long as the page is open.

---

## Author

AJ Jackson – InkConnect Web Project


