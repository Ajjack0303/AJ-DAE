# To-Do List Manager

A Python-based command-line To-Do List Manager that allows users to create, view, update, and delete tasks. This project demonstrates file handling, data persistence using JSON, and basic task management logic in Python.

---

## Features

- Add new tasks with title and description
- Mark tasks as completed
- Delete tasks
- View all tasks in a structured list
- Save and load tasks using a JSON file (`tasks.json`)
- Simple, easy-to-use command-line interface
- Compatible with Python 3.13+

---

## Requirements

- Python 3.x (3.13 recommended)
- Standard Python libraries: `json`, `os`, `datetime`
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

3. Ensure Python standard libraries are available (no additional packages required).

---

## Running the To-Do List Manager

To run the main script:

```bash
python3 to_do-list.py
```

Follow the on-screen prompts to add, update, delete, or view tasks. Tasks are automatically saved to `tasks.json`.

---

## Project Structure

```
to_do_list/
│
├── README.md           # Project documentation
├── to_do-list.py       # Main Python script for task management
└── tasks.json          # JSON file storing task data
```

---

## Git and Version Control

* Exclude virtual environments and Python cache files in `.gitignore`:

```
venv_todo/
*.pyc
__pycache__/
```

* Track only source code, task data, and project documentation.

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

- This project is intended as a learning tool for basic Python file handling and CLI interaction.
- Customize or extend the task manager by adding priority levels, deadlines, or other features.
- Ensure Python 3.x is used to avoid compatibility issues.
