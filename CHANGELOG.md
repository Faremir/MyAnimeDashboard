# Changelog

All notable changes to My Anime Dashboard will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and future tagged versions will use
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

No unreleased changes.

## [0.1.0-alpha] - 2026-06-19

### Added

- Added the initial desktop-style app shell with Dashboard, Schedule, Library, and Settings sections.
- Added the first stable navigation structure for the relevant top-level sections.
- Added mock anime, library, schedule, and anime detail workflows.
- Added Dashboard summary cards for library, schedule, attention, and system status.
- Added Library search, sorting, pagination, status filtering, and watch-state controls.
- Added Schedule week navigation, day tabs, status filtering, and episode cards.
- Added Anime detail page with metadata, images, age-rating context, and related anime navigation.
- Added Settings placeholders for future account, provider, synchronization, appearance, schedule, and local data setup.
- Added shared visual styles for surfaces, buttons, tags, forms, page layout, state colors, and clickable interactions.
- Added shared date helpers and label formatting helpers.
- Added module repositories, actions, public indexes, and rune-backed state objects as the Phase 1 architecture.
- Added Library-owned in-app watch state for Library, Schedule, and Dashboard views.
- Added repository-backed Library watch-state actions for status, progress, and episode watch state updates.
- Added Schedule repository queries for week construction and airing episode views.
- Added Dashboard repository queries for summary card data.
- Added repository boundaries that keep mock seed data out of components.
- Added project README, roadmap, changelog, validation scripts, and continuous integration workflow.

### Planned

- External API contracts for AniList metadata and schedule data.
- User library sync contracts for AniList and MyAnimeList.
- Episode embed availability contracts for Megaplay.
- Real API client layer.
- Local data storage.
- Persistent library state.
- AniList and MyAnimeList login and synchronization.
- Schedule discovery pipeline.
- Desktop application packaging.
- Installable public release builds.
