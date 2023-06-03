<script lang="ts">
  import { userStore } from "../stores/Store";
</script>

<svelte:head>
  <title>Hypist</title>
</svelte:head>

<h1 class="text-3xl">Hello world!</h1>
{#if $userStore}
  <p>Hi, {$userStore.name}</p>
{:else}
  <a href="/signup">Create an account here</a>
{/if}
