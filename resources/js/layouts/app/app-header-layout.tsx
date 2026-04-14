import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell variant="navbar">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="navbar">{children}</AppContent>
        </AppShell>
    );
}
