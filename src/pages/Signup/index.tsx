import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";
import { GoBackButton } from "./GoBackButton";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignIn = (data: SignUpData) => {
    console.log(data);
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      padding={["10px 15px", "10 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="center"
      height={["auto", "auto", "100vh", "100vh"]}
      bgGradient={[
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-l, purple.800 65%, white 35%)",
        "linear(to-l, purple.800 65%, white 35%)",
      ]}
      color="white"
    >
      <Flex
        w={["100%", "100%", "90%", "65%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
      >
        {isWideVersion ? (
          <>
            <GoBackButton top="90" left="25" />
            <SignupForm
              errors={errors}
              handleSignup={handleSubmit(handleSignIn)}
              loading={loading}
              register={register}
            />
            <SignupInfo />
          </>
        ) : (
          <>
            <GoBackButton top="10" left="75vw" />
            <SignupInfo />
            <SignupForm
              errors={errors}
              handleSignup={handleSubmit(handleSignIn)}
              loading={loading}
              register={register}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};
