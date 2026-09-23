# VEL Aerospace - Beginner DBMS Project

This version is intentionally simple.

It uses:
- Oracle SQL*Plus for the actual database
- React + HTML + CSS for the GUI
- React with a normal `src` folder
- No API
- No Node/Express server
- No Python
- No advanced React concepts

IMPORTANT:
A normal browser React application cannot directly connect to an Oracle SQL*Plus database. Therefore, this project keeps the database in Oracle SQL*Plus and uses sample/local GUI data for the front-end demonstration. The SQL files are the real DBMS part.

## Create a new React project

Install Node.js first.

Open Command Prompt / PowerShell:

```bash
npm create vite@latest vel-aerospace -- --template react
cd vel-aerospace
npm install
```

Choose React when Vite asks questions if you use the interactive command instead.

Then replace the generated `src` files with the files in this project:

```text
src/
├── App.jsx
├── main.jsx
└── style.css
```

You can also replace `index.html` with the included one.

Start React:

```bash
npm run dev
```

Open the local address shown by Vite, usually:

```text
http://localhost:5173
```

## Run the Oracle database

Open SQL*Plus:

```sql
sqlplus system/your_password@localhost:1521/XEPDB1
```

Then run:

```sql
@database/01_create_tables.sql
@database/02_insert_data.sql
@database/03_views.sql
@database/04_queries.sql
```

The SQL database contains:
- Aircraft
- Customers
- Suppliers
- Employees
- Purchases
- Sales
- Maintenance
- Check-in / Check-out

It also demonstrates:
- DDL
- DML
- DCL
- Primary keys
- Foreign keys
- CHECK constraints
- UNIQUE constraints
- Joins
- Subqueries
- Aggregate functions
- GROUP BY
- HAVING
- IN
- BETWEEN
- String functions
- Date functions
- Views
- Normalized tables

## Demo login

The React GUI uses a simple front-end demo login:

Username:
```text
admin
```

Password:
```text
vel123
```

This is NOT Oracle authentication. It is only for demonstrating the GUI login/logout screen.

## Check-in / Check-out

The GUI contains a simple visitor system.

Check In:
1. Select customer.
2. Enter purpose.
3. Click Check In.

Check Out:
1. Find an active visit.
2. Click Check Out.

The Oracle database has the `CHECK_LOG` table and the SQL examples show how the real records would be stored.

## Why there is no API

Because you requested no APIs, there is no Express, Node backend, REST endpoint, or fetch request.

For a real application, React would need a secure backend/service between the browser and Oracle. A browser should not contain Oracle database credentials.

For a college DBMS project, this separation is useful:
- SQL*Plus = actual database and SQL demonstration
- React = GUI demonstration

## Reset

To remove the database tables and start again:

```sql
@database/05_reset.sql
```
