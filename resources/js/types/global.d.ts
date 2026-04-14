import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            layout: 'navbar' | 'sidebar';
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
