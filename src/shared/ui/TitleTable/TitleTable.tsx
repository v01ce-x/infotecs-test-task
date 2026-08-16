interface Props {
  title: string;
}

const TitleTable = (props: Props) => {
  const { title } = props;

  return <th>{title}</th>;
};

export default TitleTable;
