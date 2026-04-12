import { Button } from "@heroui/react";
import { HorizontalLine } from "@/shared/ui/horizontal-line/HorizontalLine";
import { InputContact } from "@/widgets/contact/ui/InputContact";
import { Layout } from "@/shared/ui/layout/Layout";
import { Loader2 } from "lucide-react";
import type { ReactElement } from "react";
import { SubTopic } from "@/shared/ui/subtopic/SubTopic";
import { Topic } from "@/shared/ui/topic/Topic";
import { useContactForm } from "@/widgets/contact/model/useContactForm";


const Contact = (): ReactElement => {
  const { emailForm, handleInputChange, handlePhoneChange, handleSubmit, isSubmitting } = useContactForm();

  let submitButton: ReactElement = <Button type="submit">Send Message</Button>;
  if (isSubmitting) {
    submitButton = (
      <Button isDisabled type="button">
        <Loader2 className="animate-spin" />
        Send Message
      </Button>
    );
  }

  return (
    <Layout className="bg-muted/10" id="contact">
      <div className="max-w-xl mx-auto text-center">
        <Topic>Contact</Topic>
        <SubTopic>I&apos;d Love to Hear From You</SubTopic>
        <div className="mb-10">
          <HorizontalLine />
        </div>
        <p className="text-lg text-foreground/80 mb-10">
          Whether you have a project idea, a question, or just want to connect,
          feel free to reach out. I&apos;m always open to discussing new
          opportunities and collaborations.
        </p>
        <SubTopic>Let&apos;s Contact</SubTopic>
        <form onSubmit={handleSubmit}>
          <InputContact label="Full Name" name="name" onChange={handleInputChange} type="text" value={emailForm.name} />
          <InputContact label="Email" name="email" onChange={handleInputChange} type="email" value={emailForm.email} />
          <InputContact label="Phone Number" name="phone" onChange={handlePhoneChange} type="tel" value={emailForm.phone} />
          <InputContact label="Message" name="message" onChange={handleInputChange} type="textarea" value={emailForm.message} />
          {submitButton}
        </form>
        <p className="text-sm text-muted-foreground mt-12">
          I typically respond within 24-48 hours. You can also find me on my
          social platforms linked in the footer.
        </p>
      </div>
    </Layout>
  );
};

export { Contact };
