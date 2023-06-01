<script lang="ts">
  import Input from "./Input.svelte";
  let password: string = "";
</script>

<Input 
  bind:val={password}
  label="Password"
  id="password"
  type="password"
  validate={() => "Incomplete password"}
  placeholder="Enter a secure password"
/>
