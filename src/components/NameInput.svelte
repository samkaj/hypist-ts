<script lang="ts">
  import Input from "./Input.svelte";
  let username: string = "";

  function validateUsername(): string {
    return username.length > 3 ? "" : "Too short.";
  }
</script>

<Input
  bind:val={username}
  label="Username"
  id="username"
  type="text"
  validate={validateUsername}
  placeholder="Username"
/>
