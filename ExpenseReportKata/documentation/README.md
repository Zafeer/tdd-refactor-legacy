# Expense Report Generator Kata

This project is focused on generating detailed expense reports in multiple formats, including plain text, HTML, and JSON. The implementation involves handling different types of expenses while ensuring modularity, maintainability, and extensibility of the codebase.

## Objective

To enhance the existing expense reporting functionality by:

1. Legacy code refactoring to improve maintainability and testability by addressing design smells and adhering to software design principles.
2. **Adding a new expense type:** Support for the `lunch` expense type, with an over-limit threshold of 2000.
3. **Supporting JSON output:** Enable report generation in JSON format for programmatic use.

For more details on the requirements, refer to the [Expense Report Level 2](https://github.com/christianhujer/expensereport-level-2?tab=readme-ov-file#expensereport-level-2) repository.

## Development Goals

- **Refactoring:** Address design smells such as large functions, duplicated code, and lack of separation of concerns.
- **Testing:** Improve the testability of the code by decoupling logic and output.
- **Scalability:** Ensure the design adheres to the Open/Closed Principle to facilitate future enhancements.

## How to Use

1. Clone the repository.
2. Navigate to the project directory and install dependencies.
3. Run the application to generate reports with sample expenses:
   ```bash
   npm run test:watch
   ```
