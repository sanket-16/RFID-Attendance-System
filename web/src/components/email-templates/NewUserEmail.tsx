import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import * as React from "react"

const NewUserEmail = ({
  email,
  name,
  password,
}: {
  email: string
  name: string
  password: string
}) => {
  const previewText = `${name} , welcome to rfid attendance system...`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              <strong>RFID Attendance System</strong>
            </Heading>
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              <strong>Hi {name}</strong>,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Email: {email}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Password: {password}
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Link
                href="http://localhost:3000"
                className="rounded border border-solid bg-[#000000] px-6 py-4 text-center text-[12px] font-semibold text-white no-underline"
              >
                Login
              </Link>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              {`${process.env.NEXT_PUBLIC_URL}/auth/sign-in`}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[14px] leading-[24px] text-black">
              For any queries contact (
              <Link
                href={`mailto:ssanket16.patil@gmail.com`}
                className="text-blue-600 no-underline"
              >
                support
              </Link>
              ) .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default NewUserEmail
