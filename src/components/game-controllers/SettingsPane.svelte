<script lang="ts">
  let timed = false;
  import { settingsStore } from "../../stores/Store";
  import { Gamemode } from "../../models";
  let wordCounts = getWordCounts();
  const separator = " | ";

  function getWordCounts(): Array<number> {
    if (timed) {
      return new Array<number>(10, 15, 30, 60);
    }

    return new Array<number>(10, 20, 50, 100);
  }

  function matchesStore(count: number): boolean {
    if (timed) {
      return count === $settingsStore.duration;
    }
    return count === $settingsStore.wordCount;
  }

  function changeWordCount(newCount: number) {
    let newSettings = { ...$settingsStore };

    if (timed) {
      newSettings.duration = newCount;
      newSettings.gamemode = Gamemode.Timed;
    } else {
      newSettings.wordCount = newCount;
      newSettings.gamemode = Gamemode.Words;
    }

    settingsStore.set(newSettings);

    wordCounts = getWordCounts(); // FIXME: workaround to update #each call below
  }
</script>

<ul class="flex text-center flex-row mx-auto space-x-2 w-fit">
  <li>
    <button
      on:click={() => {
        timed = !timed;
        changeWordCount(
          timed ? $settingsStore.duration : $settingsStore.wordCount
        );
        wordCounts = getWordCounts();
      }}
    >
      {timed ? "timed" : "words"}
    </button>
  </li>
  <li class="select-none">
    {separator}
  </li>
  {#each wordCounts as count}
    <li class={matchesStore(count) ? "font-bold " : "hover:font-bold "}>
      <button on:click={() => changeWordCount(count)}>
        {count}
      </button>
    </li>
  {/each}
</ul>
