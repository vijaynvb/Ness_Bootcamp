import { User } from '../types/api';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="card">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users available yet.</p>
      ) : (
        <ul className="list">
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.firstName} {user.lastName}</strong> — {user.role}
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
