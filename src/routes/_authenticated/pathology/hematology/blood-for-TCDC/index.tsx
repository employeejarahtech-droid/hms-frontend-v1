import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/pathology/hematology/blood-for-TCDC/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/pathology/hematology/blood-for-TCDC/"!</div>
  )
}
