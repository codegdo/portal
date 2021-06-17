export const mainInternal = `
<div>
  <header>
    <h1>Internal App </h1>
    <NavMain url={url} />
    <NavProfile url={url} />
  </header>
  <aside>
    <NavSub url={url} />
  </aside>
  <main>
    <Content {...props} />
  </main>
  <footer></footer>
</div>
`;
