import styles from "../styles/SSG.module.css";

export const dynamic = "force-static"; // SSG

interface Item {
  id: number;
  name: string;
}

export default async function SSGPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`);
  const data: Item[] = await res.json();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>SSG Page</h1>
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}
