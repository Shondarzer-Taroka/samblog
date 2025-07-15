// 'use client';

// import { useState, useEffect } from 'react';


// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'user' | 'editor' | 'moderator' | 'admin';
//   isActive: boolean;
//   createdAt: string;
// }

// const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:7700/api';

// export default function UsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${API_URL}/users`, {
//          credentials:'include'
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }

//         const data = await response.json();
//         setUsers(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch users');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleRoleChange = async (userId: string, newRole: string) => {
//     try {
//       const response = await fetch(`${API_URL}/users/${userId}/role`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
        
//         },
//         body: JSON.stringify({ role: newRole }),
//         credentials:'include'
//       }
//     );

//       if (!response.ok) {
//         throw new Error('Failed to update role');
//       }

//       setUsers(users.map(user => 
//         user.id === userId ? { ...user, role: newRole as User['role'] } : user
//       ));
//       setSuccess('Role updated successfully');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update role');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleStatusChange = async (userId: string, currentStatus: boolean) => {
//     try {
//       const response = await fetch(`${API_URL}/users/${userId}/status`, {
//         method: 'PUT',
//        credentials:'include'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update status');
//       }

//       setUsers(users.map(user => 
//         user.id === userId ? { ...user, isActive: !currentStatus } : user
//       ));
//       setSuccess(`User ${currentStatus ? 'blocked' : 'activated'} successfully`);
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update status');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDelete = async (userId: string) => {
//     if (!confirm('Are you sure you want to delete this user?')) return;
    
//     try {
//       const response = await fetch(`${API_URL}/users/${userId}`, {
//         method: 'DELETE',
//        credentials:'include'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete user');
//       }

//       setUsers(users.filter(user => user.id !== userId));
//       setSuccess('User deleted successfully');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to delete user');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading">
//         <div className="spinner"></div>
//         <p>Loading users...</p>
//       </div>
//     );
//   }

//   return (
//     <div className=" w-full md:container mx-auto lg:p-4 ">
//       <h1>User Management</h1>

//       {error && (
//         <div className="alert error">
//           {error}
//           <button onClick={() => setError('')} className="close-btn button-of-users">
//             &times;
//           </button>
//         </div>
//       )}

//       {success && (
//         <div className="alert success">
//           {success}
//           <button onClick={() => setSuccess('')} className="close-btn button-of-users">
//             &times;
//           </button>
//         </div>
//       )}

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <select
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                     disabled={user.role === 'admin'}
//                   >
//                     <option value="user">User</option>
//                     <option value="editor">Editor</option>
//                     <option value="moderator">Moderator</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </td>
//                 <td>
//                   <label className="switch">
//                     <input
//                       type="checkbox"
//                       checked={user.isActive}
//                       onChange={() => handleStatusChange(user.id, user.isActive)}
//                       disabled={user.role === 'admin'}
//                     />
//                     <span className="slider"></span>
//                   </label>
//                   <span className="status-text">
//                     {user.isActive ? 'Active' : 'Blocked'}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     disabled={user.role === 'admin'}
//                     className="delete-btn button-of-users"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
     

//         .loading {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 200px;
//         }

//         .spinner {
//           border: 4px solid rgba(0, 0, 0, 0.1);
//           border-radius: 50%;
//           border-top: 4px solid #3498db;
//           width: 40px;
//           height: 40px;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

     
//       `}</style>
//     </div>
//   );
// }















'use client';

import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'editor' | 'moderator' | 'admin';
  isActive: boolean;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:7700/api';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('ব্যবহারকারীদের লোড করতে ব্যর্থ হয়েছে');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'ব্যবহারকারীদের লোড করতে ব্যর্থ হয়েছে');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('ভূমিকা আপডেট করতে ব্যর্থ হয়েছে');
      }

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole as User['role'] } : user
      ));
      setSuccess('ভূমিকা সফলভাবে আপডেট হয়েছে');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ভূমিকা আপডেট করতে ব্যর্থ হয়েছে');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleStatusChange = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/status`, {
        method: 'PUT',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে');
      }

      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: !currentStatus } : user
      ));
      setSuccess(`ব্যবহারকারী ${currentStatus ? 'ব্লক করা হয়েছে' : 'সক্রিয় করা হয়েছে'}`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই ব্যবহারকারীকে মুছতে চান?')) return;
    
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('ব্যবহারকারী মুছতে ব্যর্থ হয়েছে');
      }

      setUsers(users.filter(user => user.id !== userId));
      setSuccess('ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ব্যবহারকারী মুছতে ব্যর্থ হয়েছে');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">ব্যবহারকারী লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="md:container md:mx-auto md:px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">ব্যবহারকারী ব্যবস্থাপনা</h1>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="ব্যবহারকারী খুঁজুন..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button onClick={() => setError('')} className="text-red-700 hover:text-red-900">
              &times;
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          <div className="flex justify-between items-center">
            <p>{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">নাম</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">ইমেইল</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ভূমিকা</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">কর্ম</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={user.role === 'admin'}
                        className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${
                          user.role === 'admin' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                        }`}
                      >
                        <option value="user">ব্যবহারকারী</option>
                        <option value="editor">সম্পাদক</option>
                        <option value="moderator">মডারেটর</option>
                        <option value="admin">অ্যাডমিন</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={user.isActive}
                            onChange={() => handleStatusChange(user.id, user.isActive)}
                            disabled={user.role === 'admin'}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-700">
                            {user.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={user.role === 'admin'}
                        className={`text-red-600 hover:text-red-900 ${
                          user.role === 'admin' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title="মুছুন"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    কোন ব্যবহারকারী পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                পূর্ববর্তী
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                পরবর্তী
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  দেখানো হচ্ছে <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> থেকে{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> এর{' '}
                  <span className="font-medium">{filteredUsers.length}</span> ব্যবহারকারী
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">প্রথম</span>
                    &laquo;
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">পূর্ববর্তী</span>
                    &lsaquo;
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">পরবর্তী</span>
                    &rsaquo;
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">শেষ</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}