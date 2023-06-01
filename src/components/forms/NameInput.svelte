<script lang="ts">
  import Input from "./Input.svelte";
  let username: string = "";

  function validateUsername(): string {
    const regex: RegExp = /^[a-zA-Z0-9]*$/
    if (!regex.test(username)) {
      return "Name may only contain letters and numbers."
    }
    if (username.length > 32) {
      return "Name may at most be 32 characters long."
    }
    if (username.length < 4) {
      return "Name must be at least be 4 characters long."
    }
    return "";
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
