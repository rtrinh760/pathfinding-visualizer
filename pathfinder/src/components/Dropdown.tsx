type DropdownProps = {
  open: boolean;
  trigger: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  menu: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >[];
};

const Dropdown = ({ open, trigger, menu }: DropdownProps) => {
  return (
    <div id="algorithm-dropdown">
      <>{trigger}</>
      <>
        {open ? (
          <ul
            id="algorithm-menu"
            className="
          min-w-max
          absolute
          bg-gray-200
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-xl
          mt-1
          m-0
          bg-clip-padding
          border-none"
          >
            {menu.map((menuItem, index) => (
              <li key={index} id="item">
                <>{menuItem}</>
              </li>
            ))}
          </ul>
        ) : null}
      </>
    </div>
  );
};

export default Dropdown;
