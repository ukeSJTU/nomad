TODO: Please note that this document may be out-dated

# Passenger Management Feature

This document describes the implementation of the passenger management feature based on the provided screenshots.

## Overview

The passenger management feature allows users to:

- View a list of all passengers with search and filtering
- Add new passengers with comprehensive information
- Edit existing passenger information
- Delete passengers (soft delete)
- Batch delete multiple passengers

## Architecture

### Database Schema

The passenger data is stored in the `passengers` table with the following fields:

- **id**: UUID primary key
- **chineseName**: Chinese name (optional)
- **englishFirstName**: English first name (optional)
- **englishLastName**: English last name (optional)
- **nationality**: Nationality/country
- **gender**: Gender (male/female/other)
- **dateOfBirth**: Date of birth
- **placeOfBirth**: Place of birth
- **phone**: Phone number
- **fax**: Fax number
- **email**: Email address
- **documentType**: Document type (id_card/passport/other)
- **documentNumber**: Document number (required)
- **documentExpiryDate**: Document expiry date (required)
- **isDeleted**: Soft delete flag
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

**Constraints:**

- At least one of Chinese name or both English first and last names must be provided
- Document type, number, and expiry date are required

### API Endpoints

#### 1. List Passengers

- **Endpoint**: `GET /api/passengers`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `pageSize`: Items per page (default: 20, max: 100)
  - `search`: Search by name or document number
  - `nationality`: Filter by nationality
  - `gender`: Filter by gender
- **Response**: Paginated list of passengers
- **Authentication**: Required

#### 2. Get Single Passenger

- **Endpoint**: `GET /api/passengers/[id]`
- **Response**: Single passenger details
- **Authentication**: Required

#### 3. Create Passenger

- **Endpoint**: `POST /api/passengers`
- **Body**: Passenger data (see schema)
- **Response**: Created passenger
- **Authentication**: Required

#### 4. Update Passenger

- **Endpoint**: `PUT /api/passengers/[id]`
- **Body**: Partial passenger data
- **Response**: Updated passenger
- **Authentication**: Required

#### 5. Delete Passenger

- **Endpoint**: `DELETE /api/passengers/[id]`
- **Response**: Success message
- **Authentication**: Required
- **Note**: Soft delete (sets isDeleted flag)

#### 6. Batch Delete Passengers

- **Endpoint**: `POST /api/passengers/batch-delete`
- **Body**: `{ ids: string[] }`
- **Response**: Success message
- **Authentication**: Required

### Components

#### 1. PassengerForm (`src/components/passengers/forms/passenger-form.tsx`)

A comprehensive form component for creating and editing passenger information.

**Features:**

- Chinese name and English name fields (at least one required)
- "Set as myself" checkbox
- Nationality selection
- Gender selection (radio buttons)
- Date of birth picker
- Place of birth
- Phone number with country code selector
- Fax number (area code, phone, extension)
- Email address
- Document information (type, number, expiry date)
- Frequent flyer card section (placeholder)
- Form validation with Zod schema
- Save and Cancel buttons

**Props:**

- `onSubmit`: Callback when form is submitted
- `onCancel`: Callback when form is cancelled
- `isLoading`: Loading state
- `initialData`: Initial form data for editing

#### 2. PassengerList (`src/components/passengers/passenger-list.tsx`)

A table component for displaying the list of passengers.

**Features:**

- Search by name or document number
- Checkbox selection (individual and select all)
- Batch delete functionality
- Masked phone numbers (shows only last 4 digits)
- Masked document numbers (shows only last 3 digits)
- Action buttons (View, Edit, Delete)
- Responsive table layout

**Props:**

- `passengers`: Array of passenger data
- `onEdit`: Callback when edit button is clicked
- `onDelete`: Callback when delete button is clicked
- `onBatchDelete`: Callback when batch delete is triggered
- `isLoading`: Loading state

#### 3. PassengersPage (`src/app/passengers/page.tsx`)

The main page component that integrates the list and form components.

**Features:**

- Fetches passengers on mount
- Opens form dialog for create/edit
- Handles all CRUD operations
- Shows success/error toasts
- Converts between form data and API format

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── passengers/
│   │       ├── route.ts                 # List and Create endpoints
│   │       ├── [id]/
│   │       │   └── route.ts            # Get, Update, Delete endpoints
│   │       └── batch-delete/
│   │           └── route.ts            # Batch delete endpoint
│   └── passengers/
│       └── page.tsx                     # Main passenger management page
├── components/
│   └── passengers/
│       ├── forms/
│       │   └── passenger-form.tsx      # Passenger form component
│       ├── passenger-list.tsx          # Passenger list component
│       └── index.ts                    # Component exports
└── types/
    └── api/
        └── passengers.ts               # API types and schemas
```

## Usage

### Accessing the Page

Navigate to `/passengers` to access the passenger management page.

### Creating a Passenger

1. Click the "新增" (New) button
2. Fill in the passenger information form
3. At least one of Chinese name or English name (first + last) is required
4. Document type, number, and expiry date are required
5. Click "保存" (Save) to create the passenger

### Editing a Passenger

1. Click the "编辑" (Edit) button on a passenger row
2. Modify the passenger information
3. Click "保存" (Save) to update

### Deleting Passengers

**Single Delete:**

1. Click the "删除" (Delete) button on a passenger row
2. Confirm the deletion

**Batch Delete:**

1. Select multiple passengers using checkboxes
2. Click the "✕ 删除" button
3. Confirm the deletion

### Searching

1. Enter search term in the search box (searches Chinese name, English names, and document number)
2. Click "查询" (Search) button

## Database Migration

To apply the passenger schema to your database, run:

```bash
pnpm db:push
```

Or generate and run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

## API Documentation

The API endpoints are automatically documented using OpenAPI. After running:

```bash
pnpm api:generate
```

You can view the interactive API documentation at:

- Development: http://localhost:3000/docs/api
- OpenAPI spec: http://localhost:3000/openapi.json

## Security

- All API endpoints require authentication
- Passengers are soft-deleted (isDeleted flag) to maintain data integrity
- Phone numbers and document numbers are masked in the UI for privacy
- Input validation is performed on both client and server side

## Future Enhancements

- Frequent flyer card management
- Export passenger list to CSV/Excel
- Import passengers from file
- Advanced filtering options
- Passenger grouping/tagging
- Integration with booking system
