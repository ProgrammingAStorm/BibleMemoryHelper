import pb from "./index";

export default async function login(
  email: string,
  password: string,
  success: (value: any) => void,
  failure: (reason: any) => void
) {
  pb.collection("users")
    .authWithPassword(email, password)
    .then(success)
    .catch(failure);
}
