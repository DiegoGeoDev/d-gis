---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Testing**: This project follows a zero-testing mandate. NO automated tests should be included unless explicitly requested. Focus on manual validation and user feedback.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **D-GIS Component Library**: `src/` at repository root (React components)
  - `src/components/` - Component categories (ui/, map/, layers/, interactive/)
  - `src/lib/` - Utilities and shared code
  - `src/hooks/` - Custom React hooks
  - `src/styles/` - Tailwind customizations
- **Registry**: Component registry with shadcn/ui installation patterns
- Paths shown below follow D-GIS single-project structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks for D-GIS components:

- [ ] T004 Setup MapProvider context and base map infrastructure
- [ ] T005 [P] Configure Tailwind CSS and shadcn/ui theming system
- [ ] T006 [P] Setup TypeScript interfaces for GeoJSON and map types
- [ ] T007 Create base component variants system (cva patterns)
- [ ] T008 Configure accessibility testing infrastructure (manual validation)
- [ ] T009 Setup component registry and installation CLI patterns

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Component contract test for [component] in tests/contract/[name].test.ts
- [ ] T011 [P] [US1] Integration test for [user journey] in tests/integration/[name].test.ts

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create [Component] TypeScript interface in src/lib/types.ts
- [ ] T013 [P] [US1] Create [Component] variants with cva in src/components/[category]/[component].tsx
- [ ] T014 [US1] Implement [Component] core functionality (depends on T012, T013)
- [ ] T015 [US1] Add [Component] to shadcn/ui registry pattern
- [ ] T016 [US1] Add accessibility features and WCAG 2.1 AA compliance
- [ ] T017 [US1] Add [Component] to component showcase in App.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Component contract test for [component] in tests/contract/[name].test.ts
- [ ] T019 [P] [US2] Integration test for [user journey] in tests/integration/[name].test.ts

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Component] TypeScript interface in src/lib/types.ts
- [ ] T021 [US2] Implement [Component] with React hooks in src/components/[category]/[component].tsx
- [ ] T022 [US2] Add [Component] variants and Tailwind styling
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Component contract test for [component] in tests/contract/[name].test.ts
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/[name].test.ts

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Component] TypeScript interface in src/lib/types.ts
- [ ] T027 [US3] Implement [Component] with map integration in src/components/[category]/[component].tsx
- [ ] T028 [US3] Add [Component] to registry with installation pattern

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Component documentation updates in registry/
- [ ] TXXX Code cleanup and TypeScript optimization
- [ ] TXXX Performance optimization across all components (60fps target)
- [ ] TXXX [P] Additional component tests (if requested) in tests/unit/
- [ ] TXXX Accessibility audit and compliance validation
- [ ] TXXX Run quickstart.md validation and component showcase

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Component contract test for [component] in tests/contract/[name].test.ts"
Task: "Integration test for [user journey] in tests/integration/[name].test.ts"

# Launch all components for User Story 1 together:
Task: "Create [Component1] interface in src/lib/types.ts"
Task: "Create [Component2] interface in src/lib/types.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
