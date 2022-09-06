function SideBarItem({ item, selected }) {
  return (
    <li className="nav-item btn order border-primary m-3 ">
      <a
        className={"nav-link " + (selected ? "active" : "")}
        aria-current="page"
        onClick={() => {
          item.handleClick();
        }}
      >
        {item.label}
      </a>
    </li>
  );
}

export default function Sidebar({ items, selectedItem }) {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-5">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link " href=""></a>
          </li>
          {items &&
            items.map((item) => (
              <SideBarItem
                selected={selectedItem && selectedItem.id === item.id}
                item={item}
              ></SideBarItem>
            ))}
        </ul>
      </div>
    </nav>
  );
}
