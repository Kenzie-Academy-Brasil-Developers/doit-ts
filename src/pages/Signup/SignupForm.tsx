import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Input } from "../../components/Form/Input";

interface SignupData {
  handleSignup: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignup,
  errors,
  register,
  loading,
}: SignupData) => (
  <Grid
    onSubmit={handleSignup}
    as="form"
    padding="40px 25px"
    border="3px solid"
    borderColor="gray.100"
    bg="white"
    color="gray.900"
    mt={["4", "4", "0"]}
    w={["100%", "100%", "40%", "40%"]}
  >
    <Heading size="lg">Crie sua conta</Heading>
    <VStack mt="6" spacing="5">
      <Input
        placeholder="Digite seu nome"
        label="Nome"
        error={errors.name}
        icon={FaUser}
        {...register("name")}
      />
      <Box w="100%">
        <Input
          placeholder="Digite seu login"
          type="email"
          label="Login"
          error={errors.email}
          icon={FaEnvelope}
          {...register("email")}
        />
        {!errors.email && (
          <Text ml="1" mt="1" color="gray.300">
            Exemplo: nome@email.com
          </Text>
        )}
      </Box>
      <Input
        type="password"
        placeholder="Digite sua senha"
        label="Senha"
        error={errors.password}
        icon={FaLock}
        {...register("password")}
      />
      <Input
        type="password"
        placeholder="Confirme sua senha"
        label="Confirmação de senha"
        error={errors.confirm_password}
        icon={FaLock}
        {...register("confirm_password")}
      />
    </VStack>
    <Button
      mt="8"
      isLoading={loading}
      bg="purple.800"
      w="100%"
      color="white"
      h="60px"
      borderRadius="8px"
      _hover={{
        background: "purple.900",
      }}
      type="submit"
    >
      Finalizar cadastro
    </Button>
  </Grid>
);
