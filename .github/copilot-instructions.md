# GitHub Copilot Instructions

## Priority Guidelines

When generating code for this repository:

1. **Version Compatibility**: Always detect and respect the exact versions of languages, frameworks, and libraries used in this project
2. **Codebase Patterns**: Scan the codebase for established patterns before generating any code
3. **Architectural Consistency**: Maintain the monorepo structure with separate API and Web packages
4. **Code Quality**: Prioritize maintainability, testability, and consistency with existing patterns
5. **No Assumptions**: Only follow patterns that exist in the codebase - do not introduce external best practices not evident in the code

## Technology Version Detection

Before generating code, the following versions MUST be respected:

### Language Versions

- **TypeScript**: `~5.8.3` (exact version used across both packages)
  - Target: `ES2022` (API and Web)
  - Module system: `NodeNext` (API), `ESNext` (Web)
  - Strict mode enabled with `noUncheckedIndexedAccess`
  - Never use TypeScript features beyond version 5.8

### Framework Versions

#### API Package (`/api`)
- **Node.js**: `>=20` (minimum required)
- **Express**: `^5.1.0`
- **Drizzle ORM**: `^0.44.5`
- **PostgreSQL**: Driver version `^8.16.3`
- **Zod**: `^4.1.9` (validation library)

#### Web Package (`/web`)
- **React**: `^19.1.1`
- **React Router**: `^7.9.3`
- **TanStack Query**: `5.89.0` (exact version)
- **Zustand**: `^5.0.8`
- **Vite**: `^7.1.3`
- **Tailwind CSS**: `^4.1.12`

### Testing Frameworks
- **Vitest**: `^3.2.4` (unit and integration tests)
- **Playwright**: `^1.56.1` (E2E tests)
- **Testing Library**: `^16.3.0` (React component testing)
- **Happy DOM**: `^18.0.1` (test environment for web)

### Package Manager
- **pnpm**: `10.18.3` (exact version - use `packageManager` field)
- Workspace configuration in `pnpm-workspace.yaml`

### Code Quality Tools
- **Biome**: `^2.2.4` (linting and formatting)
  - Indent style: tabs
  - Quote style: single quotes
  - Semicolons: `asNeeded`
  - Trailing commas: `es5`

## Project Architecture

This is a **monorepo** with two main packages:

### `/api` - Backend API
- **Architecture**: Layered architecture with clear separation of concerns
- **Layers** (top to bottom):
  1. **Routers** (`src/routers/`) - Route definitions and endpoint configuration
  2. **Middlewares** (`src/middlewares/`) - Validation, error handling
  3. **Controllers** (`src/controllers/`) - Request/response handling
  4. **Models** (`src/models/`) - Business logic and data operations
  5. **Repositories** (`src/repositories/`) - Complex data access patterns
  6. **Schemas** (`src/schemas/`) - Zod validation schemas
  7. **Database** (`src/db/`) - Drizzle ORM configuration and schema

### `/web` - Frontend Application
- **Architecture**: Component-based with React
- **Structure**:
  - **Pages** (`src/pages/`) - Route-level components
  - **Components** (`src/components/`) - Reusable UI components
  - **Stores** (`src/stores/`) - Zustand state management (slice pattern)
  - **Services** (`src/services/`) - API communication layer
  - **Queries** (`src/querys/`) - TanStack Query hooks
  - **Use Cases** (`src/useCases/`) - Business logic functions

## Naming Conventions

### Files and Folders
- **Components**: PascalCase (e.g., `CharacterButton.tsx`, `ScoreTimer.tsx`)
- **Utilities**: camelCase (e.g., `timeUtils.ts`, `fakeData.ts`)
- **Test files**: Same name as source file with `.test.ts` or `.test.tsx` suffix
- **Index files**: Use `index.ts` or `index.tsx` for barrel exports

