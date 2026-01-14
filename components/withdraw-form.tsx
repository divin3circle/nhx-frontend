"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { kesy } from "@/assets";
import Image from "next/image";
import "@/components/kesy/styles.css";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import { useKESYAuth } from "@/contexts/KESYContext";
import { useWallets } from "@/hooks/kesy/useWallets";
import {
  WithdrawalFormData,
  useWithdrawalSubmit,
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
} from "@/hooks/kesy/useWithdraw";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// Step 1: Recipient Information
const Step1 = ({
  formData,
  setFormData,
  handleNext,
}: {
  formData: WithdrawalFormData;
  setFormData: (data: WithdrawalFormData) => void;
  handleNext: () => void;
}) => {
  const { isAuthenticated } = useKESYAuth();

  return (
    <div className="flex flex-col justify-between min-h-[400px]">
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-funnel-display font-semibold mb-2">
            Recipient Information
          </h2>
          <p className="text-sm font-funnel-display text-muted-foreground">
            Please provide the recipient's details for the wire transfer
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-funnel-display font-medium mb-2 block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.recipientFullName}
              onChange={(e) =>
                setFormData({ ...formData, recipientFullName: e.target.value })
              }
              className="w-full border border-foreground/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-sm font-funnel-display font-medium mb-2 block">
              Address <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.recipientAddress}
              onChange={(e) =>
                setFormData({ ...formData, recipientAddress: e.target.value })
              }
              className="w-full border border-foreground/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background min-h-[100px]"
              placeholder="123 Main Street, Nairobi, Kenya"
            />
          </div>
        </div>
      </div>

      <Button
        disabled={!validateStep1(formData) || !isAuthenticated}
        className="w-full mt-6 font-funnel-display rounded-3xl"
        onClick={handleNext}
      >
        {isAuthenticated ? (
          <>
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </>
        ) : (
          "Login to Continue"
        )}
      </Button>
    </div>
  );
};

