import Card from "../components/Card";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>About InkConnect</h1>
      <p className={styles.description}>
        This is a static page demonstrating a reusable component.
      </p>
      <Card title="Feature 1" description="Reusable card component integrated in a page." />
      <Card title="Feature 2" description="Another card demonstrating reusability." />
    </main>
  );
}
