import Icons from "../myIcon/Icons";

export default function AdminHeader({pagename}) {
  return (
    <>
    <div className="header-add-category">
        <h5>admin <Icons name="arrowRight"/> {pagename.name}</h5>
        <div>
            <span>Hello! {pagename.user}</span>
            <img src="/assets/admin-user.webp" alt="user" className="img-responsive" />
        </div>
    </div>

    <div className="header-navigation">
        <span>{pagename.innerpage}</span>
    </div>  
    </>
  )
}
