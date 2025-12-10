'use client';

import React, { useState } from 'react';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog';
import {
  User,
  Mail,
  Edit,
  CheckCircle,
  TriangleAlert,
  XCircle,
} from 'lucide-react';
import { getRoleBadge } from '../columns/RoleManagementColumns';

interface DeleteItemDialogProps {
  open: boolean;
  item: any; // distinguish title
  title?: string;
  description?: string;
  onDelete: () => Promise<void> | void;
  onClose: () => void;
}

const DeleteItemDialog: React.FC<DeleteItemDialogProps> = ({
  open,
  item,
  onDelete,
  title,
  onClose,
  description,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete();
      onClose();
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <span className="bg-red-100 rounded-full">
              <TriangleAlert className="w-5 h-5 m-2" />
            </span>
            Delete {title}
          </DialogTitle>
          <DialogDescription>
            {description ||
              `Are you sure you want to delete this ${title}? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-lg p-4 mt-4 bg-gray-50 space-y-2">
          {title === 'User' ? (
            <>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{item.fullName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{item.email}</span>
              </div>

              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Edit className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{item.rolesName}</span>
                </div>
                <div className="flex items-center gap-1">
                  {item.isActive ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-red-600 font-medium">Inactive</span>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Role UI
            <>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {getRoleBadge(item.roleAssignment)}
                </span>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-md">
                  {item.roleAssignment}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="flex justify-between gap-4 mt-2">
                <span className="flex items-center gap-1 text-gray-700 text-sm">
                  <User className="w-4 h-4" />
                  {item.userCount} users
                </span>
                <span
                  className={`flex items-center gap-1 text-sm ${
                    item.isActive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.isActive ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Inactive
                    </>
                  )}
                </span>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? 'Deleting...'
              : title === 'Role'
                ? 'Delete Role'
                : 'Delete User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemDialog;
