import React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = (props) => {
  const { fullName, email, phone, message } = props;
  return (
    <div>
      <h1>New Contact Form Submission</h1>
      <p>You have received a new message from your website contact form.</p>
      <h2>Details:</h2>
      <ul>
        <li>
          <strong>Full Name:</strong> {fullName}
        </li>
        <li>
          <strong>Email:</strong> {email}
        </li>
        <li>
          <strong>Phone Number:</strong> {phone}
        </li>
        <li>
          <strong>Message:</strong>
        </li>
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default EmailTemplate;
