export default function Home({ handleSearch }) {
  return (
    <>
      <div class="search-box">
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
      <div class="button-box"></div>
    </>
  );
}
