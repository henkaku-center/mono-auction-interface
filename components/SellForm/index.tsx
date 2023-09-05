"use client";

import "react-datepicker/dist/react-datepicker.css";
import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useUploadImageFile, useUploadMetadataJson } from "@/hooks/usePinata";
import { SellInput, SellTextarea } from "../Inputs";
import { FormData } from "@/types";

const SellForm: FC = () => {
  const [imageIPFSHash, setImageIPFSHash] = useState<string>("");
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const watchedStartDate: Date | undefined = watch("startDate");
  const uploadFile = useUploadImageFile();
  // const uploadMetadata = useUploadMetadataJson();

  const validateFileSize = (file: File | null, limit: number) => {
    if (!file) return true;
    return file.size / (1024 * 1024) > limit ? `Upto ${limit}MB` : true;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const {
        productName,
        image,
        description,
        rule,
        minimumCost,
        allocationAddress,
        allocationPercentage,
        startDate,
        endDate,
      } = data;
      console.log(
        productName,
        image,
        description,
        rule,
        minimumCost,
        allocationAddress,
        allocationPercentage,
        startDate,
        endDate
      );
      if (image) {
        const newImageIPFSHash = await uploadFile(image);
        setImageIPFSHash(newImageIPFSHash);
        console.log(newImageIPFSHash);
      } else {
        console.warn("No image to upload");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <VStack w={["100%", "82%"]} spacing="5%" align="start">
        <Box p={4}>
          <Heading as="h1" noOfLines={1} mb={5}>
            商品を出品する
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <SellInput
              id="productName"
              label="商品名"
              type="text"
              control={control}
              rules={{ required: "This field is required" }}
              placeholder="商品名"
              register={register}
              registerName="productName"
              error={errors.productName}
              width={["240px", "360px"]}
            />

            <FormControl isRequired>
              <Grid templateColumns="repeat(5, 1fr)" mb={5}>
                <GridItem colSpan={1.5}>
                  <FormLabel htmlFor="imageFile" id="imageFile">
                    {"商品画像"}
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={3}>
                  <Controller
                    control={control}
                    name="image"
                    rules={{
                      required: "REQUIRED_INPUT",
                      validate: (v) => validateFileSize(v, 3),
                    }}
                    render={({ field: { onChange }, fieldState }) => (
                      <>
                        <Input
                          variant="unstyled"
                          p={1}
                          id="imageFile"
                          type="file"
                          accept={"image/*"}
                          isRequired={true}
                          onChange={(e) =>
                            e.target.files && e.target.files[0].size
                              ? onChange(e.target.files[0])
                              : false
                          }
                        />
                        <Box color="red.300">{fieldState.error?.message}</Box>
                      </>
                    )}
                  />
                </GridItem>
              </Grid>
            </FormControl>

            <SellTextarea
              id="description"
              label="説明文"
              control={control}
              rules={{ required: "This field is required" }}
              placeholder="説明文を入力してください"
              register={register}
              registerName="description"
              error={errors.description}
              width={["240px", "360px"]}
            />

            <SellTextarea
              id="rule"
              label="ルール"
              control={control}
              rules={{
                required: "This field is required",
              }}
              placeholder="説明文を入力してください"
              register={register}
              registerName="rule"
              error={errors.rule}
              width={["240px", "360px"]}
            />

            <SellInput
              id="minimumCost"
              label="最低落札価格"
              type="number"
              control={control}
              rules={{
                required: "This field is required",
                validate: (value: string) => {
                  const num = parseFloat(value);
                  if (num < 0) {
                    return "The number must be greater than or equal to 0";
                  }
                  return true;
                },
              }}
              placeholder="300"
              register={register}
              registerName="minimumCost"
              error={errors.minimumCost}
              width={["120px", "240px"]}
              unit="円"
            />

            <SellInput
              id="allocationAddress"
              label="配分アドレス"
              type="email"
              control={control}
              rules={{
                required: "This field is required",
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              }}
              placeholder="アドレス"
              register={register}
              registerName="allocationAddress"
              error={errors.allocationAddress}
              width={["240px", "360px"]}
            />

            <SellInput
              id="allocationPercentage"
              label="配分割合"
              type="number"
              control={control}
              rules={{
                required: "This field is required",
                validate: (value: string) => {
                  const num = parseFloat(value);
                  if (num < 0) {
                    return "The number must be greater than or equal to 0";
                  }
                  return true;
                },
              }}
              placeholder="30"
              register={register}
              registerName="allocationPercentage"
              error={errors.allocationPercentage}
              width={["120px", "240px"]}
              unit="%"
            />

            <SellInput
              id="startDate"
              label="販売開始日"
              type="date"
              control={control}
              rules={{
                required: "This field is required",
                validate: (value: Date) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  selectedDate.setHours(0, 0, 0, 0);
                  return (
                    selectedDate >= today || "The date must be after today"
                  );
                },
              }}
              placeholder="開始日"
              register={register}
              registerName="startDate"
              error={errors.startDate}
            />

            <SellInput
              id="endDate"
              label="販売終了日"
              type="date"
              control={control}
              rules={{
                required: "This field is required",
                validate: (value: Date) => {
                  if (!watchedStartDate) {
                    return "The start date must be set before setting the end date";
                  }
                  const endDate = new Date(value);
                  const startDate = new Date(watchedStartDate);
                  endDate.setHours(0, 0, 0, 0);
                  startDate.setHours(0, 0, 0, 0);
                  return (
                    endDate >= startDate ||
                    "The end date must be after the start date"
                  );
                },
              }}
              placeholder="終了日"
              register={register}
              registerName="endDate"
              error={errors.endDate}
            />

            <Center>
              <Button type="submit">出品する</Button>
            </Center>
          </form>
        </Box>
      </VStack>
    </>
  );
};

export default SellForm;