### Code Elements
- **Variables/Functions**: camelCase (e.g., `getAllCharacters`, `useLevelStore`)
- **Types/Interfaces**: PascalCase (e.g., `Character`, `LevelStore`)
- **Constants**: camelCase (e.g., `queryClient`, not SCREAMING_SNAKE_CASE)
- **Models/Controllers**: PascalCase with suffix (e.g., `CharacterModel`, `CharacterController`)

### Exports
- **Named exports**: Preferred pattern across the codebase
- **Object exports**: Models and controllers use object pattern:
  ```typescript
  export const CharacterModel = {
    getAll,
    getById,
    getAllFromScenario,
  }
  ```
- **Default exports**: Used for React components and main app files

## Code Patterns

### API Patterns

#### Controllers
```typescript
// Request handler pattern - async functions with typed Request/Response
async function get(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params
  const item = await Model.getById(id)
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' })
  }
  
  res.json(item)
}
```

#### Models
```typescript
// Model pattern - exported object with async functions
export const ModelName = {
  getAll,
  getById,
}

async function getById(id: string): Promise<Type | null> {
  const result = await db.select().from(table).where(eq(table.id, id))
  return result[0] ?? null
}
```

#### Routers
```typescript
// Router pattern - use validate middleware with schemas
export const resourceRouter = Router()

resourceRouter.get(
  '/:id',
  validate(getResourceSchema),
  ResourceController.get
)
```

#### Validation Schemas
```typescript
// Zod schema pattern - export individual schemas
export const getResourceSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
})

export const queryResourceSchema = z.object({
  query: z.object({
    scenarioId: z.uuid().optional(),
  }),
})
```

#### Path Aliases (API)
```typescript
// Use ~ prefix for path aliases
import { CharacterModel } from '~models/CharacterModel'
import { validate } from '~/middlewares/validate'
import db from '~/db'
```

### Web Patterns

#### React Components
```typescript
// Functional components with TypeScript
export default function ComponentName() {
  // Hooks at the top
  const data = useLevelStore((state) => state.data)
  const { data: queryData, isLoading } = useQuery(...)
  
  // Early returns for loading/error states
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  // Main render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

#### Zustand Stores (Slice Pattern)
```typescript
// Store with multiple slices
export const useStoreName = create<StoreInterface>()((...args) => {
  const [set, get, store] = args
  
  return {
    ...createSlice1(...args),
    ...createSlice2(...args),
    // Additional state and methods
  }
})
```

#### Services (Axios Pattern)
```typescript
// Service object with axios calls
const Service = {
  async get(id: string) {
    const response = await HTTPClient.get<Type>(`endpoint/${id}`)
    return response.data
  },
}

export default Service
```

#### TanStack Query Hooks
```typescript
// Query hook pattern
export function useResourceQuery(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: () => Service.get(id),
  })
}
```

#### Path Aliases (Web)
```typescript
// Use ~ prefix for path aliases
import Component from '~components/Component'
import { useStore } from '~stores/storeName'
import Service from '~services/Service'
```

## Testing Patterns

### Unit Tests (Vitest)

#### API Tests
```typescript
// Mock models before tests
vi.mock('~models/ModelName')

const ModelMock = vi.mocked(ModelName)

describe('functionality', () => {
  it('describes expected behavior', async () => {
    // Arrange
    ModelMock.method.mockResolvedValueOnce(fakeData)
    
    // Act
    const result = await functionUnderTest()
    
    // Assert
    expect(result).toBe(expectedValue)
  })
})
```

#### Integration Tests (API Routes)
```typescript
// Use supertest for API testing
import request from 'supertest'
import { app } from '~tests/app'

describe('GET /api/resource', () => {
  it('responds with data', async () => {
    const response = await request(app)
      .get('/api/resource')
      .expect(200)
    
    expect(response.body).toEqual(expectedData)
  })
})
```

#### React Component Tests
```typescript
// Use Testing Library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('describes behavior', async () => {
  const user = userEvent.setup()
  render(<Component {...props} />)
  
  const element = screen.getByRole('button')
  await user.click(element)
  
  expect(element).toHaveTextContent('expected')
})
```

#### Mock Pattern
```typescript
// Service mocks at module level
vi.mock('~services/ServiceName', () => ({
  default: {
    method: vi.fn(() => Promise.resolve(mockData)),
  },
}))

