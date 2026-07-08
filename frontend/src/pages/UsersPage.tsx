import { useEffect, useState } from 'react';
import { createUser, fetchUsers } from '../api/users';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import { User, UserListResponse } from '../types/api';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    void loadUsers();
  }, []);

  async function loadUsers() {
    const response = await fetchUsers();
    const payload = response.data as UserListResponse;
    setUsers(payload.items);
  }

  async function handleCreateUser(payload: Record<string, unknown>) {
    await createUser(payload);
    await loadUsers();
  }

  return (
    <section className="page-grid">
      <UserForm onSubmit={handleCreateUser} />
      <UserList users={users} />
    </section>
  );
}
