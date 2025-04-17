import { useEffect, useState } from 'react';

const HashDetails = () => {
  const [hashDetails, setHashDetails] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('hashDetails');
    if (data) {
      setHashDetails(data);
    }
  }, []);

  return (
    <div>
      <h2>Hash Details</h2>
      {hashDetails ? <pre>{hashDetails}</pre> : <p>No IP details available.</p>}
    </div>
  );
};

export default HashDetails;
