---
description: "Define a detailed API contract (endpoints, DTOs, errors) to coordinate backend and frontend work"
---

# Define API Contract Between Backend and Frontend

Feature: $ARGUMENTS

## Task: Create detailed API contract specification for backend/frontend coordination

1. **Define RESTful endpoints**:

   ```yaml
   Base URL: /api/v1/{feature}

   Endpoints:
   - GET /api/v1/{features}
     Query params: page, size, sort, filter
     Response: Page<{Feature}Response>

   - GET /api/v1/{features}/{id}
     Path param: id (Long)
     Response: {Feature}Response

   - POST /api/v1/{features}
     Body: {Feature}Request
     Response: {Feature}Response (201 Created)

   - PUT /api/v1/{features}/{id}
     Path param: id (Long)
     Body: {Feature}Request
     Response: {Feature}Response

   - DELETE /api/v1/{features}/{id}
     Path param: id (Long)
     Response: 204 No Content
   ```

2. **Define request/response DTOs**:

   ```typescript
   // Request DTO (for POST/PUT)
   interface {Feature}Request {
     name: string;        // min: 2, max: 100
     description?: string; // max: 1000
     // Add domain-specific fields
   }

   // Response DTO (for GET)
   interface {Feature}Response {
     id: number;
     name: string;
     description?: string;
     createdAt: string;   // ISO 8601
     updatedAt: string;   // ISO 8601
     // Add computed fields
   }

   // Page response wrapper
   interface Page<T> {
     content: T[];
     totalElements: number;
     totalPages: number;
     size: number;
     number: number;
   }
   ```

3. **Define error responses**:

   ```json
   {
     "timestamp": "2024-01-20T10:30:00Z",
     "status": 400,
     "error": "Bad Request",
     "message": "Validation failed",
     "path": "/api/v1/{features}",
     "errors": [
       {
         "field": "name",
         "message": "Name is required"
       }
     ]
   }
   ```

4. **Define validation rules**:
   - Backend: Bean Validation annotations
   - Frontend: Matching Zod schemas

   ```
   name: required, 2-100 chars
   description: optional, max 1000 chars
   email: valid email format
   date: ISO 8601 format
   ```

5. **Define status codes**:
   - 200: OK (GET, PUT)
   - 201: Created (POST)
   - 204: No Content (DELETE)
   - 400: Bad Request (validation)
   - 404: Not Found
   - 409: Conflict (duplicate)
   - 500: Internal Server Error

6. **Integration requirements**:
   - CORS: Allow frontend origin
   - Content-Type: application/json
   - Authentication: Bearer token (if needed)
   - Pagination: Spring Pageable format
   - Sorting: field,direction (e.g., "name,asc")

7. **Backend implementation notes**:

   ```java
   // Entity fields match response DTO
   // Use MapStruct for DTO mapping
   // Repository method naming conventions
   // Service layer validation
   ```

8. **Frontend implementation notes**:
   ```typescript
   // Zod schemas match validation rules
   // API client with base configuration
   // TanStack Query hooks
   // Error handling utilities
   ```

Save this contract as: `PRPs/contracts/{feature}-api-contract.md`

Share this file between backend and frontend teams for alignment.

---

## 🌱 SeedFW Enhancements

### 1. Tech Stack Awareness
- **Load**: Read `TECH_STACK.md` from project root
- **Confirm**: Present stack to user and ask: "Is this tech stack correct for this feature?"
- **Options**: ✅ Confirm / 🔄 Modify / ➕ Add technology
- **Document**: Note any changes in PRP

### 2. Documentation Fetching
- **Context7 First** (Preferred - always up-to-date):
  - Use `resolve-library-id_Context_7` to get library ID
  - Use `get-library-docs_Context_7` to fetch docs
  - Focus on relevant topics for this feature
- **Fallback**: Official documentation if Context7 unavailable
- **Confirm**: Show sources found, get user approval

### 3. Architecture Guidelines
- **Follow**: Vertical Slice Architecture (see `docs/VERTICAL_SLICE_ARCHITECTURE.md`)
- **Organize**: By feature, not by layer
- **Example**: `features/user-auth/` not `controllers/`, `services/`

### 4. Quality Standards
- **Follow**: All rules in `docs/GOLDEN_RULES.md`
- **File Size**: 500 lines maximum per file
- **Package Manager**: Never edit package.json manually
- **TypeScript**: Strict mode, no `any` types

### 5. Spec Integration
- **Save to**: `spec/proposals/` for proposals
- **Two-Folder Model**: 
  - `spec/current/` = Current truth (what IS built)
  - `spec/proposals/` = Proposals (what SHOULD change)

