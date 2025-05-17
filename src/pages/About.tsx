import HorizontalLine from "../components/HorizontalLine";
import SubTopic from "../components/SubTopic";
import Topic from "../components/Topic";
import Layout from "../containers/Layout";

const About = () => {
  return (
    <Layout id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Added padding for better mobile view */}
        <Topic>About Me</Topic> {/* Slightly adjusted topic */}
        <SubTopic>The Journey: From Marketing to Code</SubTopic>{" "}
        {/* More descriptive subtopic */}
        <HorizontalLine />
        <div className="flex flex-col md:flex-row items-center gap-12 my-12">
          {" "}
          {/* Improved layout with flexbox for responsiveness */}
          {/* Visual Element: Placeholder for an image or illustration */}
          <div className="w-full md:w-1/2 flex justify-center">
            {/* Replace with an actual image or illustration */}
            <img
              src="/profile.png" // Assuming a profile image exists in public/
              alt="Profile Illustration"
              className="rounded-full w-64 h-64 object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 text-left text-lg text-white/80">
            {" "}
            {/* Adjusted text color for better contrast */}
            <p className="mb-6">
              My career began in the dynamic world of marketing, where I honed
              skills in understanding user needs, crafting compelling
              narratives, and strategizing for impact. While successful, I found
              myself increasingly drawn to the technical side – the 'how' behind
              digital experiences.
            </p>
            <p className="mb-6">
              This curiosity sparked a transition. I immersed myself in learning
              development, discovering a passion for problem-solving through
              code. The analytical thinking from marketing proved invaluable,
              now applied to building robust and elegant software solutions.
            </p>
            <p className="mb-6">
              Today, I blend my marketing acumen with technical expertise to
              create user-centric applications. I understand the importance of
              both form and function, ensuring that every project not only works
              flawlessly but also resonates with its intended audience.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
