import { Flex, Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useHistory } from "react-router";
import NotFoundImg from "../../assets/notfound.svg";

export const PageNotFound = () => {
  const history = useHistory();
  return (
    <Flex
      padding={["10px 15px", "10 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="space-evenly"
      height={["auto", "auto", "100vh", "100vh"]}
      flexDirection={["column-reverse", "column-reverse", "row", "row"]}
    >
      <Box mt="4">
        <Heading>Oooops!</Heading>
        <Text mt="4">
          Não encontramos a página que você procurou, <br />
          <b>vamos tentar novamente.</b>
        </Text>
        <Button
          mt="4"
          bg="red.600"
          h="60px"
          color="white"
          w="100%"
          _hover={{ bg: "red.700" }}
          onClick={() => history.push("/")}
        >
          Ir para as minhas tarefas
        </Button>
      </Box>
      <Image src={NotFoundImg} />
    </Flex>
  );
};
