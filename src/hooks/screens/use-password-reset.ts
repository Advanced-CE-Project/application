import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { ForgotPasswordRequest, forgotPassword } from '@/services/auth';

export type PasswordResetStep = 'email' | 'verification' | 'newPassword' | 'success';

export const usePasswordReset = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentStep, setCurrentStep] = useState<PasswordResetStep>('email');
  const [resetToken, setResetToken] = useState<string | null>(null);

  // 1단계: 이메일로 인증 코드 발송
  const sendCodeMutation = useMutation({
    mutationFn: (emailData: string) => forgotPassword({ email: emailData }),
    onSuccess: (data) => {
      setCurrentStep('verification');
    },
  });

  // 2단계: 인증 코드 검증
  const verifyCodeMutation = useMutation({
    mutationFn: (data: { email: string; code: string }) =>
      forgotPassword({ email: data.email, code: data.code }),
    onSuccess: (data) => {
      if (data.resetToken) {
        setResetToken(data.resetToken);
        setCurrentStep('newPassword');
      }
    },
  });

  // 3단계: 새 비밀번호 설정
  const resetPasswordMutation = useMutation({
    mutationFn: (data: { email: string; resetToken: string; password: string }) =>
      forgotPassword({ email: data.email, resetToken: data.resetToken, password: data.password }),
    onSuccess: (data) => {
      setCurrentStep('success');
    },
  });

  const sendCode = () => {
    if (email.trim()) {
      sendCodeMutation.mutate(email);
    }
  };

  const verifyCode = () => {
    if (email.trim() && code.trim()) {
      verifyCodeMutation.mutate({ email, code });
    }
  };

  const resetPassword = () => {
    if (email.trim() && resetToken && password.trim() && password === confirmPassword) {
      resetPasswordMutation.mutate({ email, resetToken, password });
    }
  };

  const resetForm = () => {
    setEmail('');
    setCode('');
    setPassword('');
    setConfirmPassword('');
    setCurrentStep('email');
    setResetToken(null);
  };

  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'verification':
        setCurrentStep('email');
        break;
      case 'newPassword':
        setCurrentStep('verification');
        break;
      default:
        break;
    }
  };

  const isPasswordValid = password.length >= 6;
  const doPasswordsMatch = password === confirmPassword;
  const isFormValid = {
    email: email.trim().includes('@'),
    verification: code.trim().length === 6,
    newPassword: isPasswordValid && doPasswordsMatch && confirmPassword.length > 0,
  };

  return {
    // State
    email,
    code,
    password,
    confirmPassword,
    currentStep,
    resetToken,

    // Setters
    setEmail,
    setCode,
    setPassword,
    setConfirmPassword,

    // Actions
    sendCode,
    verifyCode,
    resetPassword,
    resetForm,
    goToPreviousStep,

    // Loading states
    isSendingCode: sendCodeMutation.isPending,
    isVerifyingCode: verifyCodeMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,

    // Error states
    sendCodeError: sendCodeMutation.error?.message,
    verifyCodeError: verifyCodeMutation.error?.message,
    resetPasswordError: resetPasswordMutation.error?.message,

    // Validation
    isPasswordValid,
    doPasswordsMatch,
    isFormValid,
  };
};
