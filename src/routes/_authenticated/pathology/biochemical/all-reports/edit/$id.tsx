// routes/_authenticated/pathology/biochemical/all-reports/edit/$id.tsx
import { createFileRoute } from '@tanstack/react-router';

export const editReportRoute = createFileRoute('/_authenticated/pathology/biochemical/all-reports/edit/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello Edit Report Page
    </div>
  );
}
