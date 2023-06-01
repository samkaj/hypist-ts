<script lang="ts">
  import EmailInput from "./EmailInput.svelte";
  import Form from "./Form.svelte";
  import NameInput from "./NameInput.svelte";
  import PasswordInput from "./PasswordInput.svelte";
  import SubmitInput from "./SubmitInput.svelte";
</script>

<Form
  title="Create an account"
  description="Become a better typist."
  submit={(e) => {
    console.log(e);
  }}
>
  <NameInput />
  <EmailInput />
  <PasswordInput />
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
