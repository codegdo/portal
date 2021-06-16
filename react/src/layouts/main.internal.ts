export const mainInternal = `
<div>
  <header>
    <h1>Internal App </h1>
    <NavMain {...props} />
    <NavProfile {...props} />
  </header>
  <aside>
    <NavSub {...props} />
  </aside>
  <main>
    <Content {...props}/>
  </main>
  <footer></footer>
</div>
`;
