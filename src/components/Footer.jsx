export default function Footer({ className, style }) {
  return (
    <footer className={`site-footer ${className || ''}`} style={style}>
      <p>© {new Date().getFullYear()} Chandhru Kusalavan. All rights reserved.</p>
    </footer>
  )
}
