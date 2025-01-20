# Expense Report Generator Kata

This kata focuses on improving and extending a legacy codebase while maintaining functionality and ensuring test coverage. The original repository for the legacy code kata is available [here](https://github.com/christianhujer/expensereport-level-2).
This project is focused on handling different types of expense and generating detailed expense reports in multiple formats, including plain text, HTML, and JSON, while ensuring modularity, maintainability, and extensibility of the codebase.

## Objective

To enhance the existing expense reporting functionality by:

1. Legacy code refactoring to improve maintainability and testability by addressing design smells and adhering to software design principles.
2. **Adding a new expense type:** Support for the `Lunch` expense type, with an over-limit threshold of 2000.
3. **Supporting JSON output:** Enable report generation in JSON format for programmatic use.

For more details on the requirements, refer to the [Expense Report Level 2](https://github.com/christianhujer/expensereport-level-2?tab=readme-ov-file#expensereport-level-2) repository.

## Development Goals

- **Refactoring:** Address design smells such as large functions, duplicated code, and lack of separation of concerns.
- **Testing:** Improve the testability of the code by decoupling logic and output.
- **Scalability:** Ensure the design adheres to the Open/Closed Principle to facilitate future enhancements.

## Steps to Solve the Kata

### 1. Understand What the Code Does

Analyze the existing code to understand its functionality, structure, and limitations.

- Detailed steps are documented [here](documentation/Step-1/Understand_what_code_does.md).

### 2. Design Smells Analysis

Identify design smells, including code duplications, inappropriate naming, and violations of design principles.

- Detailed steps are documented [here](documentation/Step-2/Design_smells_analysis.md).

### 3. New Requirements Analysis Without Refactor

Analyze and document new requirements without making any code changes to ensure alignment with business needs.

- Detailed steps are documented [here](documentation/Step-3/New_requirement_analysis_without_refactor.md).

### 4. Approval Tests

Set up approval tests to capture the current behavior of the legacy code. These tests ensure that refactoring does not change existing functionality.

- Detailed steps are documented [here](documentation/Step-4/Approval_tests_steps.md).

### 5. Incremental Refactor

Refactor the legacy code incrementally while running approval tests to ensure functionality remains intact.

- Detailed steps are documented [here](documentation/Step-5/Incremental_refactor_steps.md).

### 6. Refactor Tests

Refactor existing tests to improve readability, coverage, and maintainability.

- Detailed steps are documented [here](documentation/Step-6/Refactor_test.md).

### 7. TDD New Feature: Lunch

Add a new feature to support the "Lunch" expense type using Test-Driven Development (TDD).

- Detailed steps are documented [here](documentation/Step-7/TDD_new_feature_Lunch.md).

### 8. TDD New Feature: JSONReportFormatter

Implement a new report formatter for JSON using TDD.

- Detailed steps are documented [here](documentation/Step-8/TDD_new_feature_JSONFormatter.md).

### 9. Add All Tests

Write and organize all tests, including:

- Unit Tests
- Integration Tests
- End-to-End Tests

Ensure comprehensive coverage for existing and new features.

- Detailed steps are documented [here](documentation/Step-9/All_tests.md).

## How to Run Tests

1. Clone the repository:
   ```bash
   git clone https://github.com/Zafeer/tdd-refactor-legacy
   cd tdd-refactor-legacy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test:watch
   ```

## Directory Structure

```
├── assignment
    ├── app
        ├── expense-report.ts
│   ├── tests
        ├── __snapshots__
        ├── expense-report.approval.test.ts
        ├── expense-report.test.ts
├── documentation
    ├── Step-1
        ├── Understand_what_code_does.md
    ├── Step-2
        ├── Design_smells_analysis.md
    ├── Step-3
        ├── New_requirement_analysis_without_refactor.md
    ├── Step-4
        ├── Approval_tests_steps.md
    ├── Step-5
        ├── Incremental_refactor_steps.md
    ├── Step-6
        ├── Refactor_test.md
    ├── Step-7
        ├── TDD_new_feature_Lunch.md
    ├── Step-8
        ├── TDD_new_feature_JSONFormatter.md
    ├── Step-9
        ├── All_tests.md
└── README.md
```

## Notes

This kata emphasizes maintaining code quality and ensuring functionality while refactoring and adding new features
