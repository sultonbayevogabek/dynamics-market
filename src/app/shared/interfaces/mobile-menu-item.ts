export interface MobileMenuItemBase {
  label: string;
  data?: any;
  children?: MobileMenuItem[];
}

export interface MobileMenuItemLink extends MobileMenuItemBase {
  type: 'link';
  url: string;
  data?: {
    language?: string;
  };
}

export interface MobileMenuItemButton extends MobileMenuItemBase {
  type: 'button';
  data?: {
    language?: string;
  };
}

export interface MobileMenuItemDivider {
  type: 'divider';
  data?: {
    language?: string;
  };
}

export type MobileMenuItem = MobileMenuItemLink | MobileMenuItemButton | MobileMenuItemDivider;
