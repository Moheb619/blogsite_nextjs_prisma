import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          Blog Service
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/About"}>About</Link>
          </li>
          <li>
            <Link href={"/Blog"}>Blogs</Link>
          </li>
          <li>
            <Link href={"/Service"}>Services</Link>
          </li>
          <li>
            <Link href={"/Contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/Login"}>Login</Link>
          </li>
          <li>
            <Link href={"/Registration"}>Registration</Link>
          </li>
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
      <div>
        {" "}
        <button className="btn btn-primary">Logout</button>{" "}
      </div>
    </div>
  );
};

export default Header;
