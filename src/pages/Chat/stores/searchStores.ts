import { writable } from "svelte/store";
import type { Search } from "$lib/types/search";

export const searchStore = writable({ text: "", method: "query" });

export const mockSearchResultsStore = writable({});

export const searchResultsStore = writable([]);
