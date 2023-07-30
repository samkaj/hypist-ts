<script lang="ts">
  import SettingsPane from "./SettingsPane.svelte";
  import { onDestroy, onMount } from "svelte";
  import { Game } from "../../game/Game";
  import type { Word } from "../../game/Word";
  import { Status } from "../../game/Word";
  import { settingsStore } from "../../stores/Store";

  let game = new Game($settingsStore.wordCount);
  let typingInput: HTMLInputElement;
  let words: Word[] = game.words;

  const unsubscribe = settingsStore.subscribe((newSettings) => {
    if (newSettings.wordCount !== game.words.length) {
      game.setWordCount(newSettings.wordCount);
      reset();
    }
  });

  onDestroy(unsubscribe);

  const statuses = new Map<Status, string>([
    [Status.Inactive, "text-gray-400"],
    [Status.Active, "text-gray-600"],
    [Status.Correct, "text-green-400"],
    [Status.Incorrect, "text-red-400"],
  ]);

  onMount(() => typingInput.focus());

  function handleInput(e: any) {
    let input: string = e.target.value;
    if (input.trim() === "") {
      e.target.value = "";
      return;
    }

    if (!game.isStarted) {
      game.start();
    }

    if (game.isLastWordAndCorrect(input)) {
      input += " ";
    }

    game.handleWord(input);
    if (input.endsWith(" ")) {
      e.target.value = "";
    }
    words = game.words;
  }

  function reset() {
    game.reset();
    words = game.words;
    typingInput.value = "";
  }

  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        reset();
      default:
        if (typingInput && typingInput !== document.activeElement) {
          typingInput.focus();
        }
    }
  }
</script>

<main class="w-3/4 mx-auto flex flex-col space-y-2 mt-2">
  <SettingsPane />
  <div class="mx-auto bg-gray-100 p-3 rounded-lg">
    {#each words as word}
      <span
        class={`text-xl ease-in-out duration-200 select-none ${statuses.get(
          word.status
        )}`}
        >{word.value + " "}
      </span>
    {/each}
    <input
      bind:this={typingInput}
      type="text"
      on:input={handleInput}
      id="typing-input"
      class="text-xl w-full text-gray-600 p-1 border-none rounded-lg mt-2 focus:ring-transparent focus:outline-none"
    />
  </div>
</main>
<svelte:window on:keydown={onKeyDown} />
