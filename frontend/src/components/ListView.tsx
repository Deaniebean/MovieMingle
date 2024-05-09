const data = [
  {
    original_title: 'Prom Night',
    poster_path:
      'https://image.tmdb.org/t/p/original/pKSeyN02R5khphImEIpAdBjQgEP.jpg',
    date: '2024-05-02',
  },
  {
    original_title: 'Prom Night',
    poster_path:
      'https://image.tmdb.org/t/p/original/pKSeyN02R5khphImEIpAdBjQgEP.jpg',
    date: '2024-05-02',
  },
  {
    original_title: 'Prom Night',
    poster_path:
      'https://image.tmdb.org/t/p/original/pKSeyN02R5khphImEIpAdBjQgEP.jpg',
    date: '2024-05-02',
  },
  {
    original_title: 'Prom Night',
    poster_path:
      'https://image.tmdb.org/t/p/original/pKSeyN02R5khphImEIpAdBjQgEP.jpg',
    date: '2024-05-02',
  },
];

interface ListViewProps {
  title: string;
}

const ListView: React.FC<ListViewProps> = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{data[0].original_title}</p>
    </>
  );
};

export default ListView;
