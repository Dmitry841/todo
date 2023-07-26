import Pagination from "react-bootstrap/Pagination";

const AppPagination = ({ active, count, limit, handleClick }) => {
  let items = [];
  const pageCount = Math.ceil(count / limit);
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handleClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <div className="pagination">{items}</div>;
};

export default AppPagination;
