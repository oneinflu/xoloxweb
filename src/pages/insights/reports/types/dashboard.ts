export type Permission = 'view' | 'edit' | 'admin';

export interface DashboardPermission {
  userId: string;
  permission: Permission;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  lastUpdated: Date;
  owner: User;
  isShared: boolean;
  isPrivate: boolean;
  isFavorite: boolean;
  permissions: DashboardPermission[];
}