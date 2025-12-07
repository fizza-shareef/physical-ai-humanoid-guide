import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>📖 AI-Native Textbook</span>
          <Heading as="h1" className="hero__title">
            Physical AI &<br />
            Humanoid Robotics
          </Heading>
          <p className="hero__subtitle">
            Master the future of robotics with comprehensive lessons on ROS 2,
            NVIDIA Isaac, sensor fusion, and real-world humanoid systems.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/01-intro"
            >
              Start Reading →
            </Link>
            <Link
              className={clsx(
                "button button--outline button--lg",
                styles.buttonOutline
              )}
              to="/docs/04-examples"
            >
              View Examples
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>Chapters</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Code Examples</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Free & Open</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    icon: "🤖",
    title: "ROS 2 & Gazebo",
    description:
      "Learn the industry-standard Robot Operating System and physics simulation from the ground up.",
  },
  {
    icon: "🧠",
    title: "NVIDIA Isaac",
    description:
      "AI-powered perception, SLAM, and autonomous navigation for humanoid robots.",
  },
  {
    icon: "⚡",
    title: "Sensor Fusion",
    description:
      "Combine camera, LiDAR, IMU, and force sensors for robust robot perception.",
  },
  {
    icon: "💻",
    title: "Runnable Code",
    description:
      "Every chapter includes real examples you can run and experiment with today.",
  },
  {
    icon: "🎯",
    title: "Project-Based",
    description:
      "Build complete robotics projects step-by-step with hands-on exercises.",
  },
  {
    icon: "🌐",
    title: "Industry Ready",
    description:
      "Skills aligned with what companies like Tesla, Boston Dynamics, and NVIDIA need.",
  },
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className={clsx("col col--4", styles.featureCol)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What You'll Learn</h2>
          <p className={styles.sectionSubtitle}>
            A comprehensive curriculum designed to take you from beginner to
            expert
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterPreview() {
  return (
    <section className={styles.chapterSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>📚 Book Chapters</h2>
          <p className={styles.sectionSubtitle}>
            Structured learning path from fundamentals to advanced topics
          </p>
        </div>
        <div className={styles.chapterGrid}>
          <Link to="/docs/01-intro" className={styles.chapterCard}>
            <span className={styles.chapterNumber}>01</span>
            <h3>Introduction</h3>
            <p>What is Physical AI and why it matters</p>
          </Link>
          <Link to="/docs/02-core" className={styles.chapterCard}>
            <span className={styles.chapterNumber}>02</span>
            <h3>Core Concepts</h3>
            <p>Foundational knowledge for robotics</p>
          </Link>
          <Link to="/docs/03-howto" className={styles.chapterCard}>
            <span className={styles.chapterNumber}>03</span>
            <h3>How-To Guides</h3>
            <p>Step-by-step practical tutorials</p>
          </Link>
          <Link to="/docs/04-examples" className={styles.chapterCard}>
            <span className={styles.chapterNumber}>04</span>
            <h3>Code Examples</h3>
            <p>Runnable code you can try now</p>
          </Link>
          <Link to="/docs/05-appendix" className={styles.chapterCard}>
            <span className={styles.chapterNumber}>05</span>
            <h3>Appendix</h3>
            <p>References and additional resources</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Ready to Build the Future?</h2>
          <p>
            Start your journey into Physical AI and Humanoid Robotics today.
          </p>
          <Link
            className="button button--secondary button--lg"
            to="/docs/01-intro"
          >
            Begin Chapter 1 →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Complete AI-Native textbook for Physical AI and Humanoid Robotics covering ROS 2, Gazebo, NVIDIA Isaac, and more."
    >
      <HomepageHeader />
      <main>
        <Features />
        <ChapterPreview />
        <CallToAction />
      </main>
    </Layout>
  );
}
