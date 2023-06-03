<script lang="ts">
  import Input from "./Input.svelte";
  export let emailId: string;
  let email: string = "";

  function validateEmail(): string {
    if (email.length < 1) {
      return "";
    }
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
  id={emailId}
  type="email"
  validate={validateEmail}
  placeholder="example@mail.com"
/>
