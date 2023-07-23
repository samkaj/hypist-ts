<script lang="ts">
  import { onMount } from "svelte";
  import { Game } from "../../game/Game";
  import type { Word } from "../../game/Word";
  import { Status } from "../../game/Word";
  const game = new Game(10);
  let words: Word[] = game.words;
  let typingInput: HTMLInputElement;
  const statuses = new Map<Status, string>([
    [Status.Inactive, "text-gray-600"],
    [Status.Active, "text-blue-600"],
    [Status.Correct, "text-green-600"],
    [Status.Incorrect, "text-red-600"],
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
    }
  }
</script>

<input
  bind:this={typingInput}
  type="text"
  on:input={handleInput}
  id="typing-input"
/>
<br />
{#each words as word}
  <span class={`text-xl ease-in-out duration-100 ${statuses.get(word.status)}`}
    >{word.value}
  </span>
{/each}

<svelte:window on:keydown={onKeyDown} />
