import * as React from "react";
import { type ToastActionElement } from "@radix-ui/react-toast";

import {
  Toast as ToastPrimitive,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastProvider,
  ToastViewport,
  useToast,
} from "./use-toast";

type ToastAction = ToastActionElement;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive ref={ref} className={className} {...props} />
  );
});
Toast.displayName = ToastPrimitive.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastViewportProps = React.HTMLAttributes<HTMLDivElement>;

export {
  useToast,
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastProvider,
  ToastViewport,
  type ToastProps,
  type ToastViewportProps,
  type ToastAction,
  ToastAction
};