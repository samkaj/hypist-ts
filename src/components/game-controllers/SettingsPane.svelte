<script lang="ts">
  import { settingsStore } from "../../stores/Store";
  let wordCounts = getWordCounts();
  let wordCountsAreVisible = true;

  function getWordCounts(): Array<number> {
    const amounts: Array<number> = [10, 20, 50, 100];
    return amounts;
  }

  function matchesStore(count: number): boolean {
    return count == $settingsStore.wordCount;
  }

  function changeWordCount(newCount: number) {
    let newSettings = { ...$settingsStore };
    newSettings.wordCount = newCount;
    settingsStore.set(newSettings);

    wordCounts = getWordCounts(); // FIXME: workaround to update #each call below
  }

  function hideIfToggled(): string {
    if (wordCountsAreVisible) {
      return "";
    }
    return "hidden ";
  }
</script>

<ul class="font-mono w-full flex flex-row space-x-2">
  <li>
    <button
      on:click={() => {
        wordCountsAreVisible = !wordCountsAreVisible;
        wordCounts = getWordCounts(); // FIXME: workaround to update #each call below
      }}>words</button
    >
  </li>
  {#each wordCounts as count}
    <li
      class={matchesStore(count)
        ? "font-bold "
        : hideIfToggled() + "hover:font-bold"}
    >
      <button on:click={() => changeWordCount(count)}>
        {count}
      </button>
    </li>
  {/each}
</ul>
