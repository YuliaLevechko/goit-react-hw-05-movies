import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import EditorList from 'components/EditorList/EditorList';
import Form from 'components/Form/Form';
import { fetchSearchByKeyword } from 'services/TmbdApi';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoviesText, setNoMoviesText] = useState(false);
  const [searchParams] = useSearchParams();
  const queryFromURL = searchParams.get('search');

  useEffect(() => {
    if (queryFromURL) {
      searchMovies(queryFromURL);
    }
  }, [queryFromURL]);

  const searchMovies = queryMovie => {
    setLoading(true);

    fetchSearchByKeyword(queryMovie)
      .then(searchResults => {
        setSearchFilms(searchResults);
        setNoMoviesText(searchResults.length === 0);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main>
      <Form searchMovies={searchMovies} />
      {loading && <Loader />}
      {noMoviesText && (
        <p>There is no movies with this request. Please, try again</p>
      )}
      {searchFilms.length > 0 && <EditorList films={searchFilms} />}
    </main>
  );
};

export default Movies;