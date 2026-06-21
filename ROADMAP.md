# Roadmap

MAD — My Anime Dashboard — is a local-first anime dashboard and tracking app.

The goal for `1.0.0` is to have a usable desktop app with a stable visual shell, durable library state, schedule
discovery, anime detail/episode flow, AniList/MyAnimeList library sync, and a documented release process.

## Versioning

Each major roadmap phase maps to one minor alpha tag.

| Phase                                                |    Target tag | Focus                           |
| ---------------------------------------------------- | ------------: | ------------------------------- |
| [Phase 1](#phase-1--initial-project-foundation)      | `0.1.0-alpha` | Initial project foundation      |
| [Phase 2](#phase-2--external-api-contracts)          | `0.2.0-alpha` | External API contracts          |
| [Phase 3](#phase-3--api-client-layer)                | `0.3.0-alpha` | API client layer                |
| [Phase 4](#phase-4--anime-detail-and-episode-flow)   | `0.4.0-alpha` | Anime detail and episode flow   |
| [Phase 5](#phase-5--local-persistence-foundation)    | `0.5.0-alpha` | Local persistence foundation    |
| [Phase 6](#phase-6--persistent-library-state)        | `0.6.0-alpha` | Persistent library state        |
| [Phase 7](#phase-7--library-authentication-and-sync) | `0.7.0-alpha` | Library authentication and sync |
| [Phase 8](#phase-8--schedule-discovery-pipeline)     | `0.8.0-alpha` | Schedule discovery pipeline     |
| [Phase 9](#phase-9--pre-release-hardening)           | `0.9.0-alpha` | 1.0 hardening                   |
| [Release](#release--first-public-release)            |       `1.0.0` | First public release            |

## Testing plan by phase

Testing should grow with the architecture instead of being deferred until hardening. Each phase should add tests at the
lowest useful level for the behavior introduced in that phase.

| Phase                                                | Testing focus                                                                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Phase 2](#phase-2--external-api-contracts)          | Add Vitest and unit-test provider-neutral mappers, pure transforms, and shared utility logic.                     |
| [Phase 3](#phase-3--api-client-layer)                | Unit-test API clients with mocked fetch responses for success, HTTP errors, GraphQL errors, and network failures. |
| [Phase 4](#phase-4--anime-detail-and-episode-flow)   | Add Svelte Testing Library for component tests around AnimeDetail opening, episode context, and empty states.     |
| [Phase 5](#phase-5--local-persistence-foundation)    | Add storage contract tests and persistence integration tests against isolated test storage.                       |
| [Phase 6](#phase-6--persistent-library-state)        | Test Library repository/action/store behavior for watch-state transitions, progress, and schedule joins.          |
| [Phase 7](#phase-7--library-authentication-and-sync) | Test sync mapping, conflict direction, pending/failed states, and mocked AniList/MyAnimeList clients.             |
| [Phase 8](#phase-8--schedule-discovery-pipeline)     | Add integration tests for schedule discovery from mocked provider data into stored local schedule records.        |
| [Phase 9](#phase-9--pre-release-hardening)           | Add Playwright smoke/E2E coverage for the main user flows and finalize accessibility-focused component tests.     |

## Phase 1 — Initial project foundation

Target tag: `0.1.0-alpha`

Establish the initial MAD repository and bring it to the first usable alpha baseline.

### Goals

- Initialize and organize the project as a maintainable desktop-app foundation.
- Set up the core development workflow:
    - local development,
    - formatting,
    - validation,
    - production build.
- Establish the first version of the application shell and navigation.
- Keep only the 1.0-relevant navigation sections:
    - Dashboard
    - Schedule
    - Library
    - Settings
- Establish the shared visual/theme foundation.
- Add the first mock workflows for:
    - anime data,
    - schedule data,
    - library data,
    - anime detail.
- Prepare the repository documentation for continued development.

### Completion checklist

| Area          | Expected state                                                                           |
| ------------- | ---------------------------------------------------------------------------------------- |
| Repository    | The project is initialized, organized, and ready for continued development.              |
| Tooling       | Development, formatting, validation, and build commands are available.                   |
| App shell     | Navigation, layout, and visual hierarchy feel coherent.                                  |
| Navigation    | Dashboard, Schedule, Library, and Settings are the only 1.0-relevant top-level sections. |
| Shared style  | Common visual patterns are reusable and consistent.                                      |
| Mock data     | Anime, schedule, and library mock data exist and are clean enough to build on.           |
| Schedule      | Mock schedule navigation and filtering behave predictably.                               |
| Library       | Mock library display and actions behave predictably.                                     |
| Anime detail  | Anime detail can be opened from the current mock workflows.                              |
| Documentation | README and ROADMAP are up to date for the first alpha baseline.                          |
| Cleanup       | No known small UI or markup issue is intentionally left unresolved.                      |

## Phase 2 — External API contracts

Target tag: `0.2.0-alpha`

Define how MAD understands external provider data before connecting real API calls to the application.

### Goals

- Define which external data MAD needs for 1.0.
- Establish how AniList anime metadata maps to MAD anime records.
- Establish how AniList airing schedule data maps to MAD schedule records.
- Define user library sync contracts for AniList and MyAnimeList.
- Define episode embed availability contracts for Megaplay.
- Keep external provider-specific details separate from the rest of the application.
- Prepare the project for real API integration without changing current user-facing behavior.
- Add the first test foundation for provider contract behavior.

### Completion checklist

| Area                  | Expected state                                                              |
| --------------------- | --------------------------------------------------------------------------- |
| AniList anime data    | Anime metadata can be represented in MAD’s internal format.                 |
| AniList schedule data | Concrete airing episodes can be represented in MAD’s schedule format.       |
| Library sync data     | AniList and MyAnimeList user library states have provider-neutral shapes.   |
| Embed data            | Megaplay watch/embed availability can be represented clearly.               |
| External identities   | Provider-owned IDs can be carried for matching without leaking into UI.     |
| Test foundation       | Vitest is configured and provider mapper behavior is covered by unit tests. |
| Current app behavior  | Existing mock behavior remains stable and unchanged.                        |

## Phase 3 — API client layer

Target tag: `0.3.0-alpha`

Connect MAD to real external anime data sources behind controlled boundaries.

### Goals

- Fetch anime metadata and airing schedule data from AniList.
- Resolve episode embed availability through Megaplay.
- Handle loading, empty, and error states for remote data.
- Confirm whether external data can be fetched directly from the app or needs a desktop-side integration layer.
- Cover API client behavior with deterministic mocked responses.

### Completion checklist

| Area             | Expected state                                                                |
| ---------------- | ----------------------------------------------------------------------------- |
| AniList anime    | MAD can load anime metadata in development.                                   |
| AniList schedule | MAD can load concrete airing schedule data in development.                    |
| Megaplay embeds  | MAD can resolve episode embed availability in development.                    |
| Failure handling | Remote failures are visible and safe.                                         |
| Client tests     | API client success and failure paths are covered without live network calls.  |
| App independence | Basic navigation and layout do not depend on remote services being available. |

## Phase 4 — Anime detail and episode flow

Target tag: `0.4.0-alpha`

Make AnimeDetail the central place for anime information, selected episodes, and watch availability.

### Goals

- Open anime detail from Library.
- Open anime detail from Schedule.
- Pass selected episode context into AnimeDetail.
- Display available episode/watch information in AnimeDetail.
- Keep Schedule focused on discovery and navigation, not playback logic.

### Completion checklist

| Area               | Expected state                                                 |
| ------------------ | -------------------------------------------------------------- |
| Library flow       | Selecting anime from Library opens AnimeDetail.                |
| Schedule flow      | Selecting anime from Schedule opens AnimeDetail.               |
| Episode context    | Schedule can open AnimeDetail with a selected episode context. |
| Watch availability | AnimeDetail can show relevant episode/watch availability.      |
| Missing links      | The flow remains clear when no watch link is available.        |

## Phase 5 — Local persistence foundation

Target tag: `0.5.0-alpha`

Introduce durable local storage as the foundation of MAD’s offline working copy.

### Goals

- Add the local storage foundation.
- Define the core data areas MAD needs to store.
- Prepare the app to keep anime, library, schedule, and episode data locally.
- Keep anime, library, schedule, episode, and sync working data available locally.
- Treat local data as MAD’s durable offline working copy.
- Allow the user-selected primary library source to reconcile library state when sync is enabled.

### Completion checklist

| Area          | Expected state                                            |
| ------------- | --------------------------------------------------------- |
| Local storage | MAD has a working local persistence foundation.           |
| Anime data    | Basic anime records can be stored and read locally.       |
| Library data  | Basic library records can be stored and read locally.     |
| Schedule data | Basic schedule records can be stored and read locally.    |
| App restart   | Stored records remain available after restarting the app. |

## Phase 6 — Persistent library state

Target tag: `0.6.0-alpha`

Make Library state real, durable, and locally owned.

### Goals

- Persist anime library entries.
- Persist watch-state transitions.
- Persist progress.
- Use progress to determine watched/unwatched episode state.
- Reflect local library state in both Library and Schedule.

### Completion checklist

| Area             | Expected state                                                        |
| ---------------- | --------------------------------------------------------------------- |
| Library entries  | User library entries survive app restart.                             |
| Watch states     | Planned, watching, paused, dropped, and completed states are durable. |
| Progress         | Episode progress is stored locally.                                   |
| Library display  | Library reflects persisted local state.                               |
| Schedule display | Schedule reflects local library state where relevant.                 |
| Restart/rewatch  | Restart and rewatch behavior has a clear local-state path.            |

## Phase 7 — Library authentication and sync

Target tag: `0.7.0-alpha`

Add AniList and MyAnimeList authentication and synchronization.

### Goals

- Allow the user to connect AniList and MyAnimeList accounts.
- Let the user choose a primary library source.
- Import user library data into MAD.
- Push local MAD library changes to connected library sources according to sync settings.
- Track sync state.
- Handle sync failures safely.
- Keep the app usable even when external library services are unavailable.

### Completion checklist

| Area               | Expected state                                                         |
| ------------------ | ---------------------------------------------------------------------- |
| Account connection | User can connect AniList and MyAnimeList accounts.                     |
| Primary source     | User can choose which connected account owns primary library state.    |
| Import             | User library data can be imported into MAD.                            |
| Export             | Local library changes can be synced back to connected library sources. |
| Sync status        | The app shows whether data is synced, pending, or failed.              |
| Failure handling   | Sync failures are visible and recoverable.                             |
| Offline use        | MAD remains usable without active external library connections.        |

## Phase 8 — Schedule discovery pipeline

Target tag: `0.8.0-alpha`

Build the real schedule discovery flow from external anime sources into local MAD data.

### Goals

- Discover currently airing anime from AniList.
- Match external records through provider-owned identities where possible.
- Fetch Megaplay episode embed availability.
- Store schedule and episode availability locally.
- Render Schedule from local stored data.
- Join Schedule display with local Library state.

### Completion checklist

| Area                 | Expected state                                                     |
| -------------------- | ------------------------------------------------------------------ |
| Discovery            | MAD can discover currently airing anime from AniList.              |
| Matching             | External records can be connected through provider identities.     |
| Episode availability | Available episodes and embed links can be refreshed.               |
| Local schedule       | Schedule data is stored locally.                                   |
| Schedule display     | Schedule renders from stored data joined with local library state. |
| Refresh failure      | Existing schedule remains usable when refresh fails.               |

## Phase 9 — Pre-release hardening

Target tag: `0.9.0-alpha`

Prepare MAD for a public 1.0 release.

### Goals

- Polish the main workflows.
- Add complete loading, empty, error, and success states.
- Improve accessibility.
- Improve responsive behavior.
- Finalize settings needed for 1.0.
- Improve diagnostics and user-facing error clarity.
- Finalize release documentation.

### Completion checklist

| Area           | Expected state                                                    |
| -------------- | ----------------------------------------------------------------- |
| Dashboard      | Dashboard is polished enough for 1.0.                             |
| Schedule       | Schedule workflow is polished enough for 1.0.                     |
| Library        | Library workflow is polished enough for 1.0.                      |
| AnimeDetail    | Detail and episode flow are polished enough for 1.0.              |
| Settings       | Required 1.0 settings are present.                                |
| Failure states | Common loading, empty, and error states are handled clearly.      |
| Accessibility  | Keyboard, labels, focus, and contrast are acceptable for release. |
| Layout         | App works on common desktop and laptop sizes.                     |
| Documentation  | Setup, usage, limitations, and release notes are documented.      |

## Release — First public release

Target tag: `1.0.0`

Release the first public version of MAD.

### Goals

- Provide a stable public build.
- Support durable anime library tracking.
- Support schedule discovery.
- Support anime detail and episode flow.
- Support AniList and MyAnimeList authentication and sync.
- Provide enough documentation for installation, usage, and known limitations.

### Completion checklist

| Area          | Expected state                                                       |
| ------------- | -------------------------------------------------------------------- |
| Install       | The app can be installed and launched cleanly.                       |
| Local data    | Local persistence works after restart.                               |
| Schedule      | Schedule discovery works.                                            |
| Anime detail  | Anime detail and episode flow work.                                  |
| Library sync  | AniList and MyAnimeList authentication and sync work.                |
| Failures      | Main failure states are handled.                                     |
| Documentation | README, changelog, release notes, and known limitations are updated. |
| Release       | Public release tag is created.                                       |
