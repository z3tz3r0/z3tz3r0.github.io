import EmailTemplate from "@/widgets/contact/ui/EmailTemplate";
import { Button } from "@heroui/react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Resend } from "resend";
import { toast } from "sonner";
import HorizontalLine from "@/shared/ui/horizontal-line/HorizontalLine";
import InputContact from "@/widgets/contact/ui/InputContact";
import SubTopic from "@/shared/ui/subtopic/SubTopic";
import Topic from "@/shared/ui/topic/Topic";
import Layout from "@/shared/ui/layout/Layout";

function Contact() {
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
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    const limitedNumericValue = numericValue.slice(0, 10);

    setEmailForm((prev) => ({
      ...prev,
      phone: limitedNumericValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resend) {
      toast.error("Error", {
        description: "Email cannot be send",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await resend.emails.send({
        from: "Your Website Contact Form <onboarding@resend.dev>",
        to: ["kittipan.wang@gmail.com"],
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
    <Layout id="contact" className="bg-muted/10">
      <div className="max-w-xl mx-auto text-center">
        <Topic>Contact</Topic>
        <SubTopic>I'd Love to Hear From You</SubTopic>
        <div className="mb-10">
          <HorizontalLine />
        </div>
        <p className="text-lg text-foreground/80 mb-10">
          Whether you have a project idea, a question, or just want to connect,
          feel free to reach out. I'm always open to discussing new
          opportunities and collaborations.
        </p>
        <SubTopic>Let's Contact</SubTopic>
        <form onSubmit={handleSubmit}>
          <InputContact type="text" label="Full Name" name="name" value={emailForm.name} onChange={handleInputChange} />
          <InputContact type="email" label="Email" name="email" value={emailForm.email} onChange={handleInputChange} />
          <InputContact type="tel" label="Phone Number" name="phone" value={emailForm.phone} onChange={handlePhoneChange} />
          <InputContact type="textarea" label="Message" name="message" value={emailForm.message} onChange={handleInputChange} />
          {!isSubmitting ? (
            <Button type="submit">Send Message</Button>
          ) : (
            <Button isDisabled>
              <Loader2 className="animate-spin" />
              Send Message
            </Button>
          )}
        </form>
        <p className="text-sm text-muted-foreground mt-12">
          I typically respond within 24-48 hours. You can also find me on my
          social platforms linked in the footer.
        </p>
      </div>
    </Layout>
  );
}

export default Contact;
