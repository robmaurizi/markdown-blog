import { FC } from 'react';

interface PublishDateProps {
  date: string
}

const PublishDate: FC<PublishDateProps> = ({date}) => {

  const pubtime = Date.parse(date);
  const formattedDate = new Date(pubtime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <span className="post-date">
      Published <strong>{formattedDate}</strong>
    </span>
  );
}

export default PublishDate;