const ServiceMock = vi.mocked(Service.method)
```

### E2E Tests (Playwright)
```typescript
// Playwright test pattern
test('describes user flow', async ({ page }) => {
  await page.goto('/path')
  
  const element = page.getByRole('button', { name: 'Button' })
  await element.click()
  
  await expect(element).toBeVisible()
})
```

## Error Handling

### API Error Handling
```typescript
// Controller error pattern - return early with status code
if (!item) {
  return res.status(404).json({ error: 'Item not found' })
}

// Custom error classes in errors.ts
export const ValidationError = createCustomError('ValidationError')
export const UnexpectedError = createCustomError('UnexpectedError')
export const BusinessError = createCustomError('BusinessError')
```

### Validation Middleware
```typescript
// Use Zod safeParse pattern
const result = schema.safeParse(req)

if (!result.success) {
  const errors = z.treeifyError(result.error)
  return res.status(400).json(errors)
}
```

## Database Patterns (Drizzle ORM)

### Schema Definition
```typescript
// Table definition pattern
export const tableName = pgTable('table_name', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  foreignKey: uuid('foreign_key')
    .references(() => otherTable.id)
    .notNull(),
})

// Export inferred type
export type TypeName = InferSelectModel<typeof tableName>
```

### Query Patterns
```typescript
// Select with conditions
const result = await db
  .select()
  .from(table)
  .where(eq(table.id, id))

return result[0] ?? null

// Complex conditions with 'and'
const result = await db
  .select()
  .from(table)
  .where(
    and(
      eq(table.id, id),
      lte(table.min, value),
      gte(table.max, value)
    )
  )
```

### Repository Pattern
```typescript
// When queries are complex or reusable, use Repository pattern
export const Repository = {
  async create(data: Omit<Type, 'id'>): Promise<Type> {
    const result = await db.insert(table).values(data).returning()
    const inserted = result[0]
    
    if (!inserted) {
      throw new UnexpectedError('Failed to insert', { cause: data })
    }
    
    return inserted
  },
}
```

## Documentation Standards

### Code Comments
- **Minimal approach**: Code should be self-documenting through clear naming
- **When to comment**: Document non-obvious behavior, business logic, or workarounds
- **Avoid**: Redundant comments that repeat what code does

### Function Documentation
- No JSDoc/TSDoc headers required for most functions
- TypeScript types serve as documentation
- Complex algorithms or business logic should have explanatory comments

### README/Project Documentation
- Keep README.md comprehensive with architecture overview
- Document setup, installation, and running instructions
- Include technology stack and version badges

## TypeScript Guidelines

### Type Safety
```typescript
// Enable strict checks in tsconfig
"strict": true,
"noUncheckedIndexedAccess": true,
"noUnusedLocals": true,
"noUnusedParameters": true,

// Use nullish coalescing for defaults
return result[0] ?? null

// Type parameters explicitly
function get(req: Request<{ id: string }>, res: Response) { }
```

### Type Imports
```typescript
// Use type imports when only importing types
import type { Character } from '~/db/schema'
import type { Request, Response } from 'express'
```

### Type Definitions
```typescript
// Prefer interfaces for object shapes
interface StoreInterface {
  data: Type
  setData: (data: Type) => void
}

// Use type for unions, intersections, and utilities
type Status = 'idle' | 'loading' | 'success' | 'error'
```

## Async/Await Patterns

### Always Use Async/Await
```typescript
// Preferred - async/await
async function getData(id: string) {
  const result = await db.select().from(table)
  return result[0] ?? null
}

// NOT promises with .then()
```

### Error Handling
```typescript
// In controllers - let Express error middleware handle
async function get(req: Request, res: Response) {
  // No try/catch - errors bubble to error handler
  const data = await Model.getById(id)
  res.json(data)
}

