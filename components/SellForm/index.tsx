"use client";

import "react-datepicker/dist/react-datepicker.css";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Center, Heading, VStack } from "@chakra-ui/react";
import { SellInput, SellTextarea } from "../Inputs";
import { FormData } from "@/types";

const SellForm: FC = () => {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const watchedStartDate: Date | undefined = watch("startDate");

  const onSubmit: SubmitHandler<FormData> = (data) => {
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

            <SellInput
              id="image"
              label="商品画像"
              type="text"
              control={control}
              rules={{ required: "This field is required" }}
              placeholder="商品名"
              register={register}
              registerName="image"
              error={errors.image}
              width={["240px", "360px"]}
            />

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
              label="配分"
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
