<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import Prompt from "./Prompt.svelte";
  import PromptResult from "./PromptResult.svelte";
  import PromptSuggestion from "./PromptSuggestion.svelte";
  import PromptEntry from "./PromptEntry.svelte";
  import { chatHistoryStore } from "./stores/chatStore";

  let bufferedResult = "";
  let chatHistoryResults = [];
  let chatHistoryIndex = new Map();
  let chatHistorySubscription: any;
  let lastElement: any;
  const unsubscribe = chatHistoryStore.subscribe((value) => {
    chatHistorySubscription = value;
  });

  onMount(() => {
    console.log("Chat component mounted");
  });

  const storePrompt = (event) => {
    if (!chatHistoryIndex.has(chatHistorySubscription.id)) {
      chatHistoryIndex.set(chatHistorySubscription.id, chatHistorySubscription);
      chatHistoryResults = [...chatHistoryResults, chatHistorySubscription];
    } else {
      chatHistoryIndex.set(chatHistorySubscription.id, chatHistorySubscription);
      let temp = chatHistoryResults;
      chatHistoryResults = temp;
    }
    chatHistoryIndex.set(chatHistorySubscription.id, chatHistorySubscription);
    console.log("Chat History Results", chatHistoryResults);
    console.log("Chat History Index", chatHistoryIndex);
  };

  afterUpdate(() => {
    // const chatContainer = document.getElementById(
    //   `chat-entry-${chatHistoryResults.length - 1}`
    // );
    // chatContainer.scrollIntoView({ behavior: "smooth" });
    if (lastElement) {
      lastElement.scrollIntoView({ behavior: "smooth" });
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="flex h-[97vh] w-full flex-col chat-container">
  <div
    class="list-container flex-1 overflow-y-auto rounded-xl bg-stone-200 p-4 text-sm leading-6 text-stone-900 dark:bg-stone-800 dark:text-stone-300 sm:text-base sm:leading-7"
  >
    {#each chatHistoryResults as chatHistoryResult, index}
      {#if index === chatHistoryResults.length - 1}
        <div bind:this={lastElement}>
          <PromptResult queryResult={chatHistoryResult} />
        </div>
      {:else}
        <PromptResult queryResult={chatHistoryResult} />
      {/if}
    {/each}
  </div>
  <PromptEntry on:promptSuccess={storePrompt} />
</div>

<!-- <div class="flex h-[97vh] w-full flex-col">
  <div
    id="prompt-message-container"
    class="flex-1 overflow-y-auto rounded-xl bg-stone-200 p-4 text-sm leading-6 text-stone-900 dark:bg-stone-800 dark:text-stone-300 sm:text-base sm:leading-7"
  >
    {#each chatHistoryResults as chatHistoryResult (chatHistoryResult.id)}
      <div class="card query-result-container">
        <div>
          <h1 class="text-2xl">{chatHistoryResult.prompt}</h1>
        </div>
        <PromptResult queryResult={chatHistoryResult} />
      </div>
    {/each}
  </div>
  <PromptEntry on:promptSuccess={storePrompt} chatHistoryId="" />
</div> -->

<style>
  .query-result-container {
    margin-bottom: 1rem;
  }
  .chat-container {
    height: 97vh;
    overflow: scroll;
    position: relative;
  }
  .list-container {
    position: absolute;
    bottom: 0;
  }
</style>
