"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HostsSection = () => {
  return (
    <section id="hosts" className="relative z-10 h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">
        Hosts
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="flex justify-center items-center">
          <Button
            variant="outline"
            className="rounded-full p-0 w-16 h-16 overflow-hidden border-white hover:border-white/70"
            asChild
          >
            <Link
              href="https://x.com/blessed_ux"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/bless.jpg"
                alt="Blessedux"
                width={64}
                height={64}
                className="object-cover"
              />
            </Link>
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <Button
            variant="outline"
            className="rounded-full p-0 w-16 h-16 overflow-hidden border-white hover:border-white/70"
            asChild
          >
            <Link
              href="https://x.com/deca12x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/deca.jpeg"
                alt="Deca"
                width={64}
                height={64}
                className="object-cover"
              />
            </Link>
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <Button
            variant="outline"
            className="rounded-full p-0 w-16 h-16 overflow-hidden border-white hover:border-white/70"
            asChild
          >
            <Link
              href="https://x.com/_SDAV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/sol.jpg"
                alt="Solene"
                width={64}
                height={64}
                className="object-cover"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}; 