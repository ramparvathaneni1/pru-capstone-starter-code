export default function Home({ handleSearch }) {
  return (
    <>
      <div className="search-box">
        <form name="search-form">
          <input
            type="text"
            placeholder="Search By Name / ID"
            name="search"
            id="search"
          />
          &nbsp;
          <button type="submit" id="search-btn" onClick={handleSearch}>
            Go
          </button>
        </form>
      </div>
      <div className="button-box"></div>
    </>
  );
}
