import Image from "next/image";

const ThemPhoto = () => {
  return (
    <Image
      src="/home/light.svg"
      alt="them-photo"
      width={100}
      height={100}
      className="w-full h-auto"
      priority
    />
  );
};

export default ThemPhoto;
