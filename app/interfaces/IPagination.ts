export interface IPagination {
   offset: number;
   limit: number;
   total: number;
   currentLength: number;
   onPageChange: (page: number) => void;

}