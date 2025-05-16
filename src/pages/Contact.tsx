import EmailTemplate from "@/components/EmailTemplate";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Resend } from "resend";
import { toast } from "sonner";
import InputContact from "../components/InputContact";
import SubTopic from "../components/SubTopic";
import Layout from "../containers/Layout";

const Contact = () => {
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resendApiKey = import.meta.env.VITE_RESEND_EMAIL_API;
  const resend = resendApiKey ? new Resend(resendApiKey) : null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Remove any character that is NOT a digit (0-9)
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    const limitedNumericValue = numericValue.slice(0, 10);

    setEmailForm((prev) => ({
      ...prev,
      phone: limitedNumericValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here (fetch to Formspree or API)
    // TODO : setError if resend doesn't exist using toast
    if (!resend) {
      toast.error("Error", {
        description: "Email cannot be send",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await resend.emails.send({
        from: "Your Website Contact Form <onboarding@resend.dev>",
        to: "kittipan.wang@gmail.com",
        subject: `New contact Form Submission from ${emailForm.name}`,
        replyTo: emailForm.email,
        react: (
          <EmailTemplate
            fullName={emailForm.name}
            email={emailForm.email}
            phone={emailForm.phone}
            message={emailForm.message}
          />
        ),
      });

      if (error) {
        toast.error("Error", {
          description: error.message || "An unkown error occurred.",
        });
        return;
      }
      toast.success("Success", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setEmailForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error("Submission Failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout id="contact" className="bg-white/5">
      <div className="max-w-7xl mx-auto">
        <SubTopic>Let's Contact</SubTopic>
        <form onSubmit={handleSubmit}>
          <InputContact
            type="text"
            label="Full Name"
            name="name"
            value={emailForm.name}
            onChange={handleInputChange}
          />
          <InputContact
            type="email"
            label="Email"
            name="email"
            value={emailForm.email}
            onChange={handleInputChange}
          />
          <InputContact
            type="tel"
            label="Phone Number"
            name="phone"
            value={emailForm.phone}
            onChange={handlePhoneChange}
          />
          <InputContact
            type="textarea"
            label="Message"
            name="message"
            value={emailForm.message}
            onChange={handleInputChange}
          />
          {!isSubmitting ? (
            <Button type="submit">Send Message</Button>
          ) : (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Send Message
            </Button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
