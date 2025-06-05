import { Button } from "@/components/home/button";
import { Footer } from "@/components/home/footer";
import ThemPhoto from "@/components/home/them-photo";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "home",
  description:
    "Welcome to my personal homepage where I share insights on frontend development, React, technology growth, and life reflections. Explore high-quality blog posts, discover the latest programming tips, and keep progressing every day.",
};

export default function Home() {
  return (
    <>
      <div className="flex items-center w-[80%] mx-auto h-[calc(100dvh-80px)] max-md:flex-col max-md:w-full max-md:justify-center">
        <div className="left w-1/2 max-md:w-full">
          <div className="title">
            <h2
              className="text-4xl font-bold leading-[60px] max-md:text-2xl max-md:leading-[40px] max-md:text-center"
              data-aos="fade-up"
            >
              Enjoy the moment,
              <br /> and keep progressing endlessly
            </h2>
            <div
              className="operator mt-5 max-md:mt-10 max-md:flex max-md:justify-center"
              data-aos="fade-up"
            >
              <Button className="mr-5">
                <Link href="/blog" className="w-full h-full">
                  Go Blog
                </Link>
              </Button>
              <Button>
                <Link href="/about" className="w-full h-full">
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="right w-1/2 max-md:w-full max-md:mt-10">
          <ThemPhoto />
        </div>
      </div>
      <Footer />
    </>
  );
}
