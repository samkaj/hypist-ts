<script lang="ts">
  import Input from "./Input.svelte";
  let password: string = "";

  function validatePassword(): string {
    if (password.length < 1) {
      return "";
    }
    const errorMessages: string[] = [];
    if (password.length < 8) {
      errorMessages.push("be at least 8 characters long");
    }
    if (password.toLowerCase() === password) {
      errorMessages.push("contain at least one uppercase letter");
    }
    if (password.toUpperCase() === password) {
      errorMessages.push("contain at least one lowercase letter");
    }
    if (!password.match(/\d/)) {
      errorMessages.push("contain at least one number");
    }
    if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      errorMessages.push("contain at least one special character");
    }
    return errorMessages.length > 0 ? `Password must ${joinAndEndWithAnd(errorMessages)}.` : "";
  }

  function joinAndEndWithAnd(words: string[]) {
    return words.join(", ").replace(/, ([^,]*)$/, " and $1");
  }
</script>

<Input
  bind:val={password}
  label="Password"
  id="password"
  type="password"
  validate={validatePassword}
  placeholder="Enter a secure password"
/>
