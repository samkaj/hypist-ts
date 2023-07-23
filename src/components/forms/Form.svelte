<script lang="ts">
  export let submit: (e: SubmitEvent) => void;
  export let title: string;
  export let description: string;
</script>

<main
  class="flex-row shadow-2xl shadow-indigo-100 mx-auto border rounded-md py-4 px-3 max-w-md w-full"
>
  <h1 class="text-3xl text-center my-1">{title}</h1>
  <p class="text-xl text-center text-gray-500">{description}</p>
  <hr class="my-2" />
  <form on:submit|preventDefault={submit}>
    <slot />
  </form>
</main>
