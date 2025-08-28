# To-Do List Manager

A Python-based To-Do List Manager that allows users to add, view, and manage tasks with save/load functionality. This project demonstrates basic CLI or GUI-based task management and file handling in Python.

---

## Features

- Add, remove, and view tasks
- Save and load tasks to/from a JSON file
- Simple, intuitive interface
- Works entirely in Python, compatible with Python 3.13+

---

## Requirements

- Python 3.x (3.13 recommended)
- Standard Python libraries: `json`, `os`
- Optional virtual environment for isolation

---

## Setup

1. Navigate to the project folder:

```bash
cd ~/Desktop/DAE-6.12.25-job-roles/projects/to_do_list
```

2. (Optional) Create and activate a virtual environment:

```bash
python3 -m venv venv_todo
source venv_todo/bin/activate
```

3. Install any dependencies if needed (currently uses standard Python libraries).

---

## Running the To-Do List Manager

To run the script:

```bash
python3 to_do-list.py
```

The CLI/GUI will launch, allowing you to manage tasks interactively.

---

## Configuration

- Tasks are stored in a JSON file (`tasks.json`) for persistence
- Modify the file path in the script if you want to store tasks elsewhere

---

## Project Structure

```
to_do_list/
│
├── to_do-list.py       # Main script
├── tasks.json          # JSON file storing tasks
├── venv_todo/          # Optional virtual environment
└── README.md           # Project documentation
```

---

## Git and Version Control

* Exclude runtime or generated files in `.gitignore`:

```
venv_todo/
*.pyc
__pycache__/
tasks.json
```

* Track only the source code, configuration, and documentation.

---

## Contributing

1. Fork the repository
2. Make your changes on a new branch
3. Submit a pull request describing your modifications

---

## License

Specify your license here (e.g., MIT, GPL, etc.)

---

## Notes

* This project is intended as a simple task management tool
* Ensure Python 3.x is used to avoid compatibility issues
* JSON file storage allows persistent task tracking across sessions

