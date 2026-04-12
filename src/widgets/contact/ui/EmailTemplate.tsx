import { Heading, Html, Text } from "@react-email/components";
import type { ReactElement } from "react";

interface EmailTemplateProps {
  email: string;
  fullName: string;
  message: string;
  phone: string;
}

const EmailTemplate = ({ email, fullName, message, phone }: EmailTemplateProps): ReactElement => (
  <Html>
    <div>
      <Heading as="h1">New Contact Form Submission</Heading>
      <Text>
        You have received a new message from your website contact form.
      </Text>
      <Heading as="h2">Details:</Heading>
      <ul>
        <li><strong>Full Name:</strong> {fullName}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Phone Number:</strong> {phone}</li>
        <li><strong>Message:</strong></li>
      </ul>
      <Text>{message}</Text>
    </div>
  </Html>
);

export { EmailTemplate };
