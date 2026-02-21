import { useToast } from "../../hooks/use-toast";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast.jsx";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        
        // Auto-select icon based on variant
        const Icon = 
          variant === 'destructive' ? AlertCircle : 
          variant === 'success' ? CheckCircle2 : 
          Info;
          
        const iconColor = 
          variant === 'destructive' ? 'text-red-500' : 
          variant === 'success' ? 'text-emerald-500' : 
          'text-blue-500';

        return (
          <Toast key={id} variant={variant} {...props}>
            
            <div className="flex gap-3 w-full items-start">
              {/* Dynamic Icon */}
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColor}`} />
              
              {/* Text Content */}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>

            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}