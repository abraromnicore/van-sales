import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../tables/data-table";
import { Skeleton } from "../ui/skeleton";


type SkeletonData = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  g: number;
};

const columns: ColumnDef<SkeletonData>[] = ["a", "b", "c", "d", "e", "f", "g"].map((column) => ({
  header: () => <Skeleton className="w-24 h-6" />,
  accessorKey: column as keyof SkeletonData,
  cell: () => <Skeleton className="w-24 h-6" />,
}));

const tuples: SkeletonData[] = new Array(10).fill(0).map((_, index) => ({
  a: index,
  b: index,
  c: index,
  d: index,
  e: index,
  f: index,
  g: index,
}));

export function DataTableSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
      </div>
      <DataTable columns={columns} data={tuples} />
    </div>
  );
}