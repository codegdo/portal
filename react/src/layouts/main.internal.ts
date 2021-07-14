export const mainInternal = `
<div class="internal">
  <header class="internal-header">
    <div class="container"> 
      <nav class="nav -bar">
        <div class="nav-logo"><Link to="/">Internal App</Link></div>
        <ul class="nav-link nav_main"><NavMain {...props} /></ul>
        <ul class="nav-link nav_menu"><NavMenuProfile {...props} /></ul>
      </nav>
    </div> 
  </header>
  <aside class="internal-aside">
    <NavSub {...props} />
  </aside>
  <main class="internal-main">
    <div class="container"><Content {...props} /></div>  
  </main>
</div>
`;
