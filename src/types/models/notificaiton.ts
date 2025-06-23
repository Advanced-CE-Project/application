export interface NotificationItem {
  content: string;
  createdAt: string;
  id: string;
  isRead: boolean;
  relatedId: string | null;
  title: string;
  type: string;
}
