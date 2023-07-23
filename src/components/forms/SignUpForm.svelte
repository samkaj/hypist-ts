<script lang="ts">
  import { onMount } from "svelte";
  import {
    isEmailUnique,
    isNameUnique,
    signUp,
  } from "../../consumers/SignUpConsumer";
  import EmailInput from "./EmailInput.svelte";
  import Form from "./Form.svelte";
  import NameInput from "./NameInput.svelte";
  import PasswordInput from "./PasswordInput.svelte";
  import SubmitInput from "./SubmitInput.svelte";
  import { userStore } from "../../stores/Store";
  const nameId = "name";
  const emailId = "email";
  const passwordId = "password";
  let nameIsAvailable: boolean = true;
  let emailIsAvailable: boolean = true;
  let unexpectedErrorOccured: boolean = false;
  function trySignUp() {
    const name = document.getElementById(nameId) as HTMLInputElement;
    const email = document.getElementById(emailId) as HTMLInputElement;
    const password = document.getElementById(passwordId) as HTMLInputElement;

    Promise.all([
      isNameUnique(name.value ?? ""),
      isEmailUnique(email.value ?? ""),
    ]).then((values) => {
      nameIsAvailable = values[0];
      emailIsAvailable = values[1];
    });

    if (!nameIsAvailable || !emailIsAvailable) {
      return;
    }

    signUp({
      name: name.value,
      email: email.value,
      password: password.value,
    })
      .then(() => {
        window.location.href = "/signin";
      })
      .catch(() => {
        unexpectedErrorOccured = true;
      });
  }

  onMount(() => {
    if ($userStore) {
      window.location.href = "/";
    }
  });
</script>

<Form
  title="Create an account"
  description="Become a better typist."
  submit={trySignUp}
>
  {#if unexpectedErrorOccured}
    <p class="italic text-sm mt-2 px-2 text-red-400">
      An unexpected error occured, try again later
    </p>
  {/if}

  <NameInput {nameId} />
  {#if !nameIsAvailable}
    <p class="italic text-sm mt-2 px-2 text-red-400">
      Name unavailable, try another
    </p>
  {/if}
  <EmailInput {emailId} />
  {#if !emailIsAvailable}
    <p class="italic text-sm mt-2 px-2 text-red-400">
      Email unavailable, try another or sign in
    </p>
  {/if}
  <PasswordInput {passwordId} />
  <SubmitInput text="Create account" />
  <hr class="mt-4 mb-2" />
  <p class="text-center text-gray-600 text-sm mt-4">
    Already got an account?
    <a
      class="ease-in-out duration-150 text-indigo-300 hover:text-indigo-400 font-bold"
      href="/signin"
    >
      Sign in
    </a>
  </p>
</Form>
