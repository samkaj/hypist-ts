<script lang="ts">
  import Input from "./Input.svelte";
  let email: string = "";

  function validateEmail(): string {
    const elem = document.getElementById("email") as HTMLObjectElement;
    if (!elem.checkValidity()) {
      return "Enter a valid email address.";
    }
    return "";
  }
</script>

<Input
  bind:val={email}
  label="Email"
  id="email"
  type="email"
  validate={validateEmail}
  placeholder="example@mail.com"
/>
