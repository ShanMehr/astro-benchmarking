<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { chatHistoryStore } from ".//stores/chatStore";
  import type { ChatEntry } from "./types/chats";
  // import axios from "axios";
  let prompt = "";
  export let bufferedResult = "";
  let chatEntry: ChatEntry;
  let dispatch = createEventDispatcher();
  // import { ChatOpenAI } from "@langchain/openai";
  // import OpenAI from "openai";
  import mockData from "./mocked_data/papers.json";

  let openai = null;

  let chatModel = null;

  onMount(() => {
    // openai = new OpenAI({
    //   apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
    //   dangerouslyAllowBrowser: true,
    // });
    // chatModel = new ChatOpenAI({
    //   apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
    // });
  });

  const promptModel = async (prompt) => {
    let promptId = Math.random().toString(36).substring(7);
    chatEntry = {
      id: promptId,
      prompt: prompt,
      result: "",
      timestamp: new Date().toISOString(),
    };
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });
    for await (const chunk of stream) {
      // process.stdout.write(chunk.choices[0]?.delta?.content || "");
      // console.log("Chunk", chunk.choices[0]?.delta?.content || "");
      bufferedResult += chunk.choices[0]?.delta?.content || "";
      chatEntry.result = bufferedResult;
      chatHistoryStore.set(chatEntry);
      dispatch("promptSuccess", chatEntry);
    }
    return bufferedResult;
  };

  let mockPromptModel = async (prompt) => {
    // let result = "";
    // for (let i = 0; i < mockData.papers.length; i++) {
    //   console.log(result[i]);
    //   // put the thread to sleep for a few seconds
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   bufferedResult.push(mockData.papers[i].title);
    // }
    return bufferedResult;
  };

  const performQuery = async (e) => {
    // e.preventDefault();
    // console.log("Performing query");
    // if (prompt.trim() === "") return;
    // let mockResult =
    //   "This is a sample response. You can replace this with the actual response from the API.";
    // let promptId = Math.random().toString(36).substring(7);
    // let result = await promptModel(prompt);
    // console.log("Result", result);
    // chatEntry = {
    //   id: promptId,
    //   prompt: prompt,
    //   result: result || mockResult,
    //   timestamp: new Date().toISOString(),
    // };
    // prompt = "";
    // chatHistoryStore.set(chatEntry);
    // dispatch("promptSuccess", { chatHistoryId, promptId, prompt, result });
  };

  function checkForEnter(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      performQuery(event);
    }
  }

  onDestroy(() => {
    // Unsubscribe from the store
  });
</script>

<!-- Buffered Example -->
<!-- {#await { bufferedResult }}
  <p>...loading</p>
{:then}
  <div class="card query-result-container">
    <div>
      <h1 class="text-2xl">{bufferedResult}</h1>
    </div>
  </div>
{:catch error}
  <div class="card query-result-container">
    <div>
      <h1 class="text-2xl">An error occurred: {error.message}</h1>
    </div>
  </div>
{/await} -->

<form class="mt-2">
  <label for="chat-input" class="sr-only">Enter your prompt</label>
  <div class="relative">
    <button
      type="button"
      class="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500 hover:text-blue-600 dark:text-stone-400 dark:hover:text-blue-600"
    >
      <svg
        aria-hidden="true"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
        ></path>
        <path d="M5 10a7 7 0 0 0 14 0"></path>
        <path d="M8 21l8 0"></path>
        <path d="M12 17l0 4"></path>
      </svg>
      <span class="sr-only">Use voice input</span>
    </button>
    <textarea
      id="chat-input"
      on:keydown={checkForEnter}
      class="block w-full resize-none rounded-xl border-none bg-stone-200 p-4 pl-10 pr-20 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-stone-800 dark:text-stone-200 dark:placeholder-stone-400 dark:focus:ring-blue-500 sm:text-base"
      placeholder="Enter your prompt"
      bind:value={prompt}
      rows="1"
      required
    ></textarea>
    <button
      on:submit={performQuery}
      type="submit"
      class="absolute bottom-2 right-2.5 rounded-lg bg-stone-200 px-4 py-2 text-sm font-medium text-stone-200 hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-300 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800 sm:text-base"
    >
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</form>
