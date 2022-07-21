const SvgIcon = (props) => (
  <img
    src={`/images/${props.src}`}
    alt={props.alt || "IIT(ISM) Dhanbad Placement Portal by SDT"}
    className={props.classname || "svg-icon"}
  />
);

export default SvgIcon;
