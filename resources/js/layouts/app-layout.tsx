import { usePage } from '@inertiajs/react';
import { useLayout } from '@/hooks/use-layout';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) {
    const page = usePage();
    const serverLayout = page.props.layout === 'navbar' ? 'navbar' : 'sidebar';
    const { layout } = useLayout();
    const activeLayout = layout ?? serverLayout;
    const LayoutTemplate =
        activeLayout === 'navbar' ? AppHeaderLayout : AppSidebarLayout;

    return (
        <LayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </LayoutTemplate>
    );
}
