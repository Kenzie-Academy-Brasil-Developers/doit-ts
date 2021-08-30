import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import { FaExclamation } from "react-icons/fa";

import { useState, useEffect, useCallback, useRef } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

export const Input = ({
  name,
  error = null,
  icon: Icon,
  label,
  ...rest
}: InputProps) => {
  return (
    <FormControl>
      {!!label && <FormLabel>{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement mt="2.5">
            <Icon />
          </InputLeftElement>
        )}

        <ChakraInput
          name={name}
          bg="gray.50"
          variant="outline"
          _hover={{ bgColor: "gray.100" }}
          _placeholder={{ color: "gray.300" }}
          size="lg"
          h="60px"
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};
