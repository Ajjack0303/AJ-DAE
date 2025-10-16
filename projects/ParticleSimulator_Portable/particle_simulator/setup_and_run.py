import os
import sys
import subprocess
import platform

# ----- Config -----
required_packages = ["numpy", "pillow"]

# ----- Helper: Run a shell command -----
def run(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd)
    if result.returncode != 0:
        print(f"Command failed: {' '.join(cmd)}")
        sys.exit(1)

# ----- Step 0: Set project path -----
project_path = os.path.dirname(os.path.abspath(__file__))
os.chdir(project_path)
print(f"Changed directory to {project_path}")

# ----- Step 1: Create virtual environment -----
venv_folder = "venv"
python_exec = sys.executable

if not os.path.exists(venv_folder):
    run([python_exec, "-m", "venv", venv_folder])
else:
    print("Virtual environment already exists.")

# ----- Step 2: Determine venv python path -----
if platform.system() == "Windows":
    venv_python = os.path.join(venv_folder, "Scripts", "python.exe")
else:
    venv_python = os.path.join(venv_folder, "bin", "python")

# ----- Step 3: Upgrade pip -----
run([venv_python, "-m", "pip", "install", "--upgrade", "pip"])

# ----- Step 4: Install required packages -----
for pkg in required_packages:
    run([venv_python, "-m", "pip", "install", pkg])

# ----- Step 5: Detect main simulator file -----
main_file = None
for f in os.listdir(project_path):
    if f.lower().startswith("main") and f.endswith(".py"):
        main_file = f
        break

if not main_file:
    print("Error: Could not find the main simulator Python file (e.g., main2.py).")
    sys.exit(1)

print(f"Detected main simulator file: {main_file}")

# ----- Step 6: Check Tkinter -----
try:
    subprocess.run([venv_python, "-c", "import tkinter"], check=True)
    tk_available = True
except subprocess.CalledProcessError:
    tk_available = False

if not tk_available and platform.system() == "Darwin":
    print("Tkinter not found. Installing via Homebrew...")
    run(["brew", "install", "tcl-tk"])
    print("Tkinter installation complete. You may need to link Python to Homebrew's tcl-tk.")
    try:
        subprocess.run([venv_python, "-c", "import tkinter"], check=True)
    except subprocess.CalledProcessError:
        print("Tkinter still not available. See Homebrew instructions:")
        print("https://formulae.brew.sh/formula/tcl-tk")
        sys.exit(1)
elif not tk_available:
    print("Tkinter not found. Please install it for your OS before running the simulator.")
    sys.exit(1)

# ----- Step 7: Launch simulator -----
run([venv_python, main_file])
