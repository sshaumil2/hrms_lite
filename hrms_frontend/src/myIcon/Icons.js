import IconsData from './IconsData';

const Icons = ({ name }) => {
const iconPath = IconsData[name]["path"];
const vBox = IconsData[name]["vbox"];

  return (
    <svg  
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      height="1em" 
      width="1em"
      viewBox={vBox}
      xmlns="http://www.w3.org/2000/svg">
      {iconPath}
    </svg>
  );  
};

export default Icons;