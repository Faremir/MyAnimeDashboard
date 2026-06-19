# Changelog

All notable changes to My Anime Dashboard will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and future released versions will
use [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial desktop-style application shell.
- Dashboard status overview with library, schedule, attention, and system summary cards.
- Library page with mock entries, search, sorting, pagination, and anime-detail navigation.
- Schedule page with week navigation, day tabs, filtering, and mock airing episodes.
- Anime detail page with metadata, images, genres, scores, and related anime navigation.
- Settings page placeholder for future account, provider, synchronization, and appearance settings.
- Mock anime data.
- Mock library data.
- Mock schedule data.
- Reusable watch-state controls.
- Shared visual foundation for surfaces, buttons, tags, forms, page layout, and state colors.
- Shared clickable-surface interaction style.
- Shared date utility helpers.
- Dashboard summary repository for mock-derived overview data.
- Roadmap for alpha milestones leading toward `1.0.0`.
- Continuous integration workflow.

### Changed

- Replaced the default project README with a project-specific overview.
- Simplified navigation to the 1.0-relevant sections: Dashboard, Schedule, Library, and Settings.
- Moved schedule date math into shared utilities.
- Moved Dashboard summary calculation out of the Dashboard page.
- Updated Library cards to use the shared visual foundation.
- Changed Dashboard cards to navigate as whole clickable blocks instead of using separate header buttons.
- Standardized module repositories, actions, and rune-backed stores around stable public module APIs.
- Moved schedule week construction behind the Schedule repository.

### Planned

- External API contracts for Jikan and Anikoto.
- Real API client layer.
- Local data storage.
- Persistent library state.
- MyAnimeList login and synchronization.
- Schedule discovery pipeline.
- Desktop application packaging.
- Installable release builds.
