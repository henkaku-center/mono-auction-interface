"use client";

import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import {
  Controller,
  FieldError,
  UseFormRegister,
  Control,
} from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Textarea,
} from "@chakra-ui/react";

interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  control?: Control<any>;
  rules?: {};
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  register?: UseFormRegister<any>;
  registerName: string;
  error?: FieldError;
  width?: string[];
  unit?: string;
}

export const SellInput: FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  control,
  rules,
  onChange,
  onKeyDown,
  register,
  registerName,
  error,
  width,
  unit,
}) => {
  const inputProps = {
    type,
    placeholder,
    value,
    onChange,
    onKeyDown,
    ...(register && registerName ? register(registerName) : {}),
  };

  return (
    <FormControl isInvalid={!!error} mb={5}>
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={1.5}>
          <FormLabel htmlFor={id} id={`${id}-label`}>
            {label}
          </FormLabel>
        </GridItem>
        <GridItem colSpan={3}>
          {control ? (
            <Controller
              control={control}
              name={registerName}
              rules={rules}
              render={({ field }) => (
                <>
                  <Input
                    width={width}
                    {...field}
                    {...inputProps}
                    id={id}
                    mr={2}
                  />
                  {type === "number" && <span>{unit}</span>}
                </>
              )}
            />
          ) : (
            <Input width={["240px", "360px"]} {...inputProps} id={id} />
          )}
          {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </GridItem>
      </Grid>
    </FormControl>
  );
};

interface TextareaProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  register?: UseFormRegister<any>;
  registerName?: string;
  control?: Control<any>;
  rules?: {};
  error?: FieldError;
  width?: string[];
}

export const SellTextarea: FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  value,
  control,
  rules,
  onChange,
  onKeyDown,
  register,
  registerName,
  error,
  width,
}) => {
  const textareaProps = {
    placeholder,
    value,
    onChange,
    onKeyDown,
    ...(register && registerName ? register(registerName) : {}),
  };

  return (
    <FormControl isInvalid={!!error} mb={5}>
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={1}>
          <FormLabel htmlFor={id} id={`${id}-label`}>
            {label}
          </FormLabel>
        </GridItem>
        <GridItem colSpan={4}>
          {control ? (
            <Controller
              control={control}
              name={registerName!}
              rules={rules}
              render={({ field }) => (
                <Textarea width={width} {...field} id={id} />
              )}
            />
          ) : (
            <Textarea width={["240px", "360px"]} {...textareaProps} id={id} />
          )}
          {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </GridItem>
      </Grid>
    </FormControl>
  );
};
