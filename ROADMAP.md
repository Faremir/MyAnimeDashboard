# Roadmap

MAD — My Anime Dashboard — is a local-first anime dashboard and tracking app.

The goal for `1.0.0` is to have a usable desktop app with a stable visual shell, local library state, schedule
discovery, anime detail/episode flow, MAL sync, and a documented release process.

## Versioning

Each major roadmap phase maps to one minor alpha tag.

| Phase                                              |    Target tag | Focus                         |
| -------------------------------------------------- | ------------: | ----------------------------- |
| [Phase 1](#phase-1--initial-project-foundation)    | `0.1.0-alpha` | Initial project foundation    |
| [Phase 2](#phase-2--external-api-contracts)        | `0.2.0-alpha` | External API contracts        |
| [Phase 3](#phase-3--api-client-layer)              | `0.3.0-alpha` | API client layer              |
| [Phase 4](#phase-4--anime-detail-and-episode-flow) | `0.4.0-alpha` | Anime detail and episode flow |
| [Phase 5](#phase-5--local-persistence-foundation)  | `0.5.0-alpha` | Local persistence foundation  |
| [Phase 6](#phase-6--persistent-library-state)      | `0.6.0-alpha` | Persistent library state      |
| [Phase 7](#phase-7--mal-authentication-and-sync)   | `0.7.0-alpha` | MAL authentication and sync   |
| [Phase 8](#phase-8--schedule-discovery-pipeline)   | `0.8.0-alpha` | Schedule discovery pipeline   |
| [Phase 9](#phase-9--pre-release-hardening)         | `0.9.0-alpha` | 1.0 hardening                 |
| [Release](#release--first-public-release)          |       `1.0.0` | First public release          |

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

Define how MAD understands external anime data before connecting real API calls to the application.

### Goals

- Define which external data MAD needs for 1.0.
- Establish how Jikan data maps to MAD anime data.
- Establish how Anikoto data maps to MAD anime and episode availability data.
- Keep external provider-specific details separate from the rest of the application.
- Prepare the project for real API integration without changing current user-facing behavior.

### Completion checklist

| Area                 | Expected state                                                             |
| -------------------- | -------------------------------------------------------------------------- |
| Jikan data           | Current-season anime data can be represented in MAD’s internal format.     |
| Anikoto anime data   | Recent anime data can be represented in MAD’s internal format.             |
| Anikoto episode data | Episode and watch-link availability can be represented clearly.            |
| Anime matching       | MAL IDs are used where possible to connect records from different sources. |
| Current app behavior | Existing mock behavior remains stable and unchanged.                       |

## Phase 3 — API client layer

Target tag: `0.3.0-alpha`

Connect MAD to real external anime data sources behind controlled boundaries.

### Goals

- Fetch current-season anime data from Jikan.
- Fetch recent anime data from Anikoto.
- Fetch Anikoto series and episode details.
- Handle loading, empty, and error states for remote data.
- Confirm whether external data can be fetched directly from the app or needs a desktop-side integration layer.

### Completion checklist

| Area                   | Expected state                                                                |
| ---------------------- | ----------------------------------------------------------------------------- |
| Jikan                  | MAD can load current-season anime data in development.                        |
| Anikoto recent anime   | MAD can load provider-side anime discovery data in development.               |
| Anikoto series details | MAD can load episode and watch-link availability in development.              |
| Failure handling       | Remote failures are visible and safe.                                         |
| App independence       | Basic navigation and layout do not depend on remote services being available. |

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

Introduce durable local storage as the foundation of MAD’s local-first behavior.

### Goals

- Add the local storage foundation.
- Define the core data areas MAD needs to store.
- Prepare the app to keep anime, library, schedule, and episode data locally.
- Make local data the long-term source of truth for the app.
- Keep remote services as sync/discovery sources, not runtime dependencies.

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

## Phase 7 — MAL authentication and sync

Target tag: `0.7.0-alpha`

Add MyAnimeList authentication and synchronization.

### Goals

- Allow the user to connect their MAL account.
- Import MAL library data into MAD.
- Push local MAD library changes to MAL.
- Track sync state.
- Handle sync failures safely.
- Keep the app usable even when MAL is unavailable.

### Completion checklist

| Area               | Expected state                                            |
| ------------------ | --------------------------------------------------------- |
| Account connection | User can connect a MAL account.                           |
| Import             | MAL library data can be imported into MAD.                |
| Export             | Local library changes can be synced back to MAL.          |
| Sync status        | The app shows whether data is synced, pending, or failed. |
| Failure handling   | Sync failures are visible and recoverable.                |
| Offline use        | MAD remains usable without an active MAL connection.      |

## Phase 8 — Schedule discovery pipeline

Target tag: `0.8.0-alpha`

Build the real schedule discovery flow from external anime sources into local MAD data.

### Goals

- Discover current-season anime.
- Match anime across Jikan, MAL, and Anikoto where possible.
- Fetch Anikoto episode availability.
- Store schedule and episode availability locally.
- Render Schedule from local stored data.
- Join Schedule display with local Library state.

### Completion checklist

| Area                 | Expected state                                                     |
| -------------------- | ------------------------------------------------------------------ |
| Discovery            | MAD can discover currently airing anime from external sources.     |
| Matching             | External records can be connected through MAL IDs where possible.  |
| Episode availability | Available episodes and watch links can be refreshed.               |
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
- Support local-first anime library tracking.
- Support schedule discovery.
- Support anime detail and episode flow.
- Support MAL authentication and sync.
- Provide enough documentation for installation, usage, and known limitations.

### Completion checklist

| Area          | Expected state                                                       |
| ------------- | -------------------------------------------------------------------- |
| Install       | The app can be installed and launched cleanly.                       |
| Local data    | Local persistence works after restart.                               |
| Schedule      | Schedule discovery works.                                            |
| Anime detail  | Anime detail and episode flow work.                                  |
| MAL           | MAL authentication and sync work.                                    |
| Failures      | Main failure states are handled.                                     |
| Documentation | README, changelog, release notes, and known limitations are updated. |
| Release       | Public release tag is created.                                       |