// In utilities - handle specific errors
try {
  const result = await operation()
  return result
} catch (error) {
  if (error instanceof SpecificError) {
    // Handle specific case
  }
  throw error
}
```

## State Management (Zustand)

### Store Creation
```typescript
// Use create with TypeScript
export const useStoreName = create<StoreType>()((...args) => ({
  // State
  value: initialValue,
  
  // Actions
  setValue: (value) => set({ value }),
}))
```

### Slice Pattern
```typescript
// Break complex stores into slices
export type SliceType = {
  value: Type
  setValue: (value: Type) => void
}

export const createSlice: StateCreator<
  StoreType,
  [],
  [],
  SliceType
> = (set, get) => ({
  value: initialValue,
  setValue: (value) => set({ value }),
})
```

### Usage in Components
```typescript
// Select specific state
const value = useStore((state) => state.value)

// Call actions directly
const { setValue } = useStore()
```

## React Patterns

### Component Structure
```typescript
// Props interface
interface ComponentProps {
  data: Type
  onAction: (id: string) => void
}

// Component with early returns
export default function Component({ data, onAction }: ComponentProps) {
  // Hooks at top
  const [state, setState] = useState(initial)
  const query = useQuery(...)
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies])
  
  // Early returns for states
  if (query.isLoading) return <Loading />
  if (query.isError) return <Error />
  
  // Event handlers
  const handleClick = () => {
    onAction(data.id)
  }
  
  // Main render
  return <div onClick={handleClick}>{data.name}</div>
}
```

### Hooks Usage
- Place all hooks at component top level
- Never conditionally call hooks
- Use custom hooks for reusable logic
- Follow React Hook naming convention (`use*`)

### TanStack Query
```typescript
// Query pattern
const { data, isLoading, isError } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => Service.get(id),
})

// Mutation pattern
const mutation = useMutation({
  mutationFn: Service.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['resource'] })
  },
})
```

## Styling (Tailwind CSS)

### Class Usage
```typescript
// Inline Tailwind classes
<div className="flex items-center justify-center">

// Use clsx for conditional classes
<button className={clsx(
  'base-classes',
  isActive && 'active-classes'
)}>

// Responsive design
<div className="text-sm md:text-base lg:text-lg">
```

### Custom Animations
- Uses `@midudev/tailwind-animations` package
- Follow existing animation patterns in components

## Testing Strategy

### Unit Tests
- Test individual functions and modules in isolation
- Mock external dependencies (database, services)
- Focus on business logic and edge cases
- Place in same directory as source with `.test.ts` suffix or in `tests/` folder

### Integration Tests
- Test API endpoints with supertest
- Test React components with Testing Library
- Mock only external services, not internal modules
- Verify complete user interactions

### E2E Tests
- Use Playwright for full user journeys
- Test critical user flows
- Place in `web/tests/e2e/`
- Use Page Object Model patterns when complexity warrants

### Test Organization
```typescript
// Describe blocks for grouping
describe('FeatureName', () => {
  describe('method/endpoint', () => {
    it('describes expected behavior', () => {
      // Test implementation
    })
  })
})

// Or simpler structure
test('describes complete behavior', () => {
  // Test implementation
})
```

## Environment Configuration

### API Configuration (`api/src/config.ts`)
- Load environment variables with dotenv
- Export typed configuration constants
- Use sensible defaults

### Web Configuration (`web/src/config.ts`)
- Use Vite environment variables (`import.meta.env`)
- Prefix with `VITE_` for exposure to client

### Environment Files
- `.env` for local development
- Never commit `.env` files
- Document required variables in README

## Import Organization

### Import Order (Biome Auto-organized)
1. External packages (React, Express, etc.)
2. Internal modules with path aliases (`~/`, `~components/`)
3. Type imports (if not inline with value imports)
4. Relative imports (if any)

### Path Alias Usage
```typescript
// API aliases (from tsconfig.app.json)
"~controllers/*": ["src/controllers/*"]
"~models/*": ["src/models/*"]
"~routers/*": ["src/routers/*"]
"~/*": ["src/*"]

