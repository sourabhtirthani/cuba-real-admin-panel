import React, { Fragment, useContext, useRef, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ChatMenu from '../ChatApp/ChatMenu';
import { Breadcrumbs } from '../../../../AbstractElements';
import ChatStatus from './ChatStatus';
import VideoHistory from './VideoHistory';
import ChatHeader from '../ChatApp/ChatHeader';
import ChatAppContext from '../../../../_helper/Chat';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Input, Modal } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';

const VideoChatContain = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFromUserName, setSearchFromUserName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const navigate = useNavigate();

  const handleWalletClick = (walletAddress) => {
    setSelectedWallet(walletAddress);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#myTable' });
    doc.save('table_data.pdf');
  };

  const handleEditClick = (row) => {
    setEditedRow(row);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Implement logic to save changes to the editedRow data
    console.log('Saving changes:', editedRow);
    // Close the modal
    setIsEditModalOpen(false);
    const updatedData = data.map((row) =>
      row.sno === editedRow.sno ? { ...row, ...editedRow } : row
      // Implement logic to save changes to the editedRow data
      // Here, you need to update the corresponding row in the data array
    );
    setData(updatedData);
    // Close the modal
    setIsEditModalOpen(false);

    console.log('Updated Data:', updatedData);

  };


  const [data, setData] = useState(
    [
      {
        sno: '1', name: 'Tiger Nixon', id: '	#101', SponserID: '61', UserWalletAddress: '	$320,800', SponserWalletAddress: 'male', time: '21:37', wallet: '$2125', joindate: '2023/02/12', Date: '2023/04/12',
        ReferralIncome: '$12', LevelIncome: '$22', PackageIncome: '$25', SlotIncome: '$20,', TotalIncome: '$5'
      },
    ]
  )

  const [ascendingOrder, setAscendingOrder] = useState(true);

  const handleDateHeaderClick = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return ascendingOrder ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });

    setData(sortedData);
    setAscendingOrder(!ascendingOrder);
  };

  const statusOptions = ['Active', 'Inactive', 'Block'];

  const filteredData = data.filter((row) => {
    const rowDate = new Date(row.Date);
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    const statusFilter =
      selectedStatus === '' ? true : row.status.toLowerCase() === selectedStatus.toLowerCase();

    return (
      statusFilter &&
      rowDate >= (fromDateObj || rowDate) &&
      rowDate <= (toDateObj || rowDate) &&
      row.Date.toLowerCase().includes(searchTerm.toLowerCase()) &&
      row.name.toLowerCase().includes(searchFromUserName.toLowerCase())
    );
  });

  const tableRef = useRef(null);

  const copyTable = () => {
    const range = document.createRange();
    range.selectNode(tableRef.current);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadTableAsCSV = () => {
    const table = document.getElementById('myTable');

    if (!table) {
      console.error('Table not found');
      return;
    }

    const rows = table.querySelectorAll('tr');
    const csvData = [];

    rows.forEach((row) => {
      const rowData = [];
      const cells = row.querySelectorAll('td, th');

      cells.forEach((cell) => {
        rowData.push(cell.innerText);
      });

      csvData.push(rowData.join(','));
    });

    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSearchFromUserName('');
    setSelectedStatus('');
    setFromDate('');
    setToDate('');
  };

  const { menuToggle } = useContext(ChatAppContext);
  return (
    <Fragment>
      <Breadcrumbs mainTitle='My Referral' parent='User Section' title='My Referral' />
      <Container fluid={true}>
        <Fade top distance='2%' duration={700}>
          <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'space-between' }}>
            <div className='buttons d-flex'>
              <button onClick={copyTable}>Copy</button>
              <button onClick={downloadTableAsCSV}>CSV</button>
              <button onClick={downloadTableAsCSV}>Excel</button>
              <button onClick={generatePDF}>PDF</button>
              <button onClick={handlePrint}>Print</button>
              <button onClick={handleReset}>Reset</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              Search From User Name:-
              <Input
                type='text'
                style={{ width: '200px' }}
                placeholder='Enter From User Name'
                value={searchFromUserName}
                onChange={(e) => setSearchFromUserName(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              Search by Status:-
              <Input
                type='select'
                style={{ width: '150px', marginLeft: '10px' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value=''>All</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Input>
            </div>
          </div>
          <hr />
          <div className='table-responsive'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className='mb-0'>My Referral</h4>
                  <div className='date-inputs' style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#96979A' }}>
                    from:-
                    <Input type='date' onChange={(e) => setFromDate(e.target.value)} />
                    To:-
                    <Input type='date' onChange={(e) => setToDate(e.target.value)} />
                  </div>
                </div>
                <hr />
                <div className='table-responsive'>
                  <table id='myTable' className='table table-striped table-bordered' style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th> User Name</th>
                        <th> User ID</th>
                        <th>User Wallet Address</th>
                        <th>Sponser ID</th>
                        <th>Sponser Wallet Address</th>
                        {/* <th>Wallet Address</th> */}
                        {/* <th>Wallet Amount</th> */}
                        <th>Joinin Date</th>
                        {/* <th>Time</th> */}
                        <th >Date & Time</th>
                        <th >Referral Income</th>
                        <th >Level Income</th>
                        <th >Package Upgrade Income</th>
                        <th >Slot Income</th>
                        <th >Total Income</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.sno}</td>
                          <td>{row.name}</td>
                          <td>{row.id}</td>
                          <td>{row.UserWalletAddress}</td>
                          <td>{row.SponserWalletAddress}</td>
                          <td>{row.SponserID}</td>
                          {/* <td>{row.wallet}</td> */}
                          {/* <td
                         style={{ cursor: 'pointer' }}
                         onClick={() => handleWalletClick(row.WalletAddress)}
                       >
                         {row.WalletAddress}
                       </td> */}
                          <td>{row.joindate}</td>
                          {/* <td>{row.time}</td> */}
                          <td>{row.Date}</td>
                          <td>{row.ReferralIncome}</td>
                          <td>{row.LevelIncome}</td>
                          <td>{row.PackageIncome}</td>
                          <td>{row.SlotIncome}</td>
                          <td>{row.TotalIncome}</td>
                          {/* <td>
                         <Button color='primary' onClick={() => handleEditClick(row)}>
                           Edit
                         </Button>
                       </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {selectedWallet && (
                  <Modal isOpen={true} toggle={() => setSelectedWallet(null)}>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Wallet Details</h5>
                      <button type='button' className='close' onClick={() => setSelectedWallet(null)}>
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <p>Details for Wallet: {selectedWallet}</p>
                    </div>
                    <div className='modal-footer'>
                      <Button color='secondary' onClick={() => setSelectedWallet(null)}>
                        Close
                      </Button>
                    </div>
                  </Modal>
                )}
                {editedRow && (
                  <Modal isOpen={isEditModalOpen} toggle={() => setIsEditModalOpen(false)}>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Edit User Details</h5>
                      <button type='button' className='close' onClick={() => setIsEditModalOpen(false)}>
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <Input
                        type='text'
                        value={editedRow ? editedRow.name : ''}
                        onChange={(e) => setEditedRow({ ...editedRow, name: e.target.value })}
                      />
                      {/* Add more input fields as needed */}
                    </div>
                    <div className='modal-footer'>
                      <Button color='primary' onClick={handleSaveEdit}>
                        Save Changes
                      </Button>
                      <Button color='secondary' onClick={() => setIsEditModalOpen(false)}>
                        Close
                      </Button>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Container>
    </Fragment>
  );
};
export default VideoChatContain;
