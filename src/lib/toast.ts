export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

export function showToast(optionsOrMessage: ToastOptions | string, optionalType?: ToastType, optionalDuration?: number) {
  if (typeof document === 'undefined') return; // Server-side rendering guard

  let title, message, type: ToastType = 'info', duration = 4000;

  if (typeof optionsOrMessage === 'string') {
    message = optionsOrMessage;
    if (optionalType) type = optionalType;
    if (optionalDuration) duration = optionalDuration;
  } else {
    title = optionsOrMessage.title;
    message = optionsOrMessage.message;
    type = optionsOrMessage.type || 'info';
    duration = optionsOrMessage.duration || 4000;
  }

  // Create container if it doesn't exist
  let container = document.getElementById('zen-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'zen-toast-container';
    container.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-[90%] max-w-sm sm:max-w-md pointer-events-none';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  
  // Icon based on type
  let iconHtml = '';
  if (type === 'success') {
    iconHtml = `<svg class="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>`;
  } else if (type === 'error') {
    iconHtml = `<svg class="w-5 h-5 text-rose-500 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>`;
  } else {
    iconHtml = `<svg class="w-5 h-5 text-stone-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
  }

  const titleHtml = title ? `<h4 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-1">${title}</h4>` : '';

  toast.innerHTML = `
    <div class="flex items-start gap-4 p-4 bg-white/90 dark:bg-[#111111]/90 border border-stone-200/50 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-xl pointer-events-auto transition-all duration-400 ease-out transform -translate-y-4 opacity-0 scale-95">
      <div class="flex-shrink-0 mt-0.5">
        ${iconHtml}
      </div>
      <div class="flex-1 min-w-0">
        ${titleHtml}
        <p class="text-sm text-stone-600 dark:text-gray-400 font-medium leading-relaxed">${message}</p>
      </div>
      <button class="flex-shrink-0 ml-4 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors close-btn outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-white/20 rounded-full p-1">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  `;

  container.appendChild(toast);

  const toastElement = toast.firstElementChild as HTMLElement;

  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toastElement.classList.remove('-translate-y-4', 'opacity-0', 'scale-95');
      toastElement.classList.add('translate-y-0', 'opacity-100', 'scale-100');
    });
  });

  let isRemoved = false;
  const removeToast = () => {
    if (isRemoved) return;
    isRemoved = true;
    toastElement.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
    toastElement.classList.add('-translate-y-4', 'opacity-0', 'scale-95');
    setTimeout(() => {
      toast.remove();
      if (container && container.childNodes.length === 0) {
        container.remove();
      }
    }, 400);
  };

  toast.querySelector('.close-btn')?.addEventListener('click', removeToast);
  setTimeout(removeToast, duration);
}

if (typeof window !== 'undefined') {
  (window as any).showToast = showToast;
}
