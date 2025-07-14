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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`, {
         credentials:'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        
        },
        body: JSON.stringify({ role: newRole }),
        credentials:'include'
      }
    );

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole as User['role'] } : user
      ));
      setSuccess('Role updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleStatusChange = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/status`, {
        method: 'PUT',
       credentials:'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: !currentStatus } : user
      ));
      setSuccess(`User ${currentStatus ? 'blocked' : 'activated'} successfully`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
       credentials:'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== userId));
      setSuccess('User deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>User Management</h1>

      {error && (
        <div className="alert error">
          {error}
          <button onClick={() => setError('')} className="close-btn button-of-users">
            &times;
          </button>
        </div>
      )}

      {success && (
        <div className="alert success">
          {success}
          <button onClick={() => setSuccess('')} className="close-btn button-of-users">
            &times;
          </button>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={user.role === 'admin'}
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={user.isActive}
                      onChange={() => handleStatusChange(user.id, user.isActive)}
                      disabled={user.role === 'admin'}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className="status-text">
                    {user.isActive ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={user.role === 'admin'}
                    className="delete-btn button-of-users"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

     
      `}</style>
    </div>
  );
}