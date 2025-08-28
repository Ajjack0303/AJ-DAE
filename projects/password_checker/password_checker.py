# Password Strength Checker CLI Tool
# Author: AJ
# Purpose: Evaluates password strength and gives improvement suggestions using custom logic

import string
import random

def evaluate_password_strength(user_password):
    """
    Evaluates the strength of a given password based on length, character types, and uniqueness.
    Returns a tuple: (strength_score, feedback_messages).
    """
    strength_score = 0
    feedback_messages = []

    # Booleans to track character variety
    has_lowercase = any(char.islower() for char in user_password)
    has_uppercase = any(char.isupper() for char in user_password)
    has_digit = any(char.isdigit() for char in user_password)
    has_symbol = any(char in string.punctuation for char in user_password)
    
    # Evaluate length
    if len(user_password) >= 12:
        strength_score += 2
    elif len(user_password) >= 8:
        strength_score += 1
    else:
        feedback_messages.append("Password is too short. Use at least 8 characters.")

    if has_lowercase:
        strength_score += 1
    else:
        feedback_messages.append("Add lowercase letters.")

    if has_uppercase:
        strength_score += 1
    else:
        feedback_messages.append("Add uppercase letters.")

    if has_digit:
        strength_score += 1
    else:
        feedback_messages.append("Include numbers.")

    if has_symbol:
        strength_score += 1
    else:
        feedback_messages.append("Include special characters (e.g. !@#$%).")

    return strength_score, feedback_messages

def generate_strong_password(length=16):
    """
    Generates a secure password using lowercase, uppercase, digits, and symbols.
    """
    character_pool = string.ascii_letters + string.digits + string.punctuation
    generated_password = ''.join(random.choice(character_pool) for _ in range(length))
    return generated_password

# Main application loop
while True:
    print("\n=== Password Strength Checker ===")
    print("1. Check password strength")
    print("2. Generate strong password")
    print("3. Exit")

    user_choice = input("Select an option (1-3): ")

    if user_choice == "1":
        user_password = input("Enter your password: ")
        score, suggestions = evaluate_password_strength(user_password)

        print(f"\nStrength Score: {score} / 6")

        if score <= 2:
            print("Feedback: ❌ Weak Password")
        elif score <= 4:
            print("Feedback: ⚠️ Moderate Password")
        else:
            print("Feedback: ✅ Strong Password")

        if suggestions:
            print("\nSuggestions to improve:")
            for tip in suggestions:
                print(f"- {tip}")

    elif user_choice == "2":
        new_password = generate_strong_password()
        print(f"\nGenerated Password: {new_password}")

    elif user_choice == "3":
        print("Goodbye!")
        break

    else:
        print("Invalid input. Please enter 1, 2, or 3.")
