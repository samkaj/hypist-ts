<script lang="ts">
  import { Game } from "../../game/Game";
  const typingTest = new Game();
  let currentInput: string;

  function handleInput(e: any) {
    const input: string = e.target.value;
    typingTest.handleWord(input);
    if (input.endsWith(" ")) {
      e.target.value = "";
    }
  }

  function reset() {
    typingTest.reset();
    currentInput = "";
  }

  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        reset();
    }
  }

  const qnd = [
    "text-gray-600",
    "text-blue-600",
    "text-green-600",
    "text-red-600",
  ];
</script>

<h1>This is game</h1>
<input
  type="text"
  bind:value={currentInput}
  on:input={handleInput}
/>
<button
  on:click={() => {
    typingTest.start();
  }}>Start game</button
>
<button
  on:click={() => {
    typingTest.gameOver();
  }}>Game over</button
>
<button
  on:click={() => {
    reset();
  }}>Reset game</button
>
{#each typingTest.words as word}
  <p class={qnd[word.status]}>{word.value}</p>
{/each}

<svelte:window on:keydown={onKeyDown} />
