import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";

import AIForm from "./aiForm";

import DefaultLayout from "@/layouts/default";
import { fetchData } from "@/services/data";
import { SalesRep } from "@/interfaces/sales";
import DetailModal from "@/components/detail-modal";

export default function IndexPage() {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  const [selectedRep, setSelectedRep] = useState<SalesRep | null>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchData();

      setSalesReps(data.salesReps);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredReps = useMemo(() => {
    if (!salesReps || salesReps.length === 0) return [];
    const filtered = salesReps.filter((rep) =>
      `${rep.name} ${rep.role}`
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) => {
      const first =
        a[sortDescriptor.column as keyof SalesRep]?.toString() ?? "";
      const second =
        b[sortDescriptor.column as keyof SalesRep]?.toString() ?? "";

      return sortDescriptor.direction === "ascending"
        ? first.localeCompare(second)
        : second.localeCompare(first);
    });

    return sorted;
  }, [salesReps, filterValue, sortDescriptor]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card className="w-full p-6">
          <CardHeader>
            <h2 className="text-xl font-bold">Sales Reps Data</h2>
          </CardHeader>
          <CardBody>
            <Input
              className="pb-6 w-1/4"
              placeholder="Search by name or role..."
              value={filterValue}
              variant="bordered"
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <Table
              removeWrapper
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <TableHeader>
                <TableColumn key="name" allowsSorting>
                  Name
                </TableColumn>
                <TableColumn key="role" allowsSorting>
                  Role
                </TableColumn>
                <TableColumn key="region" allowsSorting>
                  Region
                </TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={"No data"}
                isLoading={loading}
                items={filteredReps}
                loadingContent={<Spinner />}
              >
                {(rep) => (
                  <TableRow key={rep.id}>
                    <TableCell className="font-bold">{rep.name}</TableCell>
                    <TableCell>{rep.role}</TableCell>
                    <TableCell>{rep.region}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        size="sm"
                        onPress={() => {
                          setSelectedRep(rep);
                          onOpen();
                        }}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <AIForm />
      </section>
      <DetailModal
        isOpen={isOpen}
        salesRep={selectedRep}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </DefaultLayout>
  );
}
