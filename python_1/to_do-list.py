import json
import os

TASKS_FILE = "tasks.json"

tasks = []

def load_tasks():
    global tasks
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r") as f:
            tasks = json.load(f)
    else:
        tasks = []

def save_tasks():
    with open(TASKS_FILE, "w") as f:
        json.dump(tasks, f, indent=4)

def add_task():
    description = input("Enter task description: ").strip()
    if description:
        task = {
            "id": len(tasks) + 1,
            "description": description,
            "completed": False
        }
        tasks.append(task)
        print(f"Task added: {description}")
    else:
        print("Task description cannot be empty.")

def view_tasks():
    if not tasks:
        print("No tasks found.")
        return
    print("\nTasks:")
    for task in tasks:
        status = "✔" if task["completed"] else "✘"
        print(f"{task['id']}. [{status}] {task['description']}")
    print()

def remove_task():
    try:
        task_id = int(input("Enter task ID to remove: "))
        for task in tasks:
            if task["id"] == task_id:
                tasks.remove(task)
                print(f"Removed task {task_id}")
                return
        print("Task ID not found.")
    except ValueError:
        print("Invalid input, please enter a number.")

def mark_complete():
    try:
        task_id = int(input("Enter task ID to mark complete: "))
        for task in tasks:
            if task["id"] == task_id:
                task["completed"] = True
                print(f"Task {task_id} marked as complete.")
                return
        print("Task ID not found.")
    except ValueError:
        print("Invalid input, please enter a number.")

def main():
    load_tasks()
    while True:
        print("\nTo-Do List Manager")
        print("1. View Tasks")
        print("2. Add Task")
        print("3. Remove Task")
        print("4. Mark Task Complete")
        print("5. Save & Exit")

        choice = input("Choose an option: ").strip()

        if choice == '1':
            view_tasks()
        elif choice == '2':
            add_task()
        elif choice == '3':
            remove_task()
        elif choice == '4':
            mark_complete()
        elif choice == '5':
            save_tasks()
            print("Tasks saved. Goodbye!")
            break
        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    main()
