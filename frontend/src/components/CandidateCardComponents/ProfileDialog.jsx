import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogHeader from '../DialogComponents/DialogHeader';
import Biography from '../DialogComponents/Biography';
import CoverLetter from '../DialogComponents/CoverLetter';
import CandidateDetails from '../DialogComponents/CandidateDetails';
import DownloadResume from '../DialogComponents/DownloadResume';
import ContactInfo from '../DialogComponents/ContactInfo';
import SocialMediaButtons from '../DialogComponents/SocialMediaButtons';

const ProfileDialog = ({ open, onClose, candidateData }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogHeader 
      image={candidateData.image} 
      name={candidateData.name} 
      jobTitle={candidateData.jobTitle} 
      onSave={candidateData.onSave} 
      onMail={candidateData.onMail} 
      sx={{padding: '50px',}}
    />
    <DialogContent
      sx={{
        padding: '30px',
        maxHeight: '80vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' }, 
        scrollbarWidth: 'none', 
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2, marginRight: '50px', display: 'flex', flexDirection: 'column' }}>
          <Biography text={candidateData.biography} />
          <CoverLetter text={candidateData.coverLetter} />
          <div style={{ marginTop: 'auto' }}>
            <SocialMediaButtons links={candidateData.socialMediaLinks} />
          </div>
        </div>
        <div style={{ flex: 1.2 }}>
          <CandidateDetails details={candidateData.details} />
          <DownloadResume resumeUrl={candidateData.resumeUrl} />
          <ContactInfo contact={candidateData.contactInfo} />
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default ProfileDialog;
