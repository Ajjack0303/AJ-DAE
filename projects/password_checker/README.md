# Password Strength Checker

A Python command-line tool that evaluates the strength of user-provided passwords. This project demonstrates basic input validation, string analysis, and secure coding practices.

---

## Features

- Check password strength based on:
  - Length
  - Uppercase and lowercase letters
  - Numbers
  - Special characters
- Provides a simple rating (e.g., Weak, Moderate, Strong)
- Command-line interface for easy use
- Compatible with Python 3.13+

---

## Requirements

- Python 3.x (3.13 recommended)
- Standard Python libraries: `re`, `sys`
- Optional virtual environment for isolation

---

## Setup

1. Navigate to the project folder:

```bash
cd ~/Desktop/DAE-6.12.25-job-roles/projects/password_checker
```

2. (Optional) Create and activate a virtual environment:

```bash
python3 -m venv venv_password
source venv_password/bin/activate
```

3. Ensure Python standard libraries are available (no additional packages required).

---

## Running the Password Strength Checker

To run the script:

```bash
python3 password_checker.py
```

Follow the on-screen prompts to enter a password. The tool will output a strength rating and suggestions for improvement.

---

## Project Structure

```
password_checker/
│
├── README.md               # Project documentation
└── password_checker.py     # Main Python script for password checking
```

---

## Git and Version Control

* Exclude virtual environments and Python cache files in `.gitignore`:

```
venv_password/
*.pyc
__pycache__/
```

* Track only source code and project documentation.

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

- This project is intended as a learning tool for password validation and CLI programming.
- Extend the tool by adding complexity rules, password history checks, or integration with other systems.
- Ensure Python 3.x is used to avoid compatibility issues.
