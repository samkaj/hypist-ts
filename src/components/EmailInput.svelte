<script lang="ts">
  import Input from "./Input.svelte";
  let email: string = "";
</script>

<Input 
  bind:val={email}
  label="Email"
  id="email"
  type="email"
  validate={() => "bruh"}
  placeholder="example@mail.com"
/>
