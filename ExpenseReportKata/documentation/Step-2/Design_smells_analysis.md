# Design Smells in the Code

The code exhibits several design smells. Here’s a detailed breakdown of the design smells present:

## 1. Large Function (Long Method)

### Issue:

The `printReport` function is too large and handles multiple responsibilities:

- Generating headers (HTML and plain text)
- Processing expenses
- Formatting output
- Printing the summary

### Why It’s a Smell:

Large functions are harder to read, test, and debug. Violates the **Single Responsibility Principle (SRP)**.

---

## 2. Duplicated Fragments

### Issue:

The code checks `htmlMode` multiple times and has duplicate logic for printing headers, rows, and summaries in HTML and plain text.

### Why It’s a Smell:

Duplicated code increases the risk of bugs and maintenance overhead when updates are needed.

---

## 3. Hardcoded Limits (Magic Numbers)

### Issue:

Limits for dinner (5000) and breakfast (1000) are hardcoded.

### Why It’s a Smell:

Hardcoding values makes the code less flexible and harder to adapt to changes in business rules.

---

## 4. Lack of Separation of Concerns

### Issue:

The `printReport` function mixes business logic (e.g., calculating totals) with presentation logic (e.g., HTML and plain text formatting).

### Why It’s a Smell:

This violates the **Separation of Concerns** principle and makes the function less reusable and harder to test.

---

## 5. Primitive Data

### Issue:

The `ExpenseType` is a union of string literals, and the limits are checked using conditionals based on `ExpenseType`.

### Why It’s a Smell:

Using primitive strings instead of domain-specific abstractions can lead to fragile code. It also violates the **Open/Closed Principle (OCP)**.

---

## 6. Direct Coupling to `process.stdout`

### Issue:

The function directly writes output to `process.stdout`.

### Why It’s a Smell:

Direct coupling to a specific output stream reduces flexibility and makes testing harder.

---

## 7. Lack of Extensibility

### Issue:

Adding a new expense type or a new output format requires modifying multiple parts of the function, including:

- The switch statement for expense names
- The over-limit logic
- The output generation logic

### Why It’s a Smell:

This violates the **Open/Closed Principle (OCP)** as the function isn’t open for extension without modification.

---

## 8. Lack of Tests or Testability

### Issue:

The function is tightly coupled with `process.stdout`, making it hard to test the output. Also, the mixing of logic and formatting makes unit testing more complex.

### Why It’s a Smell:

Poor testability can lead to brittle code and undetected regressions.

---

## 9. Inconsistent Naming

### Issue:

The variable `mealOverExpensesMarker` is verbose and inconsistent with other concise names like `totalExpenses`.

### Why It’s a Smell:

Inconsistent naming can confuse readers and reduce the code’s readability.

## 10. Renaming Variables

### Issue:

The variable `printReport` does not signify what report the function is printing.

### Why It’s a Smell:

Incorrect naming can confuse readers and reduce the code’s readability.

---

## 11. Lack of Type Safety for Limits

### Issue:

The limit values are only associated with specific types through conditionals, not through a strongly-typed system.

### Why It’s a Smell:

This is error-prone and could lead to incorrect associations.
