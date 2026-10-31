import { MessagesView } from "@/components/admin/messages-view";

// Auth-gated client view: it can't render before the token is checked, so skip instant-navigation validation.
export const instant = false;

export default function AdminMessagesPage() {
	return <MessagesView />;
}
