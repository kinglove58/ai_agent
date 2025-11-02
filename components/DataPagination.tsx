import { Button } from "./ui/button";

interface DataPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const DataPagination = ({
  page,
  totalPages,
  onPageChange,
}: DataPaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex gap-x-2 justify-end items-center">
        <Button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataPagination;
