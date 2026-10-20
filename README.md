# Necthar Project Documentation

## 1. Overview

**Necthar** is an **Expense Control** (*Expense Control*) application. The project is structured on a full-stack architecture composed of a robust backend in **Java with Spring Boot** and a modern reactive frontend in **Angular**. The system stores your data in a **H2 Database** and provides features for registering, viewing, filtering and generating expense summaries.

---

## 2. Project Structure

```text
Necthar-main/
├── README.md
├── .gitignore
├── backend/
│ ├── pom.xml
│ ├── date/
│ │ └── expense.mv.db
│ └── src/
│ └── main/
│ ├── java/com/necthar/expensecontrol/
│ │ ├── ExpenseControlApplication.java
│ │ ├── config/
│ │ │ └── CorsConfig.java
│ │ ├── controller/
│ │ │ ├── ErrorHandler.java
│ │ │ └── ExpenseController.java
│ │ ├── model/
│ │ │ ├── Category.java
│ │ │ └── Expense.java
│ │ ├── repository/
│ │ │ └── ExpenseRepository.java
│ │ └── service/
│ │ ├── ExpenseResume.java
│ │ └── ExpenseService.java
│ └── resources/
│ └── application.properties
└── frontend/
    ├── angular.json
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    └── src/
        ├── index.html
        ├── main.ts
        ├── styles.css
        └── app/
            ├── app.component.ts
            ├── app.component.html
            ├── app.component.css
            ├── app.config.ts
            ├── components/
            │ ├── form/
            │ │ ├── expense-form.component.ts
            │ │ ├── expense-form.component.html
            │ │ └── expense-form.component.css
            │ └── list/
            │ ├── expense-list.component.ts
            │ ├── expense-list.component.html
            │ └── expense-list.component.css
            ├── models/
            │ └── expense.model.ts
            └── services/
                └── expense.service.ts
```

---

## 3. Backend Components (Spring Boot)

* **`ExpenseControlApplication.java`**: Main class responsible for initializing the Spring Boot ecosystem.
* **`config/CorsConfig.java`**: CORS configuration to allow HTTP requests from the Angular client.
* **`controller/ExpenseController.java`**: Exposure of REST APIs to manage expenses and summaries.
* **`controller/ErrorHandler.java`**: Centralized API HTTP exception handling.
* **`model/`**:
  * **`Expense.java`**: Main entity that represents an expense (amount, date, description, category, etc.).
  * **`Category.java`**: Enum/Model for categorizing expenses (e.g.: food, transportation, housing).
* **`repository/ExpenseRepository.java`**: Spring Data JPA interface for communicating with the H2 database.
* **`service/`**:
  * **`ExpenseService.java`**: Expense CRUD business rules.
  * **`ExpenseResume.java`**: Logic for calculating totals, averages and grouped metrics.

---

## 4. Frontend Components (Angular)

* **`models/expense.model.ts`**: TypeScript interfaces and types that mirror the expense structure of the backend API.
* **`services/expense.service.ts`**: Service responsible for making HTTP calls via `HttpClient` to the backend API endpoints.
* **`components/form/`**: Form component (`ExpenseFormComponent`) for registering and editing expenses.
* **`components/list/`**: Listing component (`ExpenseListComponent`) for displaying and filtering the expense table.

---

## 5. How to Execute the Project

### Prerequisites

* **Java JDK 17+**
* **Apache Maven**
* **Node.js 18+** and **npm**
* **Angular CLI** (`npm install -g @angular/cli`)

---

### Running the Backend (Spring Boot)

1. Enter the backend folder:

   ```bash
   cd Necthar-main/backend
   ```

2. Compile and run the application via Maven:

   ```bash
   mvn spring-boot:run
   ```

   * The backend will be available by default at `http://localhost:8080`.

---

### Running the Frontend (Angular)

1. In a new terminal, navigate to the frontend folder:

   ```bash
   cd Necthar-main/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Angular server:

   ```bash
   ng serves
   ```

   * The application will be accessible at `http://localhost:4200`.
