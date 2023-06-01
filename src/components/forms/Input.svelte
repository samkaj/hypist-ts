<script lang="ts">
  export let validate: () => string;
  export let placeholder: string;
  export let type: string;
  export let label: string;
  export let id: string;
  export let val: string;
  let errorMessage: string = "";

  function inputType(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<label class="text-md mt-3 block" for={id}>{label}</label>
<input
  use:inputType
  class="mt-1 w-full block border-1 border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 focus:border-indigo-200"
  name={id}
  on:blur={() => {
    errorMessage = validate();
  }}
  {placeholder}
  bind:value={val}
  id={id}
/>
{#if errorMessage !== ""}
  <p class="ease-in-out italic text-sm mt-2 px-2 text-red-400">{errorMessage}</p>
{/if}
