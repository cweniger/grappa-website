

type Props = {
  url: string;
  title?: string;
  description?: string;
};

export default function PersonBubble({ fields }: Props) {
  return (
    <div className={people.box} key={fields.fullName}>
  {fields.profilePicture ? (
    <Link href={`/members/${fields.slug}`}>
      <img src={fields.profilePicture} alt={fields.fullName} />
    </Link>
  ) : (
    <div className={people.planet}></div>
  )}
  {fields.slug ? (
    <Link href={`/members/${fields.slug}`}>
      <p className={people.name}>{fields.fullName}</p>
    </Link>
  ) : (
    <p className={people.name}>{fields.fullName}</p>
  )}
</div>;

  );
}