// Step 2: Bank Information
const Step2 = ({
  formData,
  setFormData,
  handleNext,
  handleBack,
}: {
  formData: WithdrawalFormData;
  setFormData: (data: WithdrawalFormData) => void;
  handleNext: () => void;
  handleBack: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between min-h-[400px]">
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-funnel-display font-semibold mb-2">
            Bank Information
          </h2>
          <p className="text-sm font-funnel-display text-muted-foreground">
            Enter the bank details where funds will be sent
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-funnel-display font-medium mb-2 block">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.bankName}
              onChange={(e) =>
                setFormData({ ...formData, bankName: e.target.value })
              }
              className="w-full border border-foreground/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background"
              placeholder="Kenya Commercial Bank"
            />
          </div>

          <div>
            <label className="text-sm font-funnel-display font-medium mb-2 block">
              Bank Address <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.bankAddress}
              onChange={(e) =>
                setFormData({ ...formData, bankAddress: e.target.value })
              }
              className="w-full border border-foreground/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background min-h-[100px]"
              placeholder="KCB Tower, Uhuru Highway, Nairobi"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 mt-6">
        <Button
          variant="outline"
          className="w-full font-funnel-display rounded-3xl"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          disabled={!validateStep2(formData)}
          className="w-full font-funnel-display rounded-3xl"
          onClick={handleNext}
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 3: Account Details
const Step3 = ({
  formData,
  setFormData,
  handleNext,
  handleBack,
}: {
  formData: WithdrawalFormData;
  setFormData: (data: WithdrawalFormData) => void;
  handleNext: () => void;
  handleBack: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between min-h-[400px]">
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-funnel-display font-semibold mb-2">
            Account Details
          </h2>
          <p className="text-sm font-funnel-display text-muted-foreground">
            Provide your account number and SWIFT/BIC code
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-funnel-display font-medium mb-2 block">
              Account Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
              }
              className="w-full border border-foreground/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background"
              placeholder="1234567890"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 8 characters
            </p>
          </div>

          <div>
            <label className="text-sm font-funnel-display font-medium mb-2 block">
              SWIFT/BIC Code <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.swiftBicCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  swiftBicCode: e.target.value.toUpperCase(),
                })
              }
              className="w-full border border-foreground/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background uppercase"
              placeholder="KCBLKENX"
              maxLength={11}
            />
            <p className="text-xs text-muted-foreground mt-1">
              8 or 11 characters (e.g., KCBLKENX or KCBLKENXXXX)
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 mt-6">
        <Button
          variant="outline"
          className="w-full font-funnel-display rounded-3xl"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          disabled={!validateStep3(formData)}
          className="w-full font-funnel-display rounded-3xl"
          onClick={handleNext}
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 4: Confirmation and Transfer
const Step4 = ({
  formData,
  setFormData,
  handleBack,
  handleSubmit,
  isPending,
}: {
  formData: WithdrawalFormData;
  setFormData: (data: WithdrawalFormData) => void;
  handleBack: () => void;
  handleSubmit: () => void;
  isPending: boolean;
}) => {
  const { data: wallets } = useWallets();
  const { fontSize: amountFontSize, textRef: amountTextRef } =
    useDynamicFontSize({
      value: formData.kesyAmount,
      maxFontSize: 48,
      minFontSize: 24,
    });
  const [txnId, setTxnId] = useState("");
  const [isTransferComplete, setIsTransferComplete] = useState(false);

  const handleTransferSimulation = () => {
    // Simulate wallet connection and transfer
    // In production, this would integrate with actual wallet (e.g., Freighter for Stellar)
    if (!formData.kesyAmount || Number(formData.kesyAmount) < 1000) {
      toast.error("Minimum withdrawal amount is 1,000 KESY");
      return;
    }

    // Simulate transaction
    const simulatedTxnId = `TXN-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;
    setTxnId(simulatedTxnId);
    setFormData({ ...formData, txnId: simulatedTxnId });
    setIsTransferComplete(true);
    toast.success("Transfer simulated successfully!", {
      description: `Transaction ID: ${simulatedTxnId}`,
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-[400px]">
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-funnel-display font-semibold mb-2">
            Confirm & Transfer
          </h2>
          <p className="text-sm font-funnel-display text-muted-foreground">
            Review your details and transfer KESY tokens
          </p>
        </div>

        {/* Summary */}
        <div className="bg-foreground/5 border border-foreground/20 rounded-2xl p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Recipient:</span>
            <span className="font-medium">{formData.recipientFullName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Bank:</span>
            <span className="font-medium">{formData.bankName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Account:</span>
            <span className="font-medium">{formData.accountNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">SWIFT/BIC:</span>
            <span className="font-medium">{formData.swiftBicCode}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-foreground/5 border border-foreground/20 rounded-3xl p-4 mb-4">
          <label className="text-sm font-funnel-display text-muted-foreground mb-2 block">
            Amount to Withdraw
          </label>
          <div className="flex items-center justify-between">
            <input
              ref={amountTextRef}
              type="number"
              value={formData.kesyAmount}
              onChange={(e) =>
                setFormData({ ...formData, kesyAmount: e.target.value })
              }
              className="w-[60%] h-12 bg-transparent font-funnel-display placeholder:text-muted-foreground focus:outline-none no-spinners-input border-none shadow-none"
              style={{ fontSize: `${amountFontSize}px` }}
              placeholder="0"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Minimum: 1,000,000 KESY
          </p>
        </div>

        {/* Transfer Button */}
        {!isTransferComplete && (
          <Button
            disabled={!validateStep4(formData)}
            className="w-full mb-4 font-funnel-display rounded-3xl"
            onClick={handleTransferSimulation}
            variant="outline"
          >
            Transfer
          </Button>
        )}

        {/* Transfer Success */}
        {isTransferComplete && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Transfer Complete</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Transaction ID: {txnId}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-2 mt-6">
        <Button
          variant="outline"
          className="w-full font-funnel-display rounded-3xl"
          onClick={handleBack}
          disabled={isPending}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          disabled={!isTransferComplete || isPending}
          className="w-full font-funnel-display rounded-3xl"
          onClick={handleSubmit}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Submit Withdrawal"
          )}
        </Button>
      </div>
    </div>
  );
};

// Main Withdraw Form Component
export function WithdrawForm({ className }: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState<WithdrawalFormData>({
    recipientFullName: "",
    recipientAddress: "",
    bankName: "",
    bankAddress: "",
    accountNumber: "",
    swiftBicCode: "",
    kesyAmount: "0",
    walletId: "",
  });
  const [step, setStep] = useState(1);
  const { mutate: submitWithdrawal, isPending } = useWithdrawalSubmit();
  const router = useRouter();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.txnId) {
      toast.error("Please complete the transfer first");
      return;
    }

    submitWithdrawal(
      {
        recipientFullName: formData.recipientFullName,
        recipientAddress: formData.recipientAddress,
        bankName: formData.bankName,
        bankAddress: formData.bankAddress,
        accountNumber: formData.accountNumber,
        swiftBicCode: formData.swiftBicCode,
        kesyAmount: Number(formData.kesyAmount),
        walletId: formData.walletId,
        txnId: formData.txnId,
      },
      {
        onSuccess: () => {
          // Redirect to dashboard after successful submission
          setTimeout(() => {
            router.push("/kesy/dashboard");
          }, 2000);
        },
      }
    );
  };

  return (
    <div className={className}>
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step >= stepNumber
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 text-muted-foreground"
              }`}
            >
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div
                className={`flex-1 h-[2px] mx-2 ${
                  step > stepNumber ? "bg-foreground" : "bg-foreground/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {step === 4 && (
        <Step4
          formData={formData}
          setFormData={setFormData}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />
      )}
    </div>
  );
}
