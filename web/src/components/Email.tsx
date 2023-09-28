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

export const VercelInviteUserEmail = () => {
  const previewText = `Join sanket on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]"></Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>Strong HuIhuI</strong> on <strong>Vercel</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello boss,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>bukinoshita</strong> (
              <Link
                href={`mailto:ssanket16.patil@gmail.com`}
                className="text-blue-600 no-underline"
              >
                huihui
              </Link>
              ) has invited you to the <strong>Team HuiHui</strong> team on{" "}
              <strong>Vercel</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">Some Image</Column>
                <Column align="center">Another Image</Column>
                <Column align="left">One more iamge</Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for you
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VercelInviteUserEmail;
