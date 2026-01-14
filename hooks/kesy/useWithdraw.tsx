import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface WithdrawalFormData {
  // Step 1: Recipient Info
  recipientFullName: string;
  recipientAddress: string;

  // Step 2: Bank Info
  bankName: string;
  bankAddress: string;

  // Step 3: Account Details
  accountNumber: string;
  swiftBicCode: string;

  // Step 4: Confirmation
  kesyAmount: string;
  walletId: string;
  txnId?: string;
}

export interface WithdrawalSubmission {
  recipientFullName: string;
  recipientAddress: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  swiftBicCode: string;
  kesyAmount: number;
  walletId: string;
  txnId: string;
}

// Mock API function - replace with actual API call when backend is ready
const submitWithdrawal = async (
  data: WithdrawalSubmission
): Promise<{ success: boolean; withdrawalId: string }> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  console.log("Withdrawal submission:", data);
  
  // Simulate successful response
  return {
    success: true,
    withdrawalId: `WD-${Date.now()}`,
  };
};

// Custom hook for withdrawal submission
export const useWithdrawalSubmit = () => {
  return useMutation({
    mutationFn: submitWithdrawal,
    onSuccess: (data) => {
      toast.success("Withdrawal request submitted successfully!", {
        description: `Withdrawal ID: ${data.withdrawalId}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to submit withdrawal request", {
        description: error.message,
      });
    },
  });
};

// Mock API function for getting withdrawal history - replace with actual API call
const fetchWithdrawalHistory = async (): Promise<WithdrawalSubmission[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Return empty array for now
  return [];
};

// Custom hook for fetching withdrawal history
export const useWithdrawalHistory = () => {
  return useQuery({
    queryKey: ["withdrawalHistory"],
    queryFn: fetchWithdrawalHistory,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Validation helpers
export const validateStep1 = (data: Partial<WithdrawalFormData>): boolean => {
  return !!(
    data.recipientFullName?.trim() &&
    data.recipientAddress?.trim() &&
    data.recipientFullName.length >= 3 &&
    data.recipientAddress.length >= 10
  );
};

export const validateStep2 = (data: Partial<WithdrawalFormData>): boolean => {
  return !!(
    data.bankName?.trim() &&
    data.bankAddress?.trim() &&
    data.bankName.length >= 3 &&
    data.bankAddress.length >= 10
  );
};

export const validateStep3 = (data: Partial<WithdrawalFormData>): boolean => {
  const accountNumberValid = data.accountNumber?.trim() && data.accountNumber.length >= 8;
  const swiftBicValid = data.swiftBicCode?.trim() && 
    (data.swiftBicCode.length === 8 || data.swiftBicCode.length === 11);
  
  return !!(accountNumberValid && swiftBicValid);
};

export const validateStep4 = (data: Partial<WithdrawalFormData>): boolean => {
  const amountValid = data.kesyAmount && Number(data.kesyAmount) >= 1000;
  const walletValid = data.walletId?.trim();
  
  return !!(amountValid && walletValid);
};
