import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';

const ITEMS_PER_PAGE = 10;

const DynamicTable = ({ title, header, data, renderButtons }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) => {
    const values = Object.values(row).join(' ').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Row className="mt-3">
        <Col>
          <div className="dynamic-title-card">
            <Row>
              <Col md={6} className='mt-3 '>
                <Card.Title>{title}</Card.Title>
              </Col>
              <Col md={6}>
                <div className='mt-2 mb-2'>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <Card className='dynamic-card'>
            <Card.Body>
              <div className="table-container">
                <div className="table-scroll-container">
                  <Table striped>
                    <colgroup>
                      {header.map((_, index) => (
                        <col key={index} style={{ maxWidth: '200px' }} />
                      ))}
                    </colgroup>
                    <thead>
                      <tr>
                        {header.map((column, index) => (
                          <th key={index}>{column}</th>
                        ))}
                        {renderButtons && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length === 0 ? (
                        <tr>
                          <td colSpan={header.length + (renderButtons ? 1 : 0)}>There's no data to display</td>
                        </tr>
                      ) : (
                        currentData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.keys(row).map((key, columnIndex) => (
                              <td key={columnIndex}>{row[key]}</td>
                            ))}
                            {renderButtons && <td>{renderButtons(row['Status'], row['Request ID'])}</td>}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="pagination-container mt-3 d-flex justify-content-end">
                <Pagination>{paginationItems}</Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DynamicTable;
