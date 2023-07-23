import axios from "axios";

// TODO: move to constants file
const backendUri: string = import.meta.env.VITE_BACKEND_URI ?? "";

type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

export async function signUp(formData: SignUpBody): Promise<boolean> {
  return await axios
    .post(`${backendUri}/signup`, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
    .then(() => true)
    .catch(() => false);
}

export async function isNameUnique(name: string): Promise<boolean> {
  return isFieldUnique("name", name, "users");
}

export async function isEmailUnique(email: string): Promise<boolean> {
  return isFieldUnique("email", email, "users");
}

async function isFieldUnique(
  field: string,
  value: string,
  endpoint: string
): Promise<boolean> {
  return await axios
    .head(`${backendUri}/${endpoint}`, JSON.parse(`{${field}: ${value}}`))
    .then(() => false)
    .catch(() => true);
}
