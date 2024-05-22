import { writable } from "svelte/store";

import type { ChatEntry } from "../types/chats";
// import Chat from "$lib/components/Chat/Chat.svelte";

// For now only store singular chat entry
// export const chatHistoryStore = writable({
//   ChatHistories: new Map<string, ChatEntry>(),
// });

export const chatHistoryStore = writable({});