// Web aliases (from tsconfig.app.json)
"~ui/*": ["src/components/ui/*"]
"~components/*": ["src/components/*"]
"~services/*": ["src/services/*"]
"~stores/*": ["src/stores/*"]
// etc.
```

## Build and Development

### Scripts Patterns

#### API Package
- `dev`: Watch mode with tsx
- `build`: TypeScript compilation to `dist/`
- `test`: Vitest in watch mode
- `check`: Type checking without emit

#### Web Package
- `dev`: Vite dev server
- `build`: Vite production build
- `test`: Vitest unit tests
- `test:e2e`: Playwright E2E tests
- `check`: Type checking without emit

#### Root Package
- `dev`: Run both API and Web in parallel with pnpm
- `lint`: Biome lint check
- `lint:fix`: Biome lint with auto-fix
- `format`: Biome format

### Workspace Management
- Use `pnpm --filter <package>` to run scripts in specific packages
- Shared dependencies in root `package.json`
- Package-specific dependencies in package `package.json`

## Version Control and Commits

### Commit Patterns (Observed)
- Keep commits focused and atomic
- Use descriptive commit messages
- Reference issues when applicable

### Branch Strategy
- Main branch: `main`
- Follow standard Git workflow

## Performance Considerations

### API Performance
- Use database indexes (configured in Drizzle migrations)
- Limit query results when appropriate (`.limit()`)
- Order results efficiently (`.orderBy()`)

### Web Performance
- Lazy load routes and components when needed
- Use TanStack Query for caching and deduplication
- Optimize images (observed in public assets)

## Security Patterns

### Input Validation
- Always validate with Zod schemas before processing
- Use `z.uuid()` for ID validation
- Use `z.coerce.number()` for numeric query params
- Validate at router level with middleware

### Database Security
- Use parameterized queries (Drizzle ORM handles this)
- Never concatenate user input into queries
- Use UUID for primary keys (prevents enumeration)

### CORS Configuration
```typescript
// Configured with specific origin
app.use(cors({ origin: CLIENT_ORIGIN }))
```

## General Best Practices

1. **Consistency First**: Follow existing patterns over external best practices
2. **Type Safety**: Leverage TypeScript's type system fully
3. **Explicit Over Implicit**: Be clear in naming and structure
4. **Fail Fast**: Use early returns and guard clauses
5. **Single Responsibility**: Keep functions and components focused
6. **DRY Principle**: Extract reusable logic to utilities or hooks
7. **Test Coverage**: Write tests for business logic and critical paths
8. **No Magic**: Avoid clever code; prefer readable and maintainable

## What NOT to Do

1. ❌ Don't use features beyond TypeScript 5.8
2. ❌ Don't use incompatible APIs from newer framework versions
3. ❌ Don't introduce new architectural patterns not in the codebase
4. ❌ Don't use `any` type unless absolutely necessary
5. ❌ Don't use `console.log` for debugging in committed code
6. ❌ Don't commit commented-out code
7. ❌ Don't use `var` (use `const` or `let`)
8. ❌ Don't mix promise patterns (use async/await consistently)
9. ❌ Don't bypass validation middleware
10. ❌ Don't hardcode values that should be configurable

## Quick Reference Checklist

Before generating code, verify:

- [ ] TypeScript version compatibility (5.8.3)
- [ ] Framework version compatibility (React 19, Express 5, etc.)
- [ ] Naming convention matches existing files
- [ ] File location follows project structure
- [ ] Imports use correct path aliases
- [ ] Code style matches Biome configuration
- [ ] Tests follow existing patterns
- [ ] Validation schemas defined for endpoints
- [ ] Error handling follows controller patterns
- [ ] Types are properly defined and used

---

**Remember**: When in doubt, search the codebase for similar examples and follow those patterns exactly. Consistency with existing code is more important than following external best practices.
