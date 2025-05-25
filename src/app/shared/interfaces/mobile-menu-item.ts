export interface MobileMenuItemLink {
  type?: 'page-link' | 'category-link' | 'button';
  url?: string;
  data?: {
    language?: string;
  };
  label?: string;
  children?: MobileMenuItemLink[];
}
