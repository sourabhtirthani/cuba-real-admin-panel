import React, { Fragment, useContext, useState } from 'react';
import { Button, Container, FormGroup, Input, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MasterPackage.css';
import { Btn, Breadcrumbs } from '../../../AbstractElements';
import CustomizerContext from '../../../_helper/Customizer';

const BookmarksContain = () => {
  const { layoutURL } = useContext(CustomizerContext);
  const [announcement, setAnnouncement] = useState('');

  const handleUpdateClick = () => {
    // Perform the update logic here
    // For demonstration, let's just update the state value and show a snackbar
    setAnnouncement('Updated Text');

    console.log('Updated Value:', announcement);


    // Show a success snackbar
    toast.success('Announcement updated successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto close after 3 seconds
    });
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle='Bookmark' parent='Apps' title='Bookmark' />
      <Container fluid={true}>
        <div className="master-package-container">
          <div className="master-package-inner-container">
            <FormGroup>
              <Label style={{ color: '#BEBFC2', marginTop: '10px' }} className="form-label">
                Announcment :
              </Label>
              <Input
                className="Master-package-input"
                type="text"
                placeholder='Enter Announcment'
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
              />
              <span style={{ color: 'red' }}></span>
            </FormGroup>
            <Button onClick={handleUpdateClick}>Update</Button>
          </div>
        </div>
      </Container>
      {/* ToastContainer for displaying toasts/snackbars */}
      <ToastContainer position="top-left" autoClose={3000} />
    </Fragment>
  );
};

export default BookmarksContain;
