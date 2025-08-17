export interface IPaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}
