import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SignUpFormValues } from "@/components/SignUpForm";
import { httpClient } from "../http";
import { toast } from "sonner";

export default function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      return await httpClient.post("/register", data);
    },
    onSuccess: () => {
      toast.success("Login success!");
      router.push("/");
    },
  });
}
