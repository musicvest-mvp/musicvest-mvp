import {
  ToastProvider as RadixToastProvider,
  ToastViewport as RadixToastViewport,
  Toast as RadixToast,
  ToastTitle as RadixToastTitle,
  ToastDescription as RadixToastDescription,
  ToastClose as RadixToastClose,
  ToastAction as RadixToastAction,
} from "@radix-ui/react-toast";

// Re-export components
export const ToastProvider = RadixToastProvider;
export const ToastViewport = RadixToastViewport;
export const Toast = RadixToast;
export const ToastTitle = RadixToastTitle;
export const ToastDescription = RadixToastDescription;
export const ToastClose = RadixToastClose;
export const ToastAction = RadixToastAction;

// Re-export types
export type { ToastProps } from "@radix-ui/react-toast";
export type { ToastActionElement } from "@radix-ui/react-toast";