<script lang="ts">
  import type { Letter } from "../game/Word";
  import { createTimeLimitGame, createWordLimitGame } from "../game/Factory";
  import type { Game } from "../game/Game";
  import { State } from "../game/Word";
  let game: Game;

  function onLoad(): void {
    game = createWordLimitGame(30);
    const start = async () => {
      await tick();
    };

    start();
  }

  function getStyle(letter: Letter) {
    switch (letter.state) {
      case State.INACTIVE:
        return "text-gray-400";
      case State.ACTIVE:
        return "text-gray-900 caret font-medium";
      case State.CORRECT:
        return "text-green-500";
      case State.INCORRECT:
        return "text-red-500";
      case State.EXTRA:
        return "text-blue-500";
    }
  }

  async function tick() {
    game = game;
    setTimeout(tick, 120);
  }

  $: onLoad();
  $: game;

  function onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === "Escape" || key === "Tab") {
      game = createWordLimitGame(4);
      return;
    }
    if (game.game.isOver()) {
      return;
    }
    game.handleInput(key);
    game = game;
  }
</script>

<div class="text-3xl font-mono text-red-500">
  {#each game.game.words as word}
    {#each word.value as w}
      <span class={getStyle(w)}>{w.value}</span>
    {/each}
    <span class="bg-red-400">{word.extra}</span>
  {/each}
</div>

{#if game.game.isOver()}
  <div class="text-3xl font-mono text-red-500">Game Over</div>
{/if}

<svelte:window on:load={onLoad} on:keydown|preventDefault={onKeyDown} />

<style>
  .caret::before {
    color: black;
    content: "_";
    animation: blink 1s infinite;
    position: absolute;
    width: 0;
  }

  .caret {
    transition: width 1s linear;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
