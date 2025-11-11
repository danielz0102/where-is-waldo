# Testing Style Guide for AI Agents

This document provides comprehensive guidelines for writing tests in the `web` package of the Where Is Waldo project. Follow these patterns consistently to maintain a predictable and maintainable test suite.

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Test Structure](#test-structure)
3. [Mocking Patterns](#mocking-patterns)
4. [Test Utilities](#test-utilities)
5. [Component Testing](#component-testing)
6. [Integration Testing](#integration-testing)
7. [E2E Testing](#e2e-testing)
8. [Async Testing](#async-testing)
9. [Timer Testing](#timer-testing)
10. [State Management Testing](#state-management-testing)

> [!NOTE]
> For AI agents: When you want to run tests on the terminal, run it without watch mode to avoid hanging processes.

---

## Testing Philosophy

### Avoid Unnecessary Nesting with `describe` Blocks

**❌ Don't do this:**

```typescript
describe("ComponentName", () => {
  describe("when user clicks", () => {
    describe("and data is loading", () => {
      it("shows loading state", () => {
        // test
      });
    });
  });
});
```

**✅ Do this:**

```typescript
test("shows loading state when user clicks and data is loading", () => {
  // test
});
```

**Rationale:** Flat test structures are easier to read, search, and maintain. Use descriptive test names instead of nested `describe` blocks.

**Exception:** Use `describe` blocks only when testing multiple methods of a single module.

```typescript
// Acceptable use of describe for logical grouping
describe("function1", () => {
  test("does something", () => {});
  test("does something else", () => {});
});

describe("function2", () => {
  test("handles case A", () => {});
  test("handles case B", () => {});
});
```

---

## Test Structure

### File Organization

- Place unit tests next to the source file: `ComponentName.test.tsx` for components, `tests/` subfolder for services and other modules.
- Place integration tests in: `tests/integration/`
- Place E2E tests in: `tests/e2e/`
- Place test utilities in: `tests/utils/`

### Test Naming Convention

Use clear, descriptive test names that explain the expected behavior:

```typescript
// ✅ Good test names
test('displays the app title "Where is Waldo?"', () => {});
test("calls mutation with correct data when form is submitted", async () => {});
test("shows loading state during mutation", async () => {});
test("resets after showing error", async () => {});

// ❌ Bad test names
test("it works", () => {});
test("test1", () => {});
test("button click", () => {});
```

### Setup and Teardown

Use `beforeEach` for test setup. Avoid `afterEach` unless necessary for cleanup:

```typescript
beforeEach(() => {
  // Reset mocks to default values
  getAllMock.mockResolvedValue(fakeScenarios);
  queryClient.clear();
});
```

---

## Mocking Patterns

### Mock Services Instead of TanStack Queries

**❌ Don't mock TanStack Query hooks:**

```typescript
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));
```

**✅ Mock the underlying services:**

```typescript
vi.mock("~services/ScenarioService", () => ({
  default: {
    getAll: vi.fn(),
  },
}));

const getAllMock = vi.mocked(ScenarioService.getAll);
```

**Rationale:** Mocking services allows TanStack Query to work naturally, testing the actual integration while controlling the data layer.

### Default Mock Values with `mockOnce` Overrides

**Pattern:** Establish a default mock return value in `beforeEach`, then override in specific tests using `mockResolvedValueOnce` or `mockImplementationOnce`.

```typescript
// Setup default behavior
const getAllMock = vi.mocked(ScenarioService.getAll);

beforeEach(() => {
  // Default: successful response with fake data
  getAllMock.mockResolvedValue(fakeScenarios);
  queryClient.clear();
});

// Override for specific test cases
test("shows loading state for scenarios", () => {
  // Override with never-resolving promise for loading state
  getAllMock.mockImplementationOnce(() => new Promise(() => {}));
  renderer.render(<SelectScenario />);
  expect(screen.queryByText(/loading/i)).toBeInTheDocument();
});

test("shows error state", async () => {
  // Override with rejection for error state
  getAllMock.mockRejectedValueOnce(new Error("Failed to fetch"));
  renderer.render(<SelectScenario />);

  const loading = await screen.findByText(/loading/i);
  await waitForElementToBeRemoved(loading);

  expect(screen.queryByText(/error.*occurred/i)).toBeInTheDocument();
});
```

**Benefits:**

- Predictable test behavior with sensible defaults
- Clear indication of special cases in individual tests
- Reduced boilerplate in most test cases

### Mock Module Pattern

```typescript
vi.mock("~services/ServiceName", () => ({
  default: {
    methodName: vi.fn(),
  },
}));

const methodMock = vi.mocked(ServiceName.methodName);
```

**For components:**

```typescript
vi.mock("../ScoreForm", () => ({
  default: () => <div data-testid="score-form">Score Form</div>,
}));
```

**For React Router:**

```typescript
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

const useParamsMock = vi.mocked(useParams);
```

---

## Test Utilities

### Use the Renderer Utility

**Purpose:** Simplify rendering components with React Router or TanStack Query providers.

**Location:** `tests/utils/Renderer.tsx`

**Basic Usage:**

```typescript
import { Renderer } from "~tests/utils/Renderer";

// Simple component (no providers)
const renderer = new Renderer();
renderer.render(<Component />);

// With React Router
const renderer = new Renderer().withRouter();
renderer.render(<Component />);

// With TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});
const renderer = new Renderer().withQueryProvider(queryClient);
renderer.render(<Component />);

// With both providers (order doesn't matter - Renderer handles nesting)
const renderer = new Renderer().withRouter().withQueryProvider(queryClient);
renderer.render(<Component />);
```

**Pattern in Tests:**

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});
const renderer = new Renderer().withRouter().withQueryProvider(queryClient);

beforeEach(() => {
  queryClient.clear();
});

test("example test", () => {
  renderer.render(<MyComponent />);
  // assertions
});
```

### Use Fake Data Utility

**Purpose:** Generate consistent mock entities for testing.

**Location:** `tests/utils/fakeData.ts`

**Available Functions:**

```typescript
import {
  createRandomCharacter,
  createRandomScenario,
  createRandomScore,
  createRandomCharacters,
  createRandomScenarios,
  createRandomScores,
} from "~tests/utils/fakeData";

// Single entities
const fakeCharacter = createRandomCharacter();
const fakeScenario = createRandomScenario();
const fakeScore = createRandomScore();

// Multiple entities
const fakeCharacters = createRandomCharacters(); // Random count (10-30)
const fakeCharacters = createRandomCharacters(5); // Specific count
const fakeScenarios = createRandomScenarios(3);
const fakeScores = createRandomScores(10);
```

**Setup Pattern:**

```typescript
const fakeCharacter = createRandomCharacter();
const fakeScenarios = createRandomScenarios();

vi.mock("~services/CharacterService", () => ({
  default: {
    checkClick: vi.fn(() => new Promise(() => {})),
  },
}));

const CheckClickMock = vi.mocked(CharacterService.checkClick);
```

---

## Component Testing

### Basic Component Test Pattern

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComponentName from ".";

test("renders component with expected elements", () => {
  render(<ComponentName prop="value" />);
  expect(screen.getByRole("heading", { name: /title/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /click me/i })).toBeVisible();
});
```

### User Interaction Testing

```typescript
test("handles user click", async () => {
  const user = userEvent.setup();
  const onClickMock = vi.fn();

  render(<Button onClick={onClickMock} />);

  const button = screen.getByRole("button");
  await user.click(button);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test("handles form submission", async () => {
  const user = userEvent.setup();
  render(<Form />);

  const input = screen.getByPlaceholderText(/username/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await user.type(input, "TestUser123");
  await user.click(submitButton);

  expect(mockFunction).toHaveBeenCalledWith({ username: "TestUser123" });
});
```

### Testing Loading States

```typescript
test("shows loading state", async () => {
  mockService.mockImplementationOnce(() => new Promise(() => {}));
  const user = userEvent.setup();

  render(<Component />);
  const button = screen.getByRole("button");
  await user.click(button);

  expect(button).toHaveTextContent(/loading/i);
  expect(button).toBeDisabled();
});
```

### Testing Success/Error States

```typescript
test("shows success state", async () => {
  mockService.mockResolvedValueOnce(true);
  const user = userEvent.setup();

  render(<Component />);
  const button = screen.getByRole("button");
  await user.click(button);

  expect(button).toHaveTextContent(/success|correct/i);
});

test("shows error state", async () => {
  mockService.mockResolvedValueOnce(false);
  const user = userEvent.setup();

  render(<Component />);
  const button = screen.getByRole("button");
  await user.click(button);

  expect(button).toHaveTextContent(/error|wrong/i);
});
```

---

## Integration Testing

### Pattern for Integration Tests

Integration tests verify interactions between components and stores without mocking internal components:

```typescript
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLevelStore } from "~/stores/levelStore";
import CharacterMenu from "~components/CharacterMenu";
import { createRandomCharacters } from "~tests/utils/fakeData";

vi.mock("~services/CharacterService", () => ({
  default: {
    checkClick: vi.fn(() => Promise.resolve(true)),
  },
}));

const fakeCharacters = createRandomCharacters();

beforeEach(() => {
  const { result } = renderHook(() => useLevelStore());
  result.current.reset();
});

test("set win when all characters are found", async () => {
  const user = userEvent.setup();
  const { result } = renderHook(() => useLevelStore());
  expect(result.current.win).toBe(false);

  render(<CharacterMenu characters={fakeCharacters} />);

  const clickPromises = fakeCharacters.map((character) => {
    return user.click(screen.getByRole("button", { name: character.name }));
  });

  await Promise.all(clickPromises);

  expect(result.current.win).toBe(true);
});
```

---

## E2E Testing

### Playwright Test Pattern

E2E tests verify complete user journeys in a real browser environment:

```typescript
import { expect, test } from "@playwright/test";

test("completes user flow", async ({ page }) => {
  await page.goto("/");

  const link = page.getByRole("link", { name: "Start Playing" });
  await link.click();

  expect(page.url()).toContain("/select-scenario");
});

test("displays expected elements", async ({ page }) => {
  await page.goto("/scenario/beach");

  const scenarioImage = page.getByRole("img", { name: /Beach/ });
  await expect(scenarioImage).toBeVisible();

  const timer = page.getByRole("timer");
  await expect(timer).toBeVisible();
});

test("handles user interaction", async ({ page }) => {
  await page.goto("/scenario/beach");

  const scenarioImage = page.getByRole("img", { name: /Beach/ });
  await scenarioImage.click();

  const menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
});
```

### E2E Best Practices

1. Wait for elements before interacting:

   ```typescript
   await scenario.waitFor({ state: "visible" });
   ```

2. Use specific locators:

   ```typescript
   page.getByRole("button", { name: "Waldo" });
   page.getByRole("heading", { name: /Beach Leaderboard/ });
   ```

3. Verify navigation:
   ```typescript
   expect(page.url()).toContain("/scenario/beach");
   ```

---

## Async Testing

### Waiting for Elements

```typescript
// Wait for element to appear
const element = await screen.findByText(/loading/i);

// Wait for element to be removed
await waitForElementToBeRemoved(loading);

// Query after async operation
expect(await screen.findByText(/success/i)).toBeVisible();
```

### Testing Async State Changes

```typescript
test("updates after async operation", async () => {
  mockService.mockResolvedValue(data);

  render(<Component />);

  // Wait for loading to complete
  const loading = await screen.findByText(/loading/i);
  await waitForElementToBeRemoved(loading);

  // Verify final state
  expect(screen.getByText(/success/i)).toBeVisible();
});
```

---

## Timer Testing

### Using Fake Timers

```typescript
test("resets after timeout", async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });

  const user = userEvent.setup();
  const button = renderButton();

  await user.click(button);
  expect(button).toHaveTextContent(/error/i);

  act(() => {
    vi.advanceTimersByTime(1500);
  });

  expect(button).toHaveTextContent(/initial/i);

  vi.useRealTimers();
});
```

### Testing Timer Functionality

```typescript
beforeEach(() => {
  vi.useFakeTimers();
  useLevelStore.getState().reset();
});

test("timer increments correctly", () => {
  const { result } = renderHook(() => useLevelStore());
  result.current.resumeTimer();

  act(() => {
    vi.advanceTimersByTime(3000);
  });

  expect(result.current.seconds).toBe(3);
});

test("timer can be paused", () => {
  const { result } = renderHook(() => useLevelStore());
  result.current.resumeTimer();

  act(() => {
    vi.advanceTimersByTime(3000);
    result.current.pauseTimer();
    vi.advanceTimersByTime(5000);
  });

  expect(result.current.seconds).toBe(3);
});
```

---

## State Management Testing

### Testing Zustand Stores

```typescript
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useLevelStore } from "..";

beforeEach(() => {
  useLevelStore.getState().reset();
});

test("initializes with default values", () => {
  const { result } = renderHook(() => useLevelStore());

  expect(result.current.win).toBe(false);
  expect(result.current.seconds).toBe(0);
});

test("updates state correctly", () => {
  const { result } = renderHook(() => useLevelStore());

  act(() => {
    result.current.setWin();
  });

  expect(result.current.win).toBe(true);
});
```

### Testing Store Slices

Test individual slices with their specific functionality:

```typescript
describe("timerSlice", () => {
  it("resumes the timer", () => {
    const { result } = renderHook(() => useLevelStore());
    result.current.resumeTimer();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.seconds).toBe(3);
  });
});
```

---

## Common Patterns Summary

### 1. Test File Setup Template

```typescript
import { QueryClient } from "@tanstack/react-query";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceName from "~services/ServiceName";
import { createRandomEntity } from "~tests/utils/fakeData";
import { Renderer } from "~tests/utils/Renderer";
import ComponentName from ".";

vi.mock("~services/ServiceName", () => ({
  default: {
    methodName: vi.fn(),
  },
}));

const methodMock = vi.mocked(ServiceName.methodName);
const fakeData = createRandomEntity();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});
const renderer = new Renderer().withRouter().withQueryProvider(queryClient);

beforeEach(() => {
  methodMock.mockResolvedValue(fakeData);
  queryClient.clear();
});

test("test name", () => {
  renderer.render(<ComponentName />);
  // assertions
});
```

### 2. Helper Function Pattern

Create reusable render helpers within test files:

```typescript
const renderScoreForm = () => {
  return renderer.render(
    <ScoreForm scenarioId={fakeScenarioId} time={fakeTime} />
  );
};

const renderButton = (onSuccess = vi.fn()) => {
  render(<CharacterButton character={fakeCharacter} onSuccess={onSuccess} />);
  return screen.getByRole("button", {
    name: new RegExp(fakeCharacter.name, "i"),
  });
};
```

### 3. Assertions Pattern

```typescript
// Visibility
expect(element).toBeVisible();
expect(element).toBeInTheDocument();

// Content
expect(element).toHaveTextContent(/pattern/i);
expect(element).toHaveAttribute("href", "/path");

// State
expect(element).toBeDisabled();
expect(element).not.toBeInTheDocument();

// Mock verification
expect(mockFn).toHaveBeenCalledWith(expectedArgs);
expect(mockFn).toHaveBeenCalledTimes(1);
```

---

## Quick Reference Checklist

Before writing tests, ensure:

- [ ] Mock services, not TanStack Query hooks
- [ ] Use Renderer utility for components with providers
- [ ] Use fake data utility for mock entities
- [ ] Establish default mock behavior in `beforeEach`
- [ ] Override defaults with `mockResolvedValueOnce` in specific tests
- [ ] Avoid unnecessary `describe` nesting
- [ ] Use descriptive test names
- [ ] Clean up resources (timers, query cache) in `beforeEach`
- [ ] Use `userEvent` for interactions, not `fireEvent`
- [ ] Wait for async operations with `await screen.findBy*`
- [ ] Test loading, success, and error states separately
- [ ] Use `act()` when advancing fake timers

---

## Anti-Patterns to Avoid

### ❌ Don't Mock TanStack Query

```typescript
// BAD
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(() => ({ data: fakeData, isLoading: false })),
}));
```

### ❌ Don't Use fireEvent

```typescript
// BAD
fireEvent.click(button);

// GOOD
const user = userEvent.setup();
await user.click(button);
```

### ❌ Don't Manually Wrap in Providers

```typescript
// BAD
render(
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  </MemoryRouter>
);

// GOOD
const renderer = new Renderer().withRouter().withQueryProvider(queryClient);
renderer.render(<Component />);
```

### ❌ Don't Nest describe Blocks Unnecessarily

```typescript
// BAD
describe("ComponentName", () => {
  describe("rendering", () => {
    describe("with data", () => {
      it("shows data", () => {});
    });
  });
});

// GOOD
test("shows data when data is available", () => {});
```

---

## Conclusion

Following these patterns ensures:

1. **Predictability**: Tests behave consistently with default mocks
2. **Clarity**: Flat structure with descriptive names
3. **Maintainability**: Reusable utilities reduce boilerplate
4. **Reliability**: Testing real integrations with controlled data
5. **Efficiency**: AI agents can quickly understand and generate tests

When in doubt, reference existing tests in the codebase that follow these patterns.
