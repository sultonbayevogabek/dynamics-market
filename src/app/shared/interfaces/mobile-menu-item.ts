export interface MobileMenuItemLink {
  type?: 'link' | 'button';
  url?: string;
  data?: {
    language?: string;
  };
  label?: string;
  children?: MobileMenuItemLink[];
}
