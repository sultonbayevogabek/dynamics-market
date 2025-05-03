export interface Link {
  label: string;
  url: string;
  external?: boolean;
  target?: '_self' | '_blank';
  queryParams?: { [key: string]: string } | undefined |  null;
}
