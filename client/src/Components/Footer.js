const Footer = () => {
  return (
    <>
      <footer style={styles.footer}>
        <p>© 2025 Plantify. All Rights Reserved.</p>
        <p>Your trusted place for plants, care tips, and home greenery.</p>
      </footer>
    </>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "10px 0",
    fontSize: "14px",
    color: "#4a4a4a",
    lineHeight: "0.5",
  },
};

export default Footer;
