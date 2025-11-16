import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from '@/components/DataTable'
import { CreateCategoryForm } from './components/CreateCategoryForm'
import { categoryData } from '@/data/data'

type DepartmentItem = {
    id: string;
    name: string;
};

const tests: DepartmentItem[] = [
    { id: "1", name: "Xray" },
    { id: "2", name: "Ultra-sonography" },
    { id: "3", name: "Pathology" },
    { id: "4", name: "Others" },
];

type TestCategory = {
    id: number;
    DeptID: number;
    CategoryName: string;
};

// Example category data
const categories: TestCategory[] = categoryData;

const mapCategoriesToDepartments = (categories: TestCategory[], departmentItems: DepartmentItem[]) => {
    return categories.map(category => {
        const department = departmentItems.find(department => department.id === category.DeptID.toString());
        return {
            ...category,
            DepartmentName: department ? department.name : "Unknown"
        };
    });
};

// Now mapping categories to departments
const mappedCategories = mapCategoriesToDepartments(categories, tests);


export default function Categories() {
    const columns: ColumnDef<TestCategory>[] = [
        // Row selection
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(Boolean(value))
                    }
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Category ID",
        },
        {
            accessorKey: "CategoryName",
            header: "Category Name",
        },

        {
            accessorKey: "DepartmentName",
            header: "Department Name",
        },

        // Actions Column
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;

                return (
                    <div className="flex gap-2">
                        <Button size="sm" variant="default" onClick={() => alert("Edit " + item.id)}>
                            Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => alert("Delete " + item.id)}>
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];
    return <>
        <Header>
            <Search />
            <div className='ms-auto flex items-center space-x-4'>
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </div>
        </Header>

        <Main>
            <div className="flex flex-wrap items-end justify-between gap-2">
                <h1 className="text-2xl font-bold tracking-tight mb-4">List of Category</h1>
                <CreateCategoryForm />
            </div>
            <DataTable columns={columns} data={mappedCategories} />
        </Main>
    </>
}