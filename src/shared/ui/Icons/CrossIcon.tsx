interface Props {
  className: string;
  onClick?: () => void;
}

const CrossIcon = (props: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns={'http://w3.org'}
    className={props.className}
    onClick={props.onClick}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

export default CrossIcon;
