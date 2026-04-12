import HorizontalLine from "@/shared/ui/horizontal-line/HorizontalLine";
import SubTopic from "@/shared/ui/subtopic/SubTopic";
import Topic from "@/shared/ui/topic/Topic";
import Layout from "@/shared/ui/layout/Layout";

function ContactMe() {
  const emailAddress = "kittipan.wang@gmail.com";

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
        <SubTopic>Send me an email</SubTopic>
        <a
          href={`mailto:${emailAddress}`}
          className="text-accent hover:underline text-xl"
        >
          {emailAddress}
        </a>
        <p className="text-sm text-muted-foreground mt-12">
          I typically respond within 24-48 hours. You can also find me on my
          social platforms linked in the footer.
        </p>
      </div>
    </Layout>
  );
}

export default ContactMe;
