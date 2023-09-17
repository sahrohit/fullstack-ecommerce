/* eslint-disable no-nested-ternary */
import * as React from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	chakra,
	Icon,
} from "@chakra-ui/react";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	ColumnDef,
	SortingState,
	getSortedRowModel,
} from "@tanstack/react-table";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

export type DataTableProps<Data extends object> = {
	data: Data[];
	columns: ColumnDef<Data, any>[];
};

export const DataTable = <Data extends object>({
	data,
	columns,
}: DataTableProps<Data>) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<Table>
			<Thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<Tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							// see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
							const { meta } = header.column.columnDef;
							return (
								<Th
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									isNumeric={meta?.isNumeric}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}

									<chakra.span pl="4">
										{header.column.getIsSorted() ? (
											header.column.getIsSorted() === "desc" ? (
												<Icon
													as={VscTriangleDown}
													aria-label="sorted descending"
												/>
											) : (
												<Icon
													as={VscTriangleUp}
													aria-label="sorted ascending"
												/>
											)
										) : null}
									</chakra.span>
								</Th>
							);
						})}
					</Tr>
				))}
			</Thead>
			<Tbody>
				{table.getRowModel().rows.map((row) => (
					<Tr key={row.id}>
						{row.getVisibleCells().map((cell) => {
							// see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
							const { meta } = cell.column.columnDef;
							return (
								<Td key={cell.id} isNumeric={meta?.isNumeric}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Td>
							);
						})}
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};
