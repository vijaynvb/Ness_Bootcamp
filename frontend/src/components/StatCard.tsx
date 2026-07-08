interface StatCardProps {
  title: string;
  value: number | string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="card stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
