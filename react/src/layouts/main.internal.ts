export const mainInternal = `
<div class="internal">
  <header class="internal-header">
    <nav class="nav">
      <span>Internal App</span>
      <NavMain url={url} />
      <NavProfile url={url} />
    </nav>
  </header>
  <aside class="internal-aside">
    <NavSub url={url} />
  </aside>
  <main class="internal-main">
    <Content {...props} />
  </main>
  <footer class="internal-footer"></footer>
</div>
`;
