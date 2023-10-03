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
} from "@react-email/components";
import * as React from "react";

const NewUserEmail = ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const previewText = `${name} , welcome to rfid attendance system...`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>RFID Attendance System</strong>
            </Heading>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              <strong>Hi {name}</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Email: {email}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Password: {password}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                href="http://localhost:3000"
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center border border-solid py-4 px-6"
              >
                Login
              </Link>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              {`${process.env.NEXT_PUBLIC_URL}/auth/sign-in`}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-black text-[14px] leading-[24px]">
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
  );
};

export default NewUserEmail;
