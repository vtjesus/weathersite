import { Typewriter } from "react-simple-typewriter";
const TyperWriter = () => {
  const wellcome: string[] = ["Wellcome to Weather site"];

  return (
    <>
      <Typewriter
        words={wellcome}
        loop={true}
        cursor={true}
        cursorStyle="📍"
        typeSpeed={85}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </>
  );
};

export default TyperWriter;
