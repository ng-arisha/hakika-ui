import { sideNavLinks } from "@/utils/utils"
import Link from "next/link"

function SideNavigation() {
    return (
        <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            {
                sideNavLinks.map(({title,url,icon:Icon}) => (
                    <li key={url}>
              <Link href={url} className="is-drawer-close:tooltip is-drawer-close:tooltip-right my-1.5" data-tip={title}>
                {/* Home icon */}
                <Icon className=" inline-block size-4" />
                <span className="is-drawer-close:hidden">{title}</span>
              </Link>
            </li>
                ))
            }
    
            {/* List item */}
            {/* <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
               
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    )
}

export default SideNavigation
