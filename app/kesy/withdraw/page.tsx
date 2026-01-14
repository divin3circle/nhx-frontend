"use client";

import { fin1, kesy } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { WithdrawForm } from "@/components/withdraw-form";

export default function WithdrawPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 font-noto-sans">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <div className="w-full flex items-center justify-between px-4">
            <Link
              href="/kesy"
              className="flex items-center justify-center gap-2"
            >
              <Image
                src={kesy}
                alt="logo"
                width={35}
                height={35}
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-3xl font-medieval-sharp font-bold text-foreground">
                KESY
              </h1>
            </Link>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-col flex-1  justify-center ">
          <div className="w-full">
            <div className="">
              <h1 className="text-2xl font-funnel-display font-bold text-foreground">
                Withdraw KESY Tokens
              </h1>
              <p className="text-sm font-funnel-display text-muted-foreground max-w-md">
                Complete the form below to request a withdrawal. Share your wire
                transfer details and transfer KESY tokens to complete the
                request.
              </p>
            </div>
          </div>
          <div className="rounded-3xl py-2 mt-4 w-full max-w-md">
            <div className="flex flex-col gap-4 p-4">
              <WithdrawForm />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-funnel-display text-muted-foreground max-w-md">
              Please note that the wire transfer may take up to 24 hours to
              complete, and 2-3 business days for NHX Finance reserves to
              confirm the withdrawal.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={fin1}
          alt="Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
