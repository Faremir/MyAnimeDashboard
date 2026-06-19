/**
 * Owns Library module-global reactive invalidation state.
 *
 * Library records live behind LibraryRepository. This store only tracks when
 * library data changes so Svelte derived queries can re-run after repository
 * mutations.
 */
export class LibraryStore {
    /**
     * Incremented whenever LibraryRepository changes local library data.
     */
    private libraryRevision = $state(0);

    /**
     * Reads the current revision so repository queries participate in Svelte reactivity.
     */
    public getLibraryRevision(): number {
        return this.libraryRevision;
    }

    /**
     * Marks library data as changed.
     */
    public incrementLibraryRevision(): void {
        this.libraryRevision += 1;
    }
}

/**
 * Shared Library module reactive invalidation state.
 */
export const libraryStore = new LibraryStore();
