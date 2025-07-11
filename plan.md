# Group Finance Tracker - Planning Document

## Project Overview

### Purpose
A web application where groups of people can track shared expenses, see who owes what, and settle debts efficiently without requiring user authentication or complex invitation systems.

### Core Concept
- One person creates a group and adds all members (name)
- Add expenses and specify who paid and who should split
- Real-time balance calculations show who owes money to whom
- Simplified settlement suggestions minimize transaction complexity

---

## User Flows

### 1. Initial Group Setup
1. User visits the application
2. Clicks "Create New Group"
3. Enters group name and optional description
4. Adds group members:
   - Name (required)
   - Can add multiple members at once
   - Can add more members later
5. Group is created and ready to use immediately

### 2. Adding an Expense
1. User clicks "Add Expense"
2. Fills in expense details:
   - Description (e.g., "Dinner at Italian Restaurant")
   - Amount (e.g., $120.50)
   - Date (defaults to today, optional)
   - Category (Food, Transport, Utilities, Entertainment, etc., optional)
3. Selects who paid for the expense (can be one or multiple members)
4. Selects who should split the expense:
   - Default: everyone in the group
   - Custom: select specific people
5. Chooses split method:
   - Equal split (default)
   - Custom amounts
   - Percentages
6. Saves expense
7. All balances update automatically
8. Can share the image of the expense

### 3. Viewing Balances
1. User opens the group dashboard
2. Sees overview of:
   - Total group spending
   - Individual member balances
   - Who owes money to whom
   - Recent expense activity
3. Can drill down into:
   - Detailed expense history
   - Individual member spending
   - Category breakdowns
4. Export the expense into image and share it.

### 4. Settling Payments
1. User views "Settle Up" section
2. Sees optimized payment suggestions:
   - Minimum number of transactions needed
   - Clear "A pays B $X" instructions
3. Marks payments as completed when made
4. Balances update automatically
5. Payment history is recorded

### 5. Ongoing Management
1. Edit or delete expenses (with appropriate permissions)
2. Add new members as needed
3. Remove inactive members
4. Export data for record-keeping
5. View spending reports and summaries

---

## Core Features

### Group Management
- **Create Group**: Simple form with name and description
- **Add Members**: Name input, batch addition capability
- **Member Management**: Edit names, remove members
- **Group Settings**: Currency, default split behavior, categories

### Expense Tracking
- **Quick Entry**: Streamlined form for expenses
- **Expense Categories**: Food, Transport, Utilities, Entertainment, Shopping, Other (optional)
- **Receipt Storage**: Optional photo/file upload for receipts (not finalized)
- **Expense History**: Searchable, filterable list of all group expenses

### Balance Calculations
- **Real-time Updates**: Instant recalculation when expenses are added/modified
- **Net Balances**: Show simplified who-owes-whom after offsetting mutual debts
- **Individual Summaries**: Each person's total paid vs. total owed
- **Running Totals**: Track balances over time

### Settlement System
- **Optimal Settlements**: Calculate minimum transactions needed to settle all debts
- **Payment Tracking**: Mark settlements as completed (can undo)
- **Partial Payments**: Handle installment payments
- **Settlement History**: Record of all payments made

### Reporting & Analytics (not finalized)
- **Group Summary**: Total spending, average per person, spending trends
- **Category Breakdown**: See where money is being spent
- **Time-based Reports**: Monthly, weekly, or custom date ranges
- **Individual Reports**: Each member's spending and payment history
- **Export Options**: CSV, PDF, or email summaries

---

## Business Rules & Logic

### Expense Splitting Rules
- **Equal Split**: Divide total amount evenly among selected members
- **Custom Amounts**: Allow specific amounts per person (must sum to total)
- **Percentage Split**: Assign percentages to each person (must sum to 100%)
- **Exclusions**: Allow excluding specific members from certain expenses

### Balance Calculations
- **Individual Balance**: (Total paid by person) - (Total owed by person)
- **Net Settlements**: Offset mutual debts between pairs of people
- **Running Balances**: Track how balances change over time
- **Settlement Optimization**: Calculate minimum number of payments needed

### Settlement Logic
- **Debt Simplification**: If A owes B $10 and B owes A $6, show A owes B $4
- **Circular Debt Resolution**: Handle A owes B, B owes C, C owes A scenarios
- **Minimum Transactions**: Find the smallest number of payments to settle all debts
- **Payment Verification**: Require confirmation from both parties for large settlements

---

## Site Info

### Landing/Home Page (/)
- **Header**: Catch header for the project
- **Small Description**: Short description about the project
- **Create Group**: Button which will redirect to /new
- **GitHub**: Link to the repo
- **All groups display**: Chips to display all groups (/:group_id)

### Create Group Page (/new)
- **Group Name**: Input field for group name
- **Group Description**: Optional input field for group description
- **Add Members**: Input field for member names (can add multiple)
- **Create Button**: Button to create the group
- **Redirect**: After creation, redirect to the group page (/:group_id)

### Group Page (/:group_id)
- **Group Header**: Display group name and description
- **Add Expense Button**: Button to add a new expense
- **Expenses List**: Display list of all expenses with details
- **Balances Overview**: Show total spending, individual balances, and who owes whom
- **Settle Up Section**: Display payment suggestions and settlement history
- **Member Management**: Options to add/remove members
- **Export Options**: Button to export data (image, CSV, etc.)
