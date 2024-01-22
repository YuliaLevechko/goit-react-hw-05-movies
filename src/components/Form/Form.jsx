import { SearchForm, Input, Button } from './Form.styled';
import { useSearchParams } from 'react-router-dom';

const Form = ({ searchMovies }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('search');

  const handleInputChange = event => {
    setSearchParams({ search: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    searchMovies(query ? query.toLowerCase() : '');
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input
        type="text"
        name="query"
        autoFocus
        value={query}
        onChange={handleInputChange}
      />
      <Button type="submit">Search</Button>
    </SearchForm>
  );
};

export default Form;