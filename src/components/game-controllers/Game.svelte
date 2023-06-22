<script lang="ts">
  import { Game } from "../../game/Game";
  import { Word } from "../../game/Word";
  let wordz: Word[] = ["this", "bitch", "empty", "yeet"].map(
    (word) => new Word(word)
  );
  const fooGame = new Game(wordz);

  function handleInput(e: any) {
    const input: string = e.target.value;
    fooGame.handleWord(input);
    wordz = fooGame.words;
    if (input.endsWith(" ")) {
      e.target.value = "";
    }
  }

  function reset() {
    fooGame.reset();
    wordz = fooGame.words;
  }

  function onKeyDown(e: KeyboardEvent) {
    switch(e.key) {
      case "Escape": reset();
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
<input type="text" placeholder="Start writing boy" on:input={handleInput} />
<button
  on:click={() => {
    fooGame.start();
  }}>Start game</button
>
<button
  on:click={() => {
    fooGame.gameOver();
  }}>Game over</button
>
<button
  on:click={() => {
    reset();
  }}>Reset game</button
>
{#each wordz as word}
  <p class={qnd[word.status]}>{word.value}</p>
{/each}

<svelte:window on:keydown|preventDefault={onKeyDown} />
