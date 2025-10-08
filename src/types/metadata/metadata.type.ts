import type { BreadcrumbType } from '@/types/metadata/breadcrumb.type.ts';

export interface MetadataType {
  pageTitle: string;
  breadcrumbs: BreadcrumbType[];
}