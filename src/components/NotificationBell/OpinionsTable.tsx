/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { FiEdit, FiEye } from 'react-icons/fi';
import clsx from 'clsx';
import { useAlert } from '@/hooks/useAlert';

export default function OpinionsTable({ opinions, onStatusChange }: {
  opinions: any[];
  onStatusChange: (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => Promise<void>;
}) {
  const [selectedOpinion, setSelectedOpinion] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { showAlert, AlertDialog } = useAlert();

  const handleStatusChange = async (status: 'APPROVED' | 'REJECTED') => {
    if (status === 'REJECTED' && !rejectionReason) {
      showToast('error', 'Please provide a rejection reason');
      return;
    }

    setIsLoading(true);
    try {
      await onStatusChange(selectedOpinion.id, status, rejectionReason);
      setIsModalOpen(false);
      setSelectedOpinion(null);
      setRejectionReason('');
    } catch (error) {
      showToast('error', 'Failed to update opinion status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opinions.map((opinion) => (
              <tr key={opinion.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {opinion.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opinion.author?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={clsx(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    opinion.status === 'APPROVED' && 'bg-green-100 text-green-800',
                    opinion.status === 'PENDING' && 'bg-yellow-100 text-yellow-800',
                    opinion.status === 'REJECTED' && 'bg-red-100 text-red-800'
                  )}>
                    {opinion.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(opinion.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                  <button
                    onClick={() => router.push(`/opinion/${opinion.id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOpinion(opinion);
                      setIsModalOpen(true);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              Update Opinion Status: {selectedOpinion?.title}
            </h3>

            {selectedOpinion?.status !== 'APPROVED' && (
              <button
                onClick={() => handleStatusChange('APPROVED')}
                disabled={isLoading}
                className="w-full mb-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Approve Opinion'}
              </button>
            )}

            {selectedOpinion?.status !== 'REJECTED' && (
              <>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Reason for rejection (required)"
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                  rows={3}
                />
                <button
                  onClick={() => handleStatusChange('REJECTED')}
                  disabled={isLoading || !rejectionReason}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Reject Opinion'}
                </button>
              </>
            )}

            <button
              onClick={() => {
                setIsModalOpen(false);
                setRejectionReason('');
              }}
              className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}