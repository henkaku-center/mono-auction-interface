'use client'

import 'react-datepicker/dist/react-datepicker.css'
import { FC, useState } from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useUploadImageFile, useUploadMetadataJson } from '@/hooks/usePinata'
import { MonoNFTRegisterFormData } from '@/types'
import { useRegisterMonoNFT } from '@/hooks/useMonoNFT'

const SellForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MonoNFTRegisterFormData>({
    defaultValues: {
      name: '',
      image: null,
      description: '',
      rule: '',
      donor: '',
      expiresDuration: 0,
      sharesOfCommunityToken: [{ shareHolder: '', shareRatio: 0 }],
      owner: '',
    },
  })
  const {
    fields: revenueSharingFields,
    append: revenueSharingAppend,
    remove: revenueSharingRemove,
  } = useFieldArray({
    control,
    name: 'sharesOfCommunityToken',
  })

  const uploadFile = useUploadImageFile()
  const uploadMetadata = useUploadMetadataJson()
  const { registerMonoNFT } = useRegisterMonoNFT()

  const validateFileSize = (file: File | null, limit: number) => {
    if (!file) return true
    return file.size / (1024 * 1024) > limit ? `Upto ${limit}MB` : true
  }

  const onSubmit: SubmitHandler<MonoNFTRegisterFormData> = async (data) => {
    try {
      if (data.image) {
        const newImageIPFSHash = await uploadFile(data.image)
        const metadata = {
          name: data.name,
          description: data.description,
          image: `ipfs://${newImageIPFSHash}`,
          rule: data.rule,
        }
        const newMetadataIPFSHash = await uploadMetadata(metadata)
        await registerMonoNFT(
          data.donor,
          data.expiresDuration,
          `ipfs://${newMetadataIPFSHash}`,
          data.sharesOfCommunityToken,
          data.owner
        )
      } else {
        console.warn('No image to upload')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Container>
      <Box p={4}>
        <Heading as="h1" noOfLines={1} mb={5}>
          商品を出品する
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mb={5} isRequired>
                <Grid templateColumns="repeat(5, 1fr)">
                  <GridItem colSpan={1.5}>
                    <FormLabel>商品名</FormLabel>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Input
                      onChange={field.onChange}
                      value={field.value}
                      mr={2}
                      placeholder="商品名"
                    />
                    {error && (
                      <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                  </GridItem>
                </Grid>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="image"
            rules={{
              required: '必須項目です',
              validate: (v) => validateFileSize(v, 3),
            }}
            render={({ field: { onChange }, fieldState }) => (
              <FormControl isRequired>
                <Grid templateColumns="repeat(5, 1fr)" mb={5}>
                  <GridItem colSpan={1.5}>
                    <FormLabel htmlFor="imageFile" id="imageFile">
                      {'商品画像'}
                    </FormLabel>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <>
                      <Input
                        variant="unstyled"
                        p={1}
                        id="imageFile"
                        type="file"
                        accept={'image/*'}
                        isRequired={true}
                        onChange={(e) =>
                          e.target.files && e.target.files[0].size
                            ? onChange(e.target.files[0])
                            : false
                        }
                      />
                      <Box color="red.300">{fieldState.error?.message}</Box>
                    </>
                  </GridItem>
                </Grid>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mb={5} isRequired>
                <Grid templateColumns="repeat(5, 1fr)">
                  <GridItem colSpan={1.5}>
                    <FormLabel>説明文</FormLabel>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Textarea
                      onChange={field.onChange}
                      value={field.value}
                      mr={2}
                      placeholder="説明文"
                    />
                    {error && (
                      <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                  </GridItem>
                </Grid>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="rule"
            render={({ field, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mb={5} isRequired>
                <Grid templateColumns="repeat(5, 1fr)">
                  <GridItem colSpan={1.5}>
                    <FormLabel>ルール</FormLabel>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Textarea
                      onChange={field.onChange}
                      value={field.value}
                      mr={2}
                      placeholder="ルール"
                    />
                    {error && (
                      <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                  </GridItem>
                </Grid>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="donor"
            render={({ field, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mb={5} isRequired>
                <Grid templateColumns="repeat(5, 1fr)">
                  <GridItem colSpan={1.5}>
                    <FormLabel>寄附者</FormLabel>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Input
                      onChange={field.onChange}
                      value={field.value}
                      mr={2}
                      placeholder="0xabc1234..."
                    />
                    {error && (
                      <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                  </GridItem>
                </Grid>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="owner"
            render={({ field, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mb={5} isRequired>
                <Grid templateColumns="repeat(5, 1fr)">
                  <GridItem colSpan={1.5}>
                    <FormLabel>オーナー</FormLabel>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Input
                      onChange={field.onChange}
                      value={field.value}
                      mr={2}
                      placeholder="0xabc1234..."
                    />
                    {error && (
                      <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                  </GridItem>
                </Grid>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="expiresDuration"
            render={({ field, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mb={5} isRequired>
                <Grid gridTemplateColumns="auto 1fr" gap={3}>
                  <GridItem>
                    <FormLabel>使用期限（日）</FormLabel>
                  </GridItem>
                  <GridItem>
                    <Input
                      type="number"
                      onChange={field.onChange}
                      value={field.value}
                    />
                    {error && (
                      <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                  </GridItem>
                </Grid>
              </FormControl>
            )}
          />

          <Text>売上分配</Text>
          {revenueSharingFields.map((field, index) => (
            <Flex justifyContent="flex-end" key={field.id} mb={2}>
              <Controller
                control={control}
                name={`sharesOfCommunityToken.${index}.shareHolder`}
                rules={{
                  required: '必須項目です',
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      variant="outline"
                      type="text"
                      placeholder="0xabc1234..."
                      value={value}
                      isRequired
                      onChange={(v) => {
                        onChange(v)
                      }}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name={`sharesOfCommunityToken.${index}.shareRatio`}
                rules={{
                  required: '必須項目です',
                }}
                render={({ field: { onChange, value } }) => (
                  <Box>
                    <Flex alignItems="center">
                      <Input
                        variant="outline"
                        type="number"
                        width="60px"
                        ml={2}
                        mr={1}
                        placeholder="0"
                        textAlign="right"
                        value={String(value)}
                        isRequired
                        onChange={(v) => {
                          onChange(v)
                        }}
                      />
                      %
                    </Flex>
                  </Box>
                )}
              />
            </Flex>
          ))}

          <Flex justifyContent="flex-end" gap={2} mb={5}>
            <Button
              colorScheme="white"
              boxShadow="lg"
              onClick={() => {
                revenueSharingFields.length > 1 &&
                  revenueSharingRemove(revenueSharingFields.length - 1)
              }}
            >
              ➖
            </Button>
            <Button
              colorScheme="white"
              boxShadow="lg"
              onClick={() =>
                revenueSharingAppend({ shareHolder: '', shareRatio: 0 })
              }
            >
              ➕
            </Button>
          </Flex>

          <Button width="full" type="submit">
            出品する
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default SellForm
