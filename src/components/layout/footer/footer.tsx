import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section>
        <h2>Credits</h2>
        <ul>
          <li>
            Background created using
            <a
              href="https://www.design.svgbackgrounds.com/"
              target="_blank"
              rel="noreferrer"
            >
              {" SVGBackgrounds.com"}
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
