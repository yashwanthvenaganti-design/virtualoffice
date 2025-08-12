import toast, { type ToastOptions } from 'react-hot-toast';

interface CustomToastOptions extends ToastOptions {
  title?: string;
}

class ToastService {
  private defaultOptions: ToastOptions = {
    duration: 4000,
    position: 'bottom-right',
  };

  success(message: string, options?: CustomToastOptions) {
    return toast.success(message, {
      ...this.defaultOptions,
      ...options,
      style: {
        background: '#10B981',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        ...options?.style,
      },
    });
  }

  error(message: string, options?: CustomToastOptions) {
    return toast.error(message, {
      ...this.defaultOptions,
      duration: 5000, // Longer duration for errors
      ...options,
      style: {
        background: '#EF4444',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        ...options?.style,
      },
    });
  }

  info(message: string, options?: CustomToastOptions) {
    return toast(message, {
      ...this.defaultOptions,
      ...options,
      style: {
        background: '#3B82F6',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        ...options?.style,
      },
    });
  }

  warning(message: string, options?: CustomToastOptions) {
    return toast(message, {
      ...this.defaultOptions,
      ...options,
      style: {
        background: '#F59E0B',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        ...options?.style,
      },
      icon: '⚠️',
    });
  }

  loading(message: string, options?: CustomToastOptions) {
    return toast.loading(message, {
      ...this.defaultOptions,
      ...options,
      style: {
        background: '#374151',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        ...options?.style,
      },
    });
  }

  // Promise-based toast for async operations
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: CustomToastOptions
  ) {
    return toast.promise(promise, messages, {
      ...this.defaultOptions,
      ...options,
      style: {
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        ...options?.style,
      },
    });
  }

  // Dismiss all toasts
  dismiss() {
    toast.dismiss();
  }

  // Dismiss specific toast
  dismissById(id: string) {
    toast.dismiss(id);
  }
}

export const toastService = new ToastService();
export default toastService;
