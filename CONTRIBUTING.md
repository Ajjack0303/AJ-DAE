Contributing to InkConnect

Thank you for your interest in contributing to InkConnect! We welcome contributions from everyone and are grateful for every improvement, no matter how small.

Table of Contents

Code of Conduct

Getting Started

How to Contribute

Development Setup

Coding Standards

Commit Guidelines

Pull Request Process

Issue Reporting

Documentation

Testing

Community

Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

Our Standards

Be respectful: Treat everyone with kindness

Be inclusive: Welcome new contributors

Be collaborative: Share knowledge and help others

Be constructive: Give feedback that helps improve the project

Getting Started
Prerequisites

Git
 installed

Basic understanding of version control

Familiarity with Markdown for docs

A text editor or IDE (VS Code recommended)

First Time Setup

Fork the repository

# On GitHub, click "Fork"


Clone your fork

git clone https://github.com/YOUR_USERNAME/InkConnect.git
cd InkConnect


Add upstream remote

git remote add upstream https://github.com/ORIGINAL_OWNER/InkConnect.git


Create a new branch

git checkout -b feature/your-feature-name

How to Contribute
Types of Contributions

🐛 Bug fixes

✨ New features

📚 Documentation improvements

🎨 UI/UX enhancements (for frontends)

🧪 Tests

🔧 Configuration & tooling improvements

💡 Ideas & suggestions

Contribution Workflow

Check open issues first

Discuss your idea in an issue or draft PR

Create a feature branch

Implement your changes

Test thoroughly

Open a PR with clear description

Development Setup

Keep your fork updated

git fetch upstream
git checkout main
git merge upstream/main


Create a feature branch

git checkout -b feature/your-feature-name


Run backend locally (example for Node/Express API)

npm install
npm run dev


Run tests

npm test

Coding Standards

Follow existing file structure

Use meaningful variable and function names

Add comments for complex logic

Update documentation if your change affects users

Markdown Guidelines

Use proper heading levels

Include code blocks with language tags

Keep lines under 100 characters where possible

Commit Guidelines
Format
type(scope): description

Types

feat: New feature

fix: Bug fix

docs: Documentation changes

style: Code style only

refactor: Code restructuring

test: Tests added or updated

chore: Maintenance tasks

Examples
feat(api): add endpoint for artist portfolios
fix(auth): resolve JWT expiration handling
docs(contributing): add PR process section

Pull Request Process
Before Submitting

 Branch is up to date with main

 All tests pass

 Documentation updated if needed

 Commits follow guidelines

PR Template
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Other (please describe)

## Testing
- [ ] Tested locally
- [ ] Tests added or updated
- [ ] All existing tests pass

Issue Reporting
Bug Reports

Include:

Title

Steps to reproduce

Expected vs actual behavior

Environment details

Screenshots if possible

Feature Requests

Include:

Problem statement

Proposed solution

Alternatives considered

Additional context

Documentation

Keep README.md updated

Use ADRs for architectural decisions

Add API docs for new endpoints

Write clear examples where useful

Testing

Write tests for new features

Cover edge cases

Ensure existing tests pass

Include both unit & integration tests if relevant

Community

Use Issues for bugs/questions

Use Discussions for open-ended topics

Contributors will be credited in release notes

Release Process

We follow Semantic Versioning
:

MAJOR: Breaking changes

MINOR: Backward-compatible features

PATCH: Backward-compatible fixes

Thank you for contributing to InkConnect! 🎉
Your effort helps make this project better for artists and collaborators everywhere.