<script lang="ts">
  import { settingsStore } from "../../stores/Store";
  let wordCounts = getWordCounts();

  function getWordCounts(): Array<number> {
    const amounts: Array<number> = [10, 20, 50, 100];
    return amounts;
  }

  function matchesStore(count: number): boolean {
    return count == $settingsStore.wordCount;
  }

  function changeWordCount(newCount: number) {
    let newSettings = {...$settingsStore};
    newSettings.wordCount = newCount;
    settingsStore.set(newSettings);

    wordCounts = getWordCounts(); // workaround to update #each call below
  }
</script>

<ul class="font-mono w-full flex flex-row space-x-2">
  <li>words</li>
  {#each wordCounts as count}
    <li class={matchesStore(count) ? "font-bold " : "" + "hover:font-bold"}>
      <button on:click={() => changeWordCount(count)}>
        {count}
      </button>
    </li>
  {/each}
</ul>
