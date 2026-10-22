import { EventForm } from '@/components/admin/events/EventForm';

export default async function AdminEditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventForm mode="edit" eventId={id} />;
}