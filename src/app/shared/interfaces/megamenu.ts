import { MegamenuColumn } from './megamenu-column';

export interface Megamenu {
  type: 'megamenu';
  size: 'xl' | 'lg' | 'nl' | 'sm';
  columns: MegamenuColumn[];
}
