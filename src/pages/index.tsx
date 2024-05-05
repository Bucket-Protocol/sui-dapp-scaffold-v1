import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import BasicContainer from "@/components/containers/basicContainer";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={cn(
        "relative w-full min-h-svh h-full max-w-360 flex flex-col items-center justify-center mx-auto py-5 px-4",
        inter.className
      )}
    >
      <Header />
      <BasicContainer />
      <Footer />
    </main>
  );
}
