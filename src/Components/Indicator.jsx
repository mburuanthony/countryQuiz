export const Indicator = ({ count }) => {
  const colors = { coveredd: "#f9a826", default: "#c4c4c4" };

  return (
    <div id="indicator">
      <span
        className="indicator"
        style={{ backgroundColor: colors.coveredd }}
      ></span>
      <span
        className="indicator"
        style={{
          backgroundColor: count >= 1 ? colors.coveredd : colors.default,
        }}
      ></span>
      <span
        className="indicator"
        style={{
          backgroundColor: count >= 2 ? colors.coveredd : colors.default,
        }}
      ></span>
      <span
        className="indicator"
        style={{
          backgroundColor: count >= 3 ? colors.coveredd : colors.default,
        }}
      ></span>
      <span
        className="indicator"
        style={{
          backgroundColor: count === 4 ? colors.coveredd : colors.default,
        }}
      ></span>
    </div>
  );
};
