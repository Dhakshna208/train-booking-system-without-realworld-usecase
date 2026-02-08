import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState({ from: '', to: '', date: '' });

  const handleChange = (e) => setQuery({ ...query, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
      className="bg-lightBlue rounded-xl p-4 grid md:grid-cols-4 gap-3"
    >
      <input name="from" placeholder="From" onChange={handleChange} className="p-2 rounded-lg border border-blue-200" required />
      <input name="to" placeholder="To" onChange={handleChange} className="p-2 rounded-lg border border-blue-200" required />
      <input name="date" type="date" onChange={handleChange} className="p-2 rounded-lg border border-blue-200" required />
      <button className="bg-primaryBlue text-white rounded-lg">Search Trains</button>
    </form>
  );
};

export default SearchForm;
