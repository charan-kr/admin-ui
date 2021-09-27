const Loading = ({ value = "loading" }) => {
  return (
    <div className="p-grid p-ai-center p-jc-center" style={{ height: "100%" }}>
      <div className="p-col-12">
        <div className="p-text-center">
          <i
            className="fa pi-spin fa-spinner fa-4x"
            style={{ color: "teal" }}
          />
          <div className="loading">
            <div className="loading-text">
              {value
                .toString()
                .toUpperCase()
                .split("")
                .map((character, i) => (
                  <span key={i} className="loading-text-words">
                    {character}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
