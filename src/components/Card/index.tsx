import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { theme } from "../../styles/theme";

export const Card = () => {
  return (
    <Box
      cursor="pointer"
      _hover={{ transform: "translateY(-7px)", borderColor: "gray.100" }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      borderWidth="1px"
      borderColor="gray.50"
      boxShadow="base"
      padding="7"
      w={["330px", "auto"]}
    >
      <Flex justify="space-between">
        <Heading as="h1" size="md">
          Studying database-driven concepts
        </Heading>
        <HStack spacing="4">
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth="1px"
            borderRadius="5px"
            borderColor="gray.200"
            bgColor="white"
          >
            <FaTrash color={theme.colors.gray[300]} />
          </Center>
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth="1px"
            borderRadius="5px"
            borderColor="gray.200"
            bgColor="white"
          >
            <FaCheck color={theme.colors.gray[300]} />
          </Center>
        </HStack>
      </Flex>

      <Box w="100%" mt="4">
        <Text> Start study through Kenzie app, for 1 hour and a half</Text>
        <Progress colorScheme="purple" mt="2.5" value={10} />
        <Text color="gray.200" mt="3">
          07 March 2021
        </Text>
      </Box>
    </Box>
  );
};
