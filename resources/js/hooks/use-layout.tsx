import { useSyncExternalStore } from 'react';
import type { AppVariant } from '@/types';

export type UseLayoutReturn = {
    readonly layout: AppVariant;
    readonly updateLayout: (layout: AppVariant) => void;
};

const STORAGE_KEY = 'layout';
const COOKIE_KEY = 'layout';
const DEFAULT_LAYOUT: AppVariant = 'sidebar';

const listeners = new Set<() => void>();
let currentLayout: AppVariant = DEFAULT_LAYOUT;

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const isAppVariant = (value: string | null): value is AppVariant =>
    value === 'sidebar' || value === 'navbar';

const getStoredLayout = (): AppVariant => {
    if (typeof window === 'undefined') {
        return DEFAULT_LAYOUT;
    }

    const storedLayout = localStorage.getItem(STORAGE_KEY);

    return isAppVariant(storedLayout) ? storedLayout : DEFAULT_LAYOUT;
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeLayout(defaultLayout: AppVariant = DEFAULT_LAYOUT) {
    if (typeof window === 'undefined') {
        return;
    }

    const storedLayout = localStorage.getItem(STORAGE_KEY);

    if (!isAppVariant(storedLayout)) {
        localStorage.setItem(STORAGE_KEY, defaultLayout);
        setCookie(COOKIE_KEY, defaultLayout);
        currentLayout = defaultLayout;

        return;
    }

    currentLayout = getStoredLayout();
    setCookie(COOKIE_KEY, currentLayout);
}

export function useLayout(): UseLayoutReturn {
    const layout = useSyncExternalStore(
        subscribe,
        () => currentLayout,
        () => DEFAULT_LAYOUT,
    );

    const updateLayout = (nextLayout: AppVariant): void => {
        currentLayout = nextLayout;
        localStorage.setItem(STORAGE_KEY, nextLayout);
        setCookie(COOKIE_KEY, nextLayout);
        notify();
    };

    return { layout, updateLayout } as const;
}
