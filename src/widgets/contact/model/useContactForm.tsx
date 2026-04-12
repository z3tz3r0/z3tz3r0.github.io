import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useState } from "react";
import { EmailTemplate } from "@/widgets/contact/ui/EmailTemplate";
import { Resend } from "resend";
import { toast } from "sonner";

const PHONE_MAX_LENGTH = 10;

interface EmailFormState {
  email: string;
  message: string;
  name: string;
  phone: string;
}

const INITIAL_FORM_STATE: EmailFormState = {
  email: "",
  message: "",
  name: "",
  phone: "",
};

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) { return err.message; }
  return "An unexpected error occurred.";
};

const createResendClient = (): Resend | null => {
  const resendApiKey = import.meta.env.VITE_RESEND_EMAIL_API;
  if (resendApiKey) {
    return new Resend(resendApiKey);
  }
  return null;
};

interface ContactFormReturn {
  emailForm: EmailFormState;
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePhoneChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
}

const useContactForm = (): ContactFormReturn => {
  const [emailForm, setEmailForm] = useState<EmailFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const resend = createResendClient();

  const handleInputChange = useCallback((
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handlePhoneChange = useCallback((
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    const limitedValue = numericValue.slice(0, PHONE_MAX_LENGTH);
    setEmailForm((prev) => ({ ...prev, phone: limitedValue }));
  }, []);

  const sendEmail = useCallback(async (): Promise<void> => {
    if (!resend) { return; }
    await resend.emails.send({
      from: "Your Website Contact Form <onboarding@resend.dev>",
      react: (
        <EmailTemplate
          email={emailForm.email}
          fullName={emailForm.name}
          message={emailForm.message}
          phone={emailForm.phone}
        />
      ),
      replyTo: emailForm.email,
      subject: `New contact Form Submission from ${emailForm.name}`,
      to: ["kittipan.wang@gmail.com"],
    });
  }, [resend, emailForm.email, emailForm.message, emailForm.name, emailForm.phone]);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!resend) {
      toast.error("Error", { description: "Email cannot be sent" });
      return;
    }
    setIsSubmitting(true);
    try {
      await sendEmail();
      toast.success("Success", { description: "Thank you for reaching out." });
      setEmailForm(INITIAL_FORM_STATE);
    } catch (err) {
      toast.error("Submission Failed", { description: getErrorMessage(err) });
    } finally {
      setIsSubmitting(false);
    }
  }, [resend, sendEmail]);

  return { emailForm, handleInputChange, handlePhoneChange, handleSubmit, isSubmitting };
};

export { useContactForm };
