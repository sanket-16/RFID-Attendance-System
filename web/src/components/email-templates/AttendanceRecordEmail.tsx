import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components"

const AttendanceRecordEmail = ({
  email,
  name,
  message,
}: {
  email: string
  name: string
  message: string
}) => {
  const previewText = `${name} ,your attendance has been marked.`

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
              {message}
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

export default AttendanceRecordEmail
