import Image from "next/image";

export const Footer = () => {
  return (
    <div className="text-center text-gray-500 text-sm  py-[10px] fixed bottom-0 left-0 w-full">
      <p>
        <a
          href="http://beian.miit.gov.cn/"
          target="_blank"
          className="flex items-center justify-center"
        >
          <Image
            src="/home/icp.png"
            alt="icp"
            width={16}
            height={16}
            className="mr-2"
          />
          冀ICP备2025099328号-1
        </a>
      </p>
    </div>
  );
};
