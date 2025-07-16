export default async function UsersPage() {
  const res = await fetch("https://api.example.com/users");
  const data = await res.json();

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
