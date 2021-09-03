import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { Header } from "../../components/Header";
import { ModalCreateTask } from "../../components/Modal/ModalCreateTask";

export const FirstTask = () => {
  const {
    isOpen: isCreateTaskOpen,
    onOpen: onCreateTaskOpen,
    onClose: onCreateTaskClose,
  } = useDisclosure();
  return (
    <>
      <ModalCreateTask isOpen={isCreateTaskOpen} onClose={onCreateTaskClose} />
      <Header />
      <Box
        mt="4"
        w="90vw"
        paddingY="16"
        paddingX={["6", "0"]}
        ml="5vw"
        justifyContent="center"
        textAlign="center"
        borderWidth="2px"
        borderColor="gray.200"
        borderStyle="dashed"
      >
        <Center fontSize="5xl">
          <FaClipboard color="#bdbdbd" />
        </Center>
        <Heading fontSize="4xl" as="h1" mt="4">
          Vamos criar sua primeira tarefa
        </Heading>
        <Text color="gray.400" mt="6">
          Insira sua meta e mostra a você mesmo <br />
          capacidade em cumprir{" "}
          <Text fontWeight="bold" display="inline-block" color="gray.900">
            suas atividades
          </Text>
        </Text>

        <Button
          padding="6"
          mt="6"
          bgColor="purple.800"
          color="white"
          _hover={{ bg: "purple.900 " }}
          onClick={onCreateTaskOpen}
        >
          Criar sua primeira tarefa
        </Button>
      </Box>
    </>
  );
};
