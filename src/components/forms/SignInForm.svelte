<script lang="ts">
  import Form from "./Form.svelte";
  import PasswordInput from "./PasswordInput.svelte";
  import SubmitInput from "./SubmitInput.svelte";
  import EmailInput from "./EmailInput.svelte";
  import { signIn } from "../../consumers/SignInConsumer";
  import { onMount } from "svelte";
  import { userStore } from "../../stores/Store";
  let signInSucceeded: boolean = false;
  const emailId = "email";
  const passwordId = "password";

  async function trySignIn() {
    const email = document.getElementById(emailId) as HTMLInputElement;
    const password = document.getElementById(passwordId) as HTMLInputElement;
    signInSucceeded = await signIn({
      email: email.value,
      password: password.value,
    });
    if (signInSucceeded) {
      window.location.href = "/";
    }
  }

  onMount(() => {
    if ($userStore) {
      window.location.href = "/";
    }
  });
</script>

<Form
  title="Sign in"
  description="Get started and track your progress."
  submit={trySignIn}
>
  <EmailInput {emailId} />
  <PasswordInput {passwordId} />
  <SubmitInput text="Sign in" />
  {#if !signInSucceeded}
    <p class="italic text-sm mt-2 px-2 text-red-400">
      Sign in failed, try again or create an account
    </p>
  {/if}
  <hr class="mt-4 mb-2" />
  <p class="text-center text-gray-600 text-sm mt-4">
    Not signed up?
    <a
      class="ease-in-out duration-150 text-indigo-300 hover:text-indigo-400 font-bold"
      href="/signin"
    >
      Create an account
    </a>
  </p>
</Form>